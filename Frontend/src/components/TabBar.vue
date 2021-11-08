<template>
<scroll-fixed-header>
    <form-wizard @on-complete="onComplete" finish-button-text="Submit">
        <h2 slot="title"></h2>   
        <tab-content title="Consent" :before-change="validateFirstStep">
          <consent todo="You will select  how to distribute a budget of 500,000 pound, by selecting from a list of items." ref="consentComp"/>
        </tab-content>
        <tab-content title="Demographic Questions" :before-change="validateDemografic">
          <personal-questions ref="persQuestions"/>
        </tab-content>
        <tab-content title="Instructions" :before-change="validateInstructions">
          <instructions ref="inst"/>
        </tab-content>
      <tab-content title="Quiz" :before-change="validateQuiz">
          <quizz ref="quizComp"/>
        </tab-content>

    </form-wizard>
</scroll-fixed-header>
    
  

</template>

<script>
import Consent from './Consent.vue';
import Instructions from './Instructions.vue';
import PersonalQuestions from './PersonalQuestions.vue';
import Quizz from './Quizz.vue';
import { asyncLoading } from 'vuejs-loading-plugin'



export default {
    components: { Consent, Instructions, Quizz, PersonalQuestions },
    data() {
       return {
         formInline: {
           agree: ''
         },
         rules: {
           agree: {
             required: true,
             message: 'You must agree to participate',
             trigger: 'change'
           },
         }
        }
       },
    mounted(){
      if(JSON.parse(localStorage.getItem('items'))==null){
        asyncLoading(this.$parent.setConfigurations());
        let time=new Date().getTime();
        localStorage.setItem('startTime',JSON.stringify(time));
      }
    },
    methods: {
        onComplete: function(){
          return new Promise((resolve, reject) => {
             let voting_method=localStorage.getItem('voting_method');
              this.$router.push("/"+voting_method+"_exp");
           })
            
        },
        validateFirstStep:function() {
          return new Promise((resolve, reject) => {
             this.$refs.consentComp.$refs.ruleForm.validate((valid) => {
               if(valid){
                  let time=new Date().getTime();
                  localStorage.setItem('consent_finish',JSON.stringify(time));
                  this.scrollToTop();

                  this.$refs.inst.voting_method=localStorage.getItem('voting_method');
                  this.$refs.quizComp.voting_method=localStorage.getItem('voting_method');
                  this.$refs.quizComp.questions=require("../quiz_questions.js").data[localStorage.getItem('voting_method')];

                } 
               resolve(valid);
             });
           })
        },
        validateInstructions:function(){
          return new Promise((resolve, reject) => {
            let time=new Date().getTime();
            localStorage.setItem('tutorial_finish',JSON.stringify(time));
            this.scrollToTop();
            resolve(true);
          });
        },
        validateDemografic:function(){
          return new Promise((resolve, reject) => {
             this.$refs.persQuestions.$refs.ruleForm.validate((valid) => {
               if(valid){
                  let time=new Date().getTime();
                  localStorage.setItem('budgeting_start',JSON.stringify(time));
                  let participant_info={age:this.$refs.persQuestions.form.age,gender:this.$refs.persQuestions.form.gender,education:this.$refs.persQuestions.form.education,};
                  localStorage.setItem('participant_info',JSON.stringify(participant_info));
                  

                  this.scrollToTop();
              
                 } 
               resolve(valid);
             });
           })

        },
        validateQuiz:function() {
          return new Promise((resolve, reject) => {
             this.$refs.quizComp.$refs.ruleForm.validate((valid) => {
               if(valid){
                let time=new Date().getTime();
                localStorage.setItem('quiz_finish',JSON.stringify(time));
               }
               else{
                 this.$parent.blacklistUser();
                 this.$parent.$data.userBlacklisted=true;
                 localStorage.removeItem('participant_ID');
               }

              
               resolve(valid);
             });
           })
        },
        scrollToTop:function(){
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          return true;
        }
    }
}
</script>

<style>

</style>