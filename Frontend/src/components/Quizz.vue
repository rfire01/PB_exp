<template>
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=yes">
        <h2 style="text-align: center">Step 4: Quiz</h2>
        <br>
        <div style="padding-left: 10%;">
            
            <el-form style="white-space: normal" :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="ruleForm">
                <el-form-item prop="allQuestions">
                    <b-card style="background-color:#e8e8e8;">
                        <h4 class="q-title" >Question 1</h4>
                        <div class="q-body" >
                            <h4 style="white-space: pre-line">{{questions.q1.q}}</h4>
                            <br>
                            <el-form-item prop="q1">
                                <el-radio-group v-model="formInline.question1">
                                    <el-radio style="white-space: pre-wrap" :label="1">{{questions.q1.ans1}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="2">{{questions.q1.ans2}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="3">{{questions.q1.ans3}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="4">{{questions.q1.ans4}}</el-radio><br>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </b-card>
                    <br>
                    <b-card style="background-color: #e8e8e8;">
                        <h4 class="q-title">Question 2</h4>
                        <div class="q-body">
                            <h4 style="white-space: pre-line"> {{questions.q2.q}}</h4>
                            <br>
                            <el-form-item prop="q2">
                                <el-radio-group v-model="formInline.question2" type="vertical">
                                    <el-radio style="white-space: pre-wrap" :label="1">{{questions.q2.ans1}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="2">{{questions.q2.ans2}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="3">{{questions.q2.ans3}}</el-radio><br>
                                    <el-radio style="white-space: pre-wrap" :label="4">{{questions.q2.ans4}}</el-radio><br>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </b-card>
                    
                    <br>
                    <b-card style="background-color: #e8e8e8;">
                        <h4 class="q-title">Question 3</h4>
                        <div class="q-body">
                            <h4 style="white-space: pre-line"> {{questions.q3.q}}</h4>
                            <br>
                            <img v-if="this.voting_method.includes('Rank')" class="quizimage2" :src="getImageURL(this.voting_method+'1')">
                            <img v-else class="quizimage1" :src="getImageURL(this.voting_method+'1')">
                            
                            <el-form-item prop="q3" style="float:left;position:relative">
                                <el-radio-group v-model="formInline.question3" type="vertical">
                                    <el-radio style="margin-top:50px;white-space: pre-wrap" :label="1">{{questions.q3.ans1}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="2">{{questions.q3.ans2}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="3">{{questions.q3.ans3}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="4">{{questions.q3.ans4}}</el-radio><br>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </b-card>
                    <br>
                    <b-card style="background-color: #e8e8e8;">
                        <h4 class="q-title">Question 4</h4>
                        <div class="q-body">
                            <h4 style="white-space: pre-line"> {{questions.q4.q}}</h4>
                            <br>
                            <img v-if="this.voting_method.includes('Rank')" class="quizimage2" :src="getImageURL(this.voting_method+'2')">
                            <img v-else class="quizimage1" :src="getImageURL(this.voting_method+'2')">

                            <el-form-item prop="q4" style="float:left;position:relative">
                                <el-radio-group v-model="formInline.question4" type="vertical">
                                    <el-radio style="margin-top:50px;white-space: pre-wrap" :label="1">{{questions.q4.ans1}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="2">{{questions.q4.ans2}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="3">{{questions.q4.ans3}}</el-radio><br>
                                    <el-radio style="margin-top:70px;white-space: pre-wrap" :label="4">{{questions.q4.ans4}}</el-radio><br>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </b-card>
                    
                </el-form-item>
            </el-form>
            <br>

        </div>
            <b-alert style="text-align:center;font-size: 130%;" show variant="warning">Double check yourself as you have only one chance! <br>
                            If you fail this quiz, you will not be able to participate in this study. <br>
                            If you need, you can click on the 'Back' button to read the instructions again.
            </b-alert>
    </div>
    
</template>

<script>
const questions = require("../quiz_questions.js");
const voting_method = localStorage.getItem('voting_method');
console.log(questions.data["Threshold"]);
export default {
    data(){
        return{
            formInline:{
                question1:0,
                question2:0,
                question3:0,
                question4:0     
            },
            // voting_method:localStorage.getItem('voting_method'),
            rules: {
                allQuestions: [{ validator: this.q1Vall,trigger: 'blur'}],
            },
            questions:questions.data[voting_method],
            // voting_method: localStorage.getItem('voting_method')
            voting_method: voting_method
        }
        
    },
    mounted(){
        this.voting_method= localStorage.getItem('voting_method');
        this.questions=require("../quiz_questions.js").data[this.voting_method];
    },
    methods:{
        q1Vall: async function(){
            if (this.formInline.question1 != 3 || this.formInline.question2 != 2 || this.formInline.question3 != 1 || this.formInline.question4 != 4) 
            {
                return new Promise((resolve, reject) => {reject(new Error('Wrong!'))});
            }
            else return new Promise((resolve, reject) => {resolve(true)});
        },    
        getImageURL(img){
            return require('../assets/quiz_examples/'+img+'.png');
        },
    }
}
</script>

<style>
.q-body{
    border-left: thick solid #3f9396;
    padding-left:50px;
    float: left;
    position:relative;
    /* border-spacing: 50px 50px 50px 50px; */
}
.q-title{
    float: left;
    margin-top:65px;
    padding-right: 40px;
    white-space: pre
}
.quizimage1{
    margin-left:30px;
    border: 5px solid #555;
    width:650px;
    /* width:30%; */
    height: auto;
}
.quizimage2{
    margin-left:30px;
    border: 5px solid #555;
    width:500px;
    /* width:100%; */
    height: auto;
}
/* .el-radio,h4{
    white-space: normal,
} */
@media (max-width:1300px) {
    .q-body{
        border-left: thick solid #3f9396;
        padding-left:50px;
        float: left;
        position:relative;
    }
    .q-title{
        float: left;
        margin-top:65px;
        padding-right: 40px;
        white-space: pre;
    }
    .quizimage1{
        border: 5px solid #555;
        width:500px;
        margin-left:0px;
    }
    .quizimage2{
        margin-left:30px;
        border: 5px solid #555;
        width:50%;
        margin-left:0px;
    }
}
</style>