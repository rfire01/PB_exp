<template>
  <fieldset>
    <h2 style="text-align: center">Step 3: Instructions</h2>
    <br>
    <b-card style="background-color:#e8e8e8; max-width:900px;margin: auto;">
      <h3>The task:</h3>
        <!-- <div  style="float:right; margin-left:20px"></div> -->
        You are a resident in Utopia City and the city council has decided to spend a portion 
        of the city budget this year on improving the residents’ quality of life. 
        Several types of infrastructure upgrades, located across the city, have been proposed. 
        Based on earlier discussions with the residents, the list has been narrowed down to {{num_of_projects}} projects. 
        Unfortunately, the budget is not sufficient to implement all {{num_of_projects}} projects, so you have the opportunity to 
        help decide which projects should be prioritized.
        
    </b-card>
    
    <b-card style="background-color:#e8e8e8; max-width:900px;margin: auto;">
      <h3>What you need to do: </h3>
      <br>
      <p>(If the video looks blurry, you can double-click on it to improve the quality and to see it in full screen)</p>
      <!-- <iframe src="https://drive.google.com/file/d/12d6RFFXi6tIfJxodV9EjujNuoGq9_YWc/preview?vq=large" width="850" height="395" allowfullscreen></iframe> -->
      <iframe :src="getVideo()" width="850" height="395" allowfullscreen></iframe>
      <!-- <insturcionsTodo ref="todo"></insturcionsTodo> -->
    </b-card>
    <b-card style="background-color:#e8e8e8; max-width:900px;margin: auto;">
      <h3>The next steps:</h3>
      <br>
      <h5>1) Quiz</h5>
      You will answer a quiz based on the information you learned from this page.
      <br><br>
      <h5>2) The Task</h5>
      You will choose the projects you'd like to see funded.
      <br><br>
      <h5>3) Consistency check</h5>
      You will be asked 3 simple questions about your choices, in order to make sure you paid attention (answering all three questions correctly will grant you the bonus payment).
      <br><br>
      <h5>4) Feedback</h5>
      The final part is for you to give us feedback on your experience (you must complete this step to get your payment).
      <br><br>
      <h5>*Notice:</h5>
      Going backward after finishing a step in the experiment will disqualify you and you will not recieve payment.
    </b-card>
    <b-card style="background-color:#e8e8e8; max-width:900px;margin: auto;">
      <h3>Your payment:</h3>
        <ul>
            <li>40 cent payment for the task contingent on passing a quiz and finishing the subsequent steps. </li>
            <li>30 cent bonus for correctly answering a consistency test after submitting the task.</li>
        </ul>
    </b-card>
  </fieldset>
</template>

<script>
import insturcionsTodo from './insturcionsTodo.vue';
export default {
  // components: { insturcionsTodo },
  data(){
        return{
            voting_method:localStorage.getItem('voting_method'),
            num_of_projects: localStorage.getItem('num_of_projects')
        }
  },
  methods:{
    getVideo(){
      if(this.voting_method==`Utilities`) 
        return "https://drive.google.com/file/d/1SLjAr3v55kvLrGNKH1CP0kmobBN9TDEa/preview";
      if(this.voting_method==`Knapsack`) 
        return "https://drive.google.com/file/d/14w7iHHImeV-WqFKBokdCfgHSf4pPWdOe/preview";
      if(this.voting_method==`k_approval`) 
        return "https://drive.google.com/file/d/1Vv9jacnlmmFGn7_xmrYTTGy_-KdpEeAh/preview";
      if(this.voting_method==`Ranking_value`) 
        return "https://drive.google.com/file/d/1pt25Mbwo7Ljn4qcg0XWVp3u052P-QRkd/preview";
      if(this.voting_method==`Threshold`) 
        return "https://drive.google.com/file/d/1PM2JXrbZkDfAfPbH92sXbc5w6SSxrGHd/preview";
      if(this.voting_method==`Ranking_value_money`) 
        return "https://drive.google.com/file/d/14ZYZHtBEmeb17j--E1QYz-Qk-Qx5v-yv/preview";
    }
  }

}
</script>

<style>
  /* p {
      max-width: 85%;
      padding-left: 20%;
  }
  h3 {
      max-width: 85%;
      padding-left: 20%;
  } */
</style>