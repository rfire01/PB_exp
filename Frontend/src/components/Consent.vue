<template>
<div>
    <fieldset>
        <h2 style="text-align: center"><u>Step 1: Consent</u></h2>
        <br>
        <b-card style="background-color:#e8e8e8; max-width:900px;margin: auto;">
            <p>Please consider the following carefully before accepting the task.</p>
            <hr>
            <p><strong>PURPOSE OF RESEARCH:</strong> To understand people’s preferences regarding the allocation of public budget and to evaluate the effectiveness of various decision-making algorithms.</p>
            <hr>
            <!-- <p><strong>WHAT YOU WILL DO:</strong> {{this.getTodo()}}</p> -->
            <p><strong>WHAT YOU WILL DO:</strong> You will provide your preferences regarding how to distribute a public budget in a hypothetical scenario. In such a scenario, you may be asked to evaluate how much you like a spending plan given your preferences, or how adequate you think a spending plan is given other people’s preferences.</p>
            <hr>
            <p><strong>TIME REQUIRED:</strong> Participation will take approximately 10-15 minutes.</p>
            <hr>
            <p><strong>RISKS:</strong> There are no anticipated risks associated with participating in this study. The effects of participating should be comparable to those you would experience from viewing a computer monitor for 4 minutes and using a mouse.</p>
            <hr>
            <p><strong>COMPENSATION:</strong> Upon completion of this task, you will receive a base payment of 40 cents. Furthermore, you can win a bonus payment of 30 cents.</p>
            <hr>
            <p><strong>CONFIDENTIALITY:</strong> You will be asked to provide your age, gender and education, no other personally identifiable information will be collected..</p>
            <hr>
            <p><strong>PARTICIPATION AND WITHDRAWAL:</strong> Your participation in this study is voluntary, and you may withdraw and return the task to Amazon Mechanical Turk at any time by closing the web page of the task. You will receive a compensation only if you complete the task.</p>
            <hr>
            <p><strong>CONTACT:</strong> If you have any questions, concerns or complaints about this research study, please contact the researcher for this study at improve.pb@gmail.com.<br> Additionally, if you have any questions about your rights as participants in this experiment, please contact the Research Oversight and Compliance Office - Human Research Ethics Program at the University of Toronto (ethics.review@utoronto.ca, 416-946-3273).</p>
            <hr>
            <p><strong>AGREEMENT:</strong> The nature and purpose of this research have been sufficiently explained and I agree to participate in this study. I understand that I am free to withdraw at any time.</p>
        </b-card>
    </fieldset>
    <div style="text-align: center">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="ruleForm" >
            <!-- <el-form-item label="temp" prop="agree">
                <span slot="label"><b>Do you agree to participate in this study?</b></span>
                <el-select v-model="formInline.agree" placeholder=" ">
                    <el-option label="Yes" value="Yes"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="temp" prop="check_agree">
                <span style="font-size: 20px;" slot="label"><b>Do you agree to participate in this study?</b></span>
                <el-checkbox size="medium" v-model="formInline.check_agree"></el-checkbox>
            </el-form-item>
        <b-alert style="text-align:center" v-if="!formInline.check_agree" show variant="danger">You must agree to participate.</b-alert>
        </el-form>
    </div>
</div>
  
</template>

<script>
export default {
    props: ['todo'],
    data() {
        return {
            formInline: {
                // agree: '',
                check_agree:false
            },
            rules: {
                check_agree:[{ validator: this.validateAgreement,trigger: 'blur'}],
                // agree: {
                //     required: true,
                //     message: 'You must agree to participate',
                //     trigger: 'change'
                // },
            }
        }
    },
    methods: {
        getTodo(){
            let voting_method=localStorage.getItem('voting_method');
            if(voting_method=='Knapsack')
                return 'You will select how to distribute a budget of $500,000, by selecting from a list of items.';
            else if(voting_method=='k_approval')
                return 'You need to select up to 5 projects from a list of 10. There are no right or wrong answers to this task.';
            else if(voting_method=='Ranking_value')
                return 'You need to rank the projects from the most important to the least important according to your best judgment.';
            else if(voting_method=='Ranking_value_money')
                return 'Rank the projects by "value for money" according to your best judgement.';
            else if(voting_method=='Threshold')
                return 'If $500,000 are divided among the projects based on their importance, which projects do you think should get at least 50,000?';
            else if(voting_method=='Utilities')
                return 'You will be asked to distribute $500,000 among 10 projects.';
        },
        validateAgreement: async function(){
            if (this.formInline.check_agree==false) 
            {
                return new Promise((resolve, reject) => {reject(new Error(' '))});
            }
            else return new Promise((resolve, reject) => {resolve(true)});
        }
    }
}   
</script>

<style>
    /* p {
    max-width: 85%;
    padding-left: 20%;
    } */
</style>