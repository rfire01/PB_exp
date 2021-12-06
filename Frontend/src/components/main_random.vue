<template>
<div></div>
</template>

<script>
const config = require("../config.js");

export default {
    
    data(){
        return{
        }
    },
    mounted(){
        localStorage.clear();
        let time=new Date().getTime();
        this.Start();

    },
    methods:{
        async Start(){
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
                    this.server_error=true;
                    console.log(error);
                }
                good_id=!blacklistedResponse.data.blacklisted && !existsResponse.data.exists;
            }
            this.$loading(false);
            this.$router.push("/participant_ID/participant_ID?participant_ID="+id);
            await this.$parent.setConfigurations();
        }
    }

}
</script>

<style>

</style>
