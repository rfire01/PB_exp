<template>
<div>
    <h1 style="font-family: 'Courier New', monospace;text-align:center">Consistency check</h1>
    <br>
    <div style="margin-left:20%; width:70%">
        <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="ruleForm">
            <el-form-item prop="allQuestions">
                <b-card style="background-color:#e8e8e8;">
                    <h4 class="q-title" >Question 1</h4>
                    <div class="q-body" >
                        <h4 style="white-space: pre-line">{{questions.q1.q}}</h4>
                        <br>
                        <el-form-item prop="question1">
                            <el-radio-group v-model="form.question1">
                                <el-radio style="white-space: pre-line" :label="1">{{questions.q1.ans1}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="2">{{questions.q1.ans2}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="3">{{questions.q1.ans3}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="4">{{questions.q1.ans4}}</el-radio><br>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </b-card>
                <!-- <br> -->
                <b-card style="background-color:#e8e8e8;">
                    <h4 class="q-title" >Question 2</h4>
                    <div class="q-body" style="word-wrap: break-word;">
                        <h4 style="white-space: pre-line">{{questions.q2.q}}</h4>
                        <br>
                        <el-form-item prop="question2">
                            <el-radio-group v-model="form.question2" type="vertical">
                                <el-radio style="white-space: pre-line" :label="1">{{items[0].item_name}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="2">Improving parking at the airport</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="3">{{items[3].item_name}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="4">{{items[6].item_name}}</el-radio><br>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </b-card>
                    
                <!-- <br> -->
                <b-card style="background-color:#e8e8e8;">
                    <h4 class="q-title" >Question 3</h4>
                    <div class="q-body" >
                        <h4 style="white-space: pre-line">{{questions.q3.q}}</h4>
                        <br>
                        <el-form-item prop="question3">
                            <el-radio-group v-model="form.question3" type="vertical">
                                <el-radio style="white-space: pre-line" :label="1">{{not_selected[not_selected.length-1].item_name}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="2">{{not_selected[not_selected.length-2].item_name}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="3">{{not_selected[not_selected.length-3].item_name}}</el-radio><br>
                                <el-radio style="white-space: pre-line" :label="4">{{selected[0].item_name}}</el-radio><br>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </b-card>
            </el-form-item>
        </el-form>
    </div>
    <div style="text-align:center">
        <b-button variant="primary" @click="submit">Submit</b-button>
    </div>
</div>
  
</template>

<script>
import { asyncLoading } from 'vuejs-loading-plugin';
const config = require("../config.js");
const questions = require("../consistency_questions.js");
const voting_method = localStorage.getItem('voting_method');
let selected=[];
let not_selected=[];
if(voting_method.includes("Rank")){
    selected=JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value.includes("->")));
    not_selected=JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value.includes("->")));
} 
    
else {
    selected=JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value>0));
    not_selected=JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value==0));
}

export default {
    data(){
        let random_items=JSON.parse(localStorage.getItem('items')).sort(() => Math.random() - Math.random()).slice(0, 4);
        return{
            // random_items:JSON.parse(localStorage.getItem('items')).sort(() => Math.random() - Math.random()).slice(0, 2),
            random_items:random_items,
            price:100000,
            items:JSON.parse(localStorage.getItem('final_items')),
            // selected:JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value>0 || x.item_value.includes("->"))),
            // not_selected:JSON.parse(localStorage.getItem('final_items')).filter(x => (x.item_value==0 || x.item_value.includes("->"))),
            selected:selected,
            not_selected:not_selected,
            isConsistent:false,
            form:{
                question1:0,
                question2:0,
                question3:0,
            },
            db_track:"",
            rules: {
                allQuestions: [{ validator: this.qAll,trigger: 'blur'}],
                question1: {required: true,message: 'Please answer all questions.',trigger: 'blur'},
                question2: {required: true,message: 'Please answer all questions.',trigger: 'blur'},
                question3: {required: true,message: 'Please answer all questions.',trigger: 'blur'},
            },
            questions:questions.data[voting_method],
            voting_method: voting_method,
            finished:false,
        }
    },
    mounted(){
        this.voting_method= localStorage.getItem('voting_method');
        this.questions=require("../consistency_questions.js").data[this.voting_method];
    },
    methods:{
        qAll: async function(){
            if(this.form.question1 == 0 || this.form.question2 == 0 || this.form.question3 == 0){
                this.$loading(false);
                return new Promise((resolve, reject) => {reject(new Error('You must answer all questions'))});
            }
            
            if(this.form.question1 == 3)
                this.db_track+="1";
            else
                this.db_track+="0";

            if(this.form.question2 == 2)
                this.db_track+="1";
            else
                this.db_track+="0";
            
            if(this.form.question3 == 4)
                this.db_track+="1";
            else
                this.db_track+="0";

            console.log(this.db_track);
            if(this.db_track=="111")
                return new Promise((resolve, reject) => {resolve(true)});
            else
                return new Promise((resolve, reject) => {reject(new Error('.'))});

        },
        submit:async function(){
            if(new Date().getTime()-parseInt(localStorage.getItem("startTime"))>3600000){
              this.$parent.time_expired=true;
              return;
            }
            
            this.$loading(true);

            new Promise((resolve, reject) => {
                
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        this.isConsistent=true;
                        resolve(1)
                    } 
                    else{
                        this.isConsistent=false;
                        if(this.form.question1 == 0 || this.form.question2 == 0 || this.form.question3 == 0)
                            return;
                        resolve(0);
                    } 
                });
            })
            .then(async (consistant_value)=>{
                let consistant=this.db_track;
                let consistency_time=new Date().getTime()-parseInt(localStorage.getItem("budgeting_finish"));
                // console.log(parseInt(localStorage.getItem("consistency_finish")));
                console.log(consistency_time);
                let experiment_id=localStorage.getItem("experiment_id");
                try {
                    await this.axios.post("http://"+config.data.server+"/addConsistency",{
                        
                        experiment_id:experiment_id,
                        consistant:consistant,
                        consistency_time:consistency_time
                    });
                } 
                catch (error) {
                    console.log(error);
                    this.$parent.server_error=true;
                }
            })
            .then(()=>{
                this.$loading(false);
                let time=new Date().getTime();
                localStorage.setItem('consistency_finish',JSON.stringify(time));
                this.$router.push({ name: 'Feedback_quiz', params: {isConsistent: this.isConsistent }});
            });

        }
    }
}
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        width: 100%; /* full window width */
    }
    .q-body{
        padding-left:50px;
        border-left: thick solid #3f9396;
        float: left;
        margin-left: 150px;
        
        /* border-spacing: 50px 50px 50px 50px; */

    }
    .q-title{
        float: left;
        margin-top:60px;
        margin-right: 40px;
        position:absolute
    }


</style>