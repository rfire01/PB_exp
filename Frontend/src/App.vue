<template>
  <div id="app">
    <div v-if="!server_error" id="connection good">
        <router-view v-if='!userBlacklisted && !userAllreadyExists && !capacity_filled'></router-view>
        <div v-else-if='time_expired' style="width:80%;padding-left: 25%;font-size: 50px;">
          <br><br>
          <b-alert show variant="warning">More then an hour has passed. You can't continue.</b-alert>
        </div>
        <div v-else-if='userBlacklisted' style="width:80%;padding-left: 25%;font-size: 50px;">
          <br><br>
          <b-alert show variant="danger">User failed to answer the quiz correctly and is now forbidden from participating</b-alert>
        </div>
        <div v-else-if='userAllreadyExists' style="width:80%;padding-left: 25%;font-size: 50px;">
          <br><br>
          <b-alert show variant="warning">User already participated in the experiment</b-alert>
        </div>
        <div v-else-if='capacity_filled' style="width:80%;padding-left: 25%;font-size: 50px;">
          <br><br>
          <b-alert show variant="warning">Experiment is finished.</b-alert>
        </div>
    </div>
    <div v-else id="connection error">
      <b-alert show variant="danger" style="width:80%;padding-left: 25%;font-size: 40px;">
        A connection error accured, write your worker ID below and click 'update' in order to continue.
      </b-alert>
      <el-input style="width:50%;padding-left: 25%;" v-model="worker_id"></el-input>
      <button @click="updateID">update</button>
      
    </div>
  </div>
</template>

<script>
// import NavBar from "./components/NavBar";
// import TabBar from "./components/TabBar";
import { asyncLoading } from 'vuejs-loading-plugin'
const config = require("./config.js");

export default {
  name: "App",
  components: {
    // NavBar
    // TabBar
  },
  data(){
    return{
      userAllreadyExists: false,
      userBlacklisted: false,
      server_error:false,
      capacity_filled:false,
      finished_exp:false,
      time_expired:false,
      worker_id:""
    }
  },
  mounted(){
    if(new Date().getTime()-parseInt(localStorage.getItem("startTime"))>3600000){
      this.time_expired=true;
    }
    console.log(this.$router.currentRoute.name);
    if(JSON.parse(localStorage.getItem('items'))==null && JSON.parse(localStorage.getItem('participant_ID'))!=null && this.finished_exp==false){
      asyncLoading(this.checkParticipant());
      this.getCurrTime();
    }
    if(JSON.parse(localStorage.getItem('final_items'))!=null && localStorage.getItem('experiment_id')==null && localStorage.getItem('participant_ID')==null){
        this.server_error=true;
      }

  },
  methods:{
    async updateID(){
      localStorage.setItem('participant_ID',this.worker_id);
      let final_items=JSON.parse(localStorage.getItem('final_items'));
      let election_num=localStorage.getItem('election_num');

      if(final_items!=null && localStorage.getItem('experiment_id')==null){
        await this.addExperiment();
      }
      else if(final_items==null && localStorage.getItem('experiment_id')==null){
        this.$router.push("/"+localStorage.getItem('voting_method')+"_exp");
      }
      else if(((final_items.length<10 && (election_num==6 || election_num==3)) || (final_items.length<20 && (election_num==7 || election_num==8))) && localStorage.getItem('experiment_id')==null)
      {
        this.$router.push("/"+localStorage.getItem('voting_method')+"_exp");
      }
      this.server_error=false;
    },
    getImageURL(img){
        return require('./assets/'+img+'.png');
    },
    getCurrTime(){
      let time=new Date().getTime();
      localStorage.setItem('startTime',JSON.stringify(time));
    },
    async checkParticipant(){
      const participant_ID=localStorage.getItem('participant_ID');
      let blacklistedResponse = null;
      let existsResponse = null;
      try {
        blacklistedResponse = await this.axios.get("http://"+config.data.server+"/isBlacklisted/participant_ID/"+participant_ID);
        existsResponse = await this.axios.get("http://"+config.data.server+"/userExists/participant_ID/"+participant_ID);
      } 
      catch (error) {
        this.server_error=true;
        console.log(error);
      }

      this.userBlacklisted=blacklistedResponse.data.blacklisted;
      this.userAllreadyExists=existsResponse.data.exists;
      await this.setConfigurations();
    },

    async setConfigurations(){
      if(JSON.parse(localStorage.getItem('items'))!=null){
        return;
      }
      let configs=null;
      try 
      {
        configs = await this.axios.get("http://"+config.data.server+"/config");
      } 
      catch (error) {
        console.log(error);
        this.server_error=true;
      }
      this.capacity_filled=configs.data.finished;
      let items= configs.data.items_from_groups;
      let voting_method= configs.data.voting_method;
      let election_num= configs.data.election_num;
      let homePos= configs.data.homePos;
      localStorage.setItem('items',JSON.stringify(items));
      localStorage.setItem('homePos',JSON.stringify(homePos));

      if(JSON.parse(localStorage.getItem('voting_method'))==null)
        localStorage.setItem('voting_method',voting_method);
      localStorage.setItem('num_of_projects',items.length);
      localStorage.setItem('election_num',election_num);

    },

    async blacklistUser(){
      const participant_ID=localStorage.getItem('participant_ID');
      const voting_method=localStorage.getItem('voting_method');
      const election_num=localStorage.getItem('election_num');
      try {
        await this.axios.post("http://"+config.data.server+"/insertToBlacklist",{
          participant_ID:participant_ID,
          voting_method:voting_method,
          election_num:election_num
        });
      }
      catch (error) {
        console.log(error);
        this.server_error=true;
      }
      
    },

    async addExperiment(){
            this.$loading(true);
            if(new Date().getTime()-parseInt(localStorage.getItem("startTime"))>3600000){
              this.time_expired=true;
              return;
            }

            new Promise((resolve, reject) => {
                resolve(0);
            })
            .then(async ()=>{
                let participant_ID=localStorage.getItem("participant_ID");
                let time=localStorage.getItem("startTime");
                let tutorial_time=parseInt(localStorage.getItem("tutorial_finish"))-parseInt(localStorage.getItem("consent_finish"));
                let quiz_time=parseInt(localStorage.getItem("quiz_finish"))-parseInt(localStorage.getItem("tutorial_finish"));
                let response_time=parseInt(localStorage.getItem("budgeting_finish"))-parseInt(localStorage.getItem("budgeting_start"));
                let items=JSON.parse(localStorage.getItem("final_items"));
                let participant_info=JSON.parse(localStorage.getItem("participant_info"));
                let input_format=localStorage.getItem("voting_method");
                let election_num=localStorage.getItem("election_num");
                let homePos=JSON.parse(localStorage.getItem('homePos'));
                // let servername=localStorage.getItem('server');
                try {
                    const experiment_id=await this.axios.post("http://"+config.data.server+"/addExperiment",{
                        participant_ID:participant_ID,
                        time:time,
                        tutorial_time:tutorial_time,
                        quiz_time:quiz_time,
                        response_time:response_time,
                        items:items,
                        participant_info:participant_info,
                        input_format:input_format,
                        election_num:election_num,
                        homePos:homePos.x+','+homePos.y
                    });
                    // localStorage.clear();
                    localStorage.setItem('experiment_id',experiment_id.data.experiment_id);
                } 
                catch (error) {
                    console.log(error);
                    this.server_error=true;
                }
            })
            .then(()=>{
                this.$loading(false);
            });
        }
  }
};
</script>

<style lang="scss">

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  min-height: 100vh;

  background-size: cover;
  background-image: url(./assets/background.jpg);
}
html {
    overflow-y: scroll; 
    }
</style>
