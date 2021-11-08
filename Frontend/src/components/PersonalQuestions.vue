<template>
    <div >
        <h2 style="text-align: center">Step 2: Demographic Questions</h2>
        <br><br>
        <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="ruleForm" >
            <b-card style="background-color: #e8e8e8;max-width:550px;margin:auto">
                <el-form-item >
                    <h3>How old are you?</h3>
                    <el-input-number style="margin-left:30px" size="medium" v-model="form.age" :min="18" :max="90"></el-input-number>
                </el-form-item>
                <br><br>
                <el-form-item prop="gender" >
                    <h3>Gender:</h3>
                    <el-select v-model="form.gender" placeholder="Select your gender" style="text-align:center;margin-left:30px"> 
                        <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <br><br>
                <el-form-item prop="education" >
                    <h3>Education:</h3>
                    <el-select style="margin-left:30px" v-model="form.education" placeholder="Select your education">
                        <el-option
                            v-for="item in educations"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </b-card>
        </el-form>
        <br><br>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            rules: {
                gender: {
                    required: true,
                    message: 'Please enter your gender.',
                    trigger: 'change'
                },
                education: {
                    required: true,
                    message: 'Please enter your education',
                    trigger: 'change'
                },
            },
            form:{
                age:18,
                gender:'',
                education:'',
            },
            genders:[{value:'Male'},{value:'Female'},{value:'Other'}],
            educations:[{value: 'Less than High School'},{value: 'High School/GED'},{value: 'College'},{value: 'Graduate degree'}]
        }
    }
}
</script>

<style scoped>
    .b-card{
        max-width:100px
    }
    h3{
        display: inline-block;
    }

@media (max-width:600px) {
    h3{
        display: block;
    }
    .b-card{
        max-width:100px
    }
}
</style>