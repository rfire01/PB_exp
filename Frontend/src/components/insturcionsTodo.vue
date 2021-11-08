<template>
  <div>
    <div v-if="voting_method==`Utilities`">
        <br>
        You will be asked to distribute 100 points among {{num_of_projects}} projects. The more points you assign to an item, the more important you think the item is to your city.
        <br><br>
        <b>Below is an example</b> of the interface you will be using shown for an imaginary citizen called Alex.
        The projects that Alex finds most useful (in decreasing order of importance) are:
        <ul>
            <li>Building an amphitheater in the public park</li>
            <li>Soak Up the Solar Power</li>
            <li>Security Cameras</li>
        </ul>
        For example, in the following image, you can see a <b>possible rating</b> by Alex:
        <br><br>
        <img src="../assets/instructions/Utilities.png" width="70%" style="margin:auto; display:block">
        <br><br>
        <b>Note:</b>
        <br>
            You can use the Normalize button to automatically adjust your values to add up to 100 while keeping the relative importance of items intact.
            You will only be able to press the SUBMIT button if the values add up to 100.
    </div>
    <div v-else-if="voting_method==`Knapsack`">
        <br>
        The city council has reserved a budget of $500,000 to fund infrastructure projects this year. 
        You need to select the projects that you would personally like to see funded given this budget limit.
        <br><br>
        <b>Below is an example</b> of the interface you will be using, filled out by an imaginary resident named Alex.
        The projects that Alex prefers are:
        <ul>
            <li>We Need More Crosswalks</li>
            <li>Soak Up the Solar Power</li>
            <li>Remodel the Kitchen at the Youth Center</li>
        </ul>
        On the left you can see the total cost of the selected projects and the unused portion of the budget.
        <br><br>
        <img src="../assets/instructions/Knapsack.png" width="90%" style="margin:auto; display:block">
        <br><br>
        <b>Note:</b>
        <br>
            Alex can no longer add another project even through he has not exhausted his entire budget.
    </div>
    <div v-else-if="voting_method==`k_approval`">
        <br>
        You will be presented with {{num_of_projects}} projects and asked to select up to 5 projects that you would most like to see funded
        <br><br>
        <b>Below is an example</b> of the interface you will be using, filled out by an imaginary resident named Alex. <br>
        The projects that Alex would like to see funded are:
        <ul>
            <li>We Need More Crosswalks</li>
            <li>Security Cameras</li>
            <li>Interactive Technology for the Main Library</li>
        </ul>
        In the following image, you can see the choices of Alex and the number of projects selected.
        Up to two additional projects can be selected.
        <br><br>
        <img src="../assets/instructions/k_approval.png" width="90%" style="margin:auto; display:block">
    </div>
    <div v-else-if="voting_method==`Ranking_value`">
        <br>
        Rank the suggested projects from most to least important according to your preferences.
        <br><br>
        <b>Below is an example</b> of the interface you will be using. <br>
        You will be asked to rank the items from MOST important (at the top) to the LEAST important (bottom). <br>
        You can CLICK and DRAG on an item to change its ranking in the list.
        <br><br>
        <img src="../assets/instructions/Ranking_value.gif" width="60%" style="margin:auto; display:block">

    </div>
    <div v-else-if="voting_method==`Threshold`">
        <br>
        Select each of the following projects ONLY if the answer to the following question is YES. <br>
        If 100 points are divided among the projects based on their importance, should this project get AT LEAST 10 points?
        <br> Use your best judgement.
        <br><br>
        <b>Below is an example</b> of the interface you will be using shown for an imaginary citizen called Alex. <br>
        The projects that Alex finds worth at least 10 out of 100 points are:
        <ul>
            <li>We Nedd More Crosswalks</li>
            <li>Security Cameras</li>
            <li>Nursing Pod for Mothers and Infants</li>
        </ul>
        In the following image, you can see the choices of Alex and the number of selected proejcts.
        <br><br>
        <img src="../assets/instructions/Threshold.png" width="90%" style="margin:auto; display:block">
    </div>
    <div v-else-if="voting_method==`Ranking_value_money`">
        <br>
        You need to rank the projects by “value for money”, which measures the project's importance to you relative to the cost of the project.
        <br><br>
        <b>Below is an example</b> of the interface you will be using shown for an imaginary citizen called Alex. <br>
        The “value for money” for a project is computed as the utility of the project divided by cost. <br>
        For example: if the project "Dog Park" costs $250,000 and you utility for it is 250, then the "value for money" for it will be 1000. <br>
        Rank the projects from greatest “value for money”  (top of the list) to least “value for money” (bottom of the list). <br> 
        CLICK and DRAG on the project to change its ranking in the list. <br>
        You need to sort the list in DECREASING order of “value for money” (from the highest value to the lowest value).
        <br><br>
        <img src="../assets/instructions/Ranking_value_money.gif" width="60%" style="margin:auto; display:block">
        <br><br>
        <b>Note:</b>
        <br>
            The interface you will use won’t include the columns “utility for Alex” and “Value for money”. 
            You need to think independently about what is the utility for each project and compute the “value for money” for each project.
    </div>

    <div v-else> no todo</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            voting_method:localStorage.getItem('voting_method'),
            num_of_projects: localStorage.getItem('num_of_projects')
        }
    }
}
</script>

<style>

</style>