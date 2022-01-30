<template>
  <div id="app">
    <div v-if="!server_error" id="connection good">
      <router-view
        v-if="userBlacklisted === false && userAllreadyExists === false && !capacity_filled && !time_expired"
      ></router-view>
      <div
        v-else-if="time_expired"
        style="width: 80%; padding-left: 25%; font-size: 50px"
      >
        <br /><br />
        <b-alert show variant="warning"
          >More then an hour has passed. You can't continue.</b-alert
        >
      </div>
      <div
        v-else-if="userBlacklisted"
        style="width: 80%; padding-left: 25%; font-size: 50px"
      >
        <br /><br />
        <b-alert show variant="danger"
          >User failed to answer the quiz correctly and is now forbidden from
          participating</b-alert
        >
      </div>
      <div
        v-else-if="userAllreadyExists"
        style="width: 80%; padding-left: 25%; font-size: 50px"
      >
        <br /><br />
        <b-alert show variant="warning"
          >User already participated in the experiment</b-alert
        >
      </div>
      <div
        v-else-if="capacity_filled"
        style="width: 80%; margin-left: 25%; font-size: 50px"
      >
        <br /><br />
        <b-alert show variant="warning">Experiment is finished.</b-alert>
      </div>
    </div>
    <div v-else id="connection error">
      <b-alert
        show
        variant="danger"
        style="width: 80%; margin-left: 10%; font-size: 40px"
      >
        A connection error accured, write your worker ID below and click
        'update' in order to continue.
      </b-alert>
      <el-input
        style="width: 50%; padding-left: 40%"
        v-model="worker_id"
      ></el-input>
      <button @click="updateID">update</button>
    </div>
  </div>
</template>

<script>
// import NavBar from "./components/NavBar";
// import TabBar from "./components/TabBar";
const config = require("./config.js");

export default {
  name: "App",
  components: {
    // NavBar
    // TabBar
  },
  data() {
    return {
      userAllreadyExists: false,
      userBlacklisted: false,
      server_error: false,
      capacity_filled: false,
      finished_exp: false,
      time_expired: false,
      worker_id: "",
    };
  },
  watch: {
    '$route' (to, from) {
      this.checkIfBlackListed();
       if (to !== null && !window.location.href.endsWith('/#/') && !window.location.href.includes('Consistency') 
        && !window.location.href.includes('Feedback_quiz')){
         this.checkIfExist();
      } else {
         this.userAllreadyExists = false;
      }
    }
  },
  async mounted() {
    // Add a response interceptor
    this.axios.interceptors.response.use(
       (response) => {
        // Do something with response data
        return response;
      },
       (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              this.userAllreadyExists = true;
              break;
            default:
              this.server_error = true;
              break;
          }
        } else {
          this.server_error = true;
        }

        return Promise.reject(error);
      }
    );

    if (JSON.parse(localStorage.getItem("participant_ID")) != null) {
      await this.checkIfBlackListed();

      if (!window.location.href.endsWith('/#/') && !window.location.href.includes('Consistency') 
         && !window.location.href.includes('Feedback_quiz')){
        await this.checkIfExist();
      } else {
         this.userAllreadyExists = false;
      }
    }

    if(!this.userAllreadyExists && !this.userBlacklisted){
      if (localStorage.getItem("startTime") !== null && (new Date().getTime() - parseInt(localStorage.getItem("startTime"))) > 3600000) {
        this.time_expired = true;
      }
    }

    if (
      JSON.parse(localStorage.getItem("final_items")) != null &&
      localStorage.getItem("experiment_id") == null &&
      localStorage.getItem("participant_ID") == null
    ) {
      this.server_error = true;
    }
  },
  methods: {
    async updateID() {
      localStorage.setItem("participant_ID", this.worker_id);
      let final_items = JSON.parse(localStorage.getItem("final_items"));
      let election_num = localStorage.getItem("election_num");

      if (
        final_items != null &&
        localStorage.getItem("experiment_id") == null
      ) {
        await this.addExperiment();
      } else if (
        final_items == null &&
        localStorage.getItem("experiment_id") == null
      ) {
        this.$router.push("/" + localStorage.getItem("voting_method") + "_exp");
      } else if (
        ((final_items.length < 10 &&
          (election_num == 6 || election_num == 3)) ||
          (final_items.length < 20 &&
            (election_num == 7 || election_num == 8))) &&
        localStorage.getItem("experiment_id") == null
      ) {
        this.$router.push("/" + localStorage.getItem("voting_method") + "_exp");
      }
      this.server_error = false;
    },
    getImageURL(img) {
      return require("./assets/" + img + ".png");
    },
    getCurrTime() {
      let time = new Date().getTime();
      localStorage.setItem("startTime", JSON.stringify(time));
    },

    async checkIfExist() {
      const participant_ID = localStorage.getItem("participant_ID");
      let existsResponse = null;
      this.userAllreadyExists = undefined;
      try {
        this.$loading(true);
        existsResponse = await this.axios.get(
          "http://" +
            config.data.server +
            "/userExists/participant_ID/" +
            participant_ID
        );
      } catch (error) {
        this.server_error = true;
      } finally {
        this.$loading(false);
      }
      this.userAllreadyExists = existsResponse.data.exists;
    },
    async checkIfBlackListed() {
      const participant_ID = localStorage.getItem("participant_ID");
      let blacklistedResponse = null;
      try {
        blacklistedResponse = await this.axios.get(
          "http://" +
            config.data.server +
            "/isBlacklisted/participant_ID/" +
            participant_ID
        );
      } catch (error) {
        this.server_error = true;
      }

      this.userBlacklisted = blacklistedResponse.data.blacklisted;
    },
    async setConfigurations() {
      if (JSON.parse(localStorage.getItem("items")) != null) {
        return;
      }
      let configs = null;
      try {
        configs = await this.axios.get(
          "http://" + config.data.server + "/config"
        );
      } catch (error) {
        this.server_error = true;
      }
      this.capacity_filled = configs.data.finished;
      let items = configs.data.items_from_groups;
      let voting_method = configs.data.voting_method;
      let election_num = configs.data.election_num;
      let homePos = configs.data.homePos;
      localStorage.setItem("items", JSON.stringify(items));
      localStorage.setItem("homePos", JSON.stringify(homePos));

      if (localStorage.getItem("voting_method") == null) {
        localStorage.setItem("voting_method", voting_method);
      }
      localStorage.setItem("num_of_projects", items.length);
      localStorage.setItem("election_num", election_num);
    },

    async blacklistUser() {
      const participant_ID = localStorage.getItem("participant_ID");
      const voting_method = localStorage.getItem("voting_method");
      const election_num = localStorage.getItem("election_num");
      try {
        await this.axios.post(
          "http://" + config.data.server + "/insertToBlacklist",
          {
            participant_ID: participant_ID,
            voting_method: voting_method,
            election_num: election_num,
          }
        );
      } catch (error) {
        this.server_error = true;
      }
    },

    async addExperiment() {
      this.$loading(true);
      if (
        new Date().getTime() - parseInt(localStorage.getItem("startTime")) >
        3600000
      ) {
        this.time_expired = true;
        this.$loading(false);
        return;
      }

      let participant_ID = localStorage.getItem("participant_ID");
      let time = localStorage.getItem("startTime");
      let tutorial_time =
        parseInt(localStorage.getItem("tutorial_finish")) -
        parseInt(localStorage.getItem("consent_finish"));
      let quiz_time =
        parseInt(localStorage.getItem("quiz_finish")) -
        parseInt(localStorage.getItem("tutorial_finish"));
      let response_time =
        parseInt(localStorage.getItem("budgeting_finish")) -
        parseInt(localStorage.getItem("budgeting_start"));
      let items = JSON.parse(localStorage.getItem("final_items"));
      let participant_info = JSON.parse(
        localStorage.getItem("participant_info")
      );
      let input_format = localStorage.getItem("voting_method");
      let election_num = localStorage.getItem("election_num");
      let homePos = JSON.parse(localStorage.getItem("homePos"));

      const experiment_id = await this.axios
        .post("http://" + config.data.server + "/addExperiment", {
          participant_ID: participant_ID,
          time: time,
          tutorial_time: tutorial_time,
          quiz_time: quiz_time,
          response_time: response_time,
          items: items,
          participant_info: participant_info,
          input_format: input_format,
          election_num: election_num,
          homePos: homePos.x + "," + homePos.y,
        })
        .then((res) => {
          // localStorage.clear();
          localStorage.setItem("experiment_id", res.data.experiment_id);
          this.$loading(false);
        })
        .catch((error) => {
          this.$loading(false);
        });
    },
  },
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
