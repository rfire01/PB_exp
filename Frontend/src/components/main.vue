<template>
<div style="witdh:300px;margin:auto;text-align:center">
    <div>
        <h3>Voting method:</h3>
        <el-form>
            <el-form-item prop="gender" >
                <el-select v-model="voting_method" placeholder="select voting method"> 
                    <el-option
                        v-for="method in voting_methods"
                        :key="method"
                        :label="method"
                        :value="method">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
    <!-- <h3>Participant ID</h3>
    <el-input style="width:200px" placeholder="Please input" v-model="id"></el-input> -->
    <br><br>
    <b-button @click="Start">Start</b-button>
  <!-- <Map/> -->
</div>
</template>

<script>
const config = require("../config.js");
export default {
    data(){
        return{
            voting_method:'Knapsack',
            voting_methods:['Knapsack','Utilities','k_approval','Ranking_value','Ranking_value_money','Threshold'],
            // id:'1000'
        }
    },
    mounted(){
        localStorage.clear();
        //localStorage.removeItem('participant_ID');
    },
    methods:{
        async Start(){
            localStorage.setItem('voting_method',this.voting_method);
            let id=0;
            let good_id=false;
            this.$loading(true);
            while(!good_id){
                id=Math.floor(Math.random() * 100000);
                let blacklistedResponse = null;
                let existsResponse = null;
                try {
                    blacklistedResponse = await this.axios.get("http://"+config.data.server+"/isBlacklisted/participant_ID/"+id);
                    existsResponse = await this.axios.get("http://"+config.data.server+"/userExists/participant_ID/"+id);
                    console.log(blacklistedResponse.data.blacklisted);
                    console.log(existsResponse.data.exists);
                } 
                catch (error) {
                    this.$loading(false);
                    this.server_error=true;
                    console.log(error);
                }
                good_id=!blacklistedResponse.data.blacklisted && !existsResponse.data.exists;
            }
            this.$loading(false);
            this.$router.push("/participant_ID/participant_ID?participant_ID="+id);
        }
    }

}
</script>

<style>
#map
    {
        background-image: url('../assets/city_digital1.png');
        background-size:cover;
        /* background-repeat: no-repeat; */
        width: 600px;
        height: 600px;
    }
</style>
