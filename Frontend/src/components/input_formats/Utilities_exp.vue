<template>
    <div>
        <h1 style="margin-top:20px;font-family: 'Courier New', monospace;text-align:center;">Improving Utopia City</h1>
        <div class='row'>
            <div class='column1'>
                <apexchart  type="pie" width="300" :options="chartOptions" :series="series[0].data"></apexchart>
                <p style="position:relative;left:5%;" >
                    <b>Points used:</b> {{currSum}}
                    <br><br>
                    <span ref="moneyLabel"><b>Points left:</b> {{budget-currSum}}</span>
                </p>
                <div style="text-align:center;position:absolute;border-radius: 25px; border: 3px solid #555; background-color:lightblue; width:250px; margin-left:10px; margin-top:40px;padding:10px">
                    <u><b> What you need to do</b></u>
                    <br>
                    <a> You need to distribute {{(budget).toLocaleString({ style: 'currency'})}} among the projects. The more money you assign to a project, the more important it is to build.</a>
                    <br><br>
                    <b-button @click="$bvModal.show('instructions_modal')" variant="outline-primary">Show instructions</b-button>
                </div>
                <b-modal size="lg" id="instructions_modal" hide-footer>
                        <instructions/>
                        <b-button variant="outline-primary" block @click="$bvModal.hide('instructions_modal')">Close</b-button>
                    </b-modal>
            </div>
            <div class='column2'>
                <filter-group/>
                <b-table sticky-header="500px" @row-clicked="details" striped hover table-variant='light' head-variant="dark" :items="items" :fields="fields"
                            ref="selectableTable" responsive="sm" @row-hovered="rowHovered" @row-unhovered="rowUnHovered" class="table-sm">
                    <template #cell(arrow)="row">
                        <img :style='row.item._showDetails ? "margin-top:5px" : "transform: rotate(270deg); margin-top:5px"' src="../../assets/arrow.png" width="20" height="10">
                    </template>
                    <template #cell(group)="row">
                        <img :src="$parent.getImageURL(row.item.item_group)" alt="" width="30" height="30" v-b-tooltip.hover :title="row.item.item_group"/>
                    </template>
                    <template slot="cell(range)" slot-scope="row">
                        <b-form-input v-model="row.item.given_value" type="range" min="0" max="100" step="1" @change="calc(row)"></b-form-input>
                        <!-- <b-form-checkbox size="lg" v-model="row.item.selected" :ref="row.item.item_name+'_check'" :id="'a'+row.index" @change="update($event,row)"></b-form-checkbox> -->
                    </template>
                    <template #row-details="row">
                        <b-card>
                            {{row.item.item_desc}}
                        </b-card>
                    </template>
                </b-table>
                <b-alert style="text-align:center" v-if="!goodSum" show variant="danger">Please make sure the values add to a {{(budget).toLocaleString({ style: 'currency'})}} </b-alert>
                <div style="float: right">
                    <b-button variant="outline-primary" @click="resetTable" style="width: 100px;">Reset</b-button>
                    <b-button variant="outline-primary" @click="normalize" style="margin-left:10px;width: 100px;">Normalize</b-button>
                    <b-button variant="outline-primary" @click="submit" style="margin-left:10px;width: 100px;">Submit</b-button>
                </div>
            </div>
            <div class='column3'>
                <Map ref="map"/>
            </div>
        </div>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Map from '../Map.vue';
import FilterGroup from '../FilterGroup.vue';
import Instructions from '../Instructions.vue';

const config = require("../../config.js");

export default {
    components: { Map,apexchart:VueApexCharts,FilterGroup,Instructions },
    data(){
        return{
            currSum:0,
            budget: 100,
            goodSum:true,
            items: JSON.parse(localStorage.getItem('items')).map(v => ({...v, given_value: 0,_showDetails:false})),
            fields: [ 
                {key: "arrow", label: ''},
                {key: "group", label: 'Category'},
                {key: "item_name", label: 'Project',sortable: true ,class:"text-center"},
                {key: "range", label: ''},
                {key: "given_value", label: 'value',
                formatter: (value, key, item) => {
                        return item.given_value.toLocaleString({ style: 'currency'});
                    }
                },
                // { key: "given_value", label: 'value'},
            ],
            chartOptions: {
                dataLabels: {enabled: false},
                labels: [],
                legend: {show: false},
            },
            series: [{data:[100,0]}] ,
        }
    },
    computed:{

    },
    methods:{
        details (item, index, event) {
            item._showDetails = !item._showDetails;
        },
        calc(row){
            let arr=[];
            this.currSum=0;
            this.items.forEach(item => {
                this.currSum+=parseInt(item.given_value) ;
            });
            this.items.forEach(item => {
                arr.push(Math.round((item.given_value/this.currSum)*this.budget));
            });
            if(this.currSum>this.budget) this.$refs.moneyLabel.style.color = 'red';
            else this.$refs.moneyLabel.style.color = 'black';

            this.chartOptions.labels=this.items.map(value => value.item_name);
            this.chartOptions={
                dataLabels: {enabled: false},
                labels: this.items.map(value => value.item_name),
                legend: {show:false,position: 'bottom',horizontalAlign: 'left', },
            };
            this.series=[{data:arr}];

        },
        rowHovered(item){
            this.$refs.map.changeOpacity(item.item_name,1);
        },
        rowUnHovered(item,index){
            if(item.given_value==0)
                this.$refs.map.changeOpacity(item.item_name,0.3);
        },
        normalize(){
            // let currSum=0;
            // this.items.forEach(item => {
            //     currSum+=parseInt(item.given_value) ;
            // });
            if(this.currSum!=this.budget && this.currSum>0 && this.currSum!=this.budget){
                this.items.forEach(item => {
                    item.given_value=Math.round((item.given_value/this.currSum)*this.budget);
                    // item.given_value=(item.given_value/this.currSum)*this.budget;
                });
            }
            if(this.currSum>0) {
                this.currSum=this.budget;
                this.goodSum=true;
            }
            this.$refs.moneyLabel.style.color = 'black';
        },
        resetTable(){
            this.items.forEach(item => {
                item.given_value=0;
                this.$refs.map.changeOpacity(item.item_name,0.3);
            });
            this.chartOptions={
                dataLabels: {enabled: false},
                labels: this.items.map(value => value.item_name),
                legend: {show:false,position: 'bottom',horizontalAlign: 'left', },
            };
            this.series= [{data:[100,0]}]
            this.currSum=0;
            this.$refs.moneyLabel.style.color = 'black';
        },
        async submit(){
            if(this.currSum!=this.budget){
                this.goodSum=false;
                return;
            }

            if (!confirm("Once you press OK you can't go back and change your choices"))
                return;

            let time=new Date().getTime();
            localStorage.setItem('budgeting_finish',JSON.stringify(time));
            let final_items=[];
            this.items.forEach(item => {
                final_items.push({item_id:item.item_id,item_name:item.item_name,item_value:item.given_value,item_price:item.item_value});
            });
            localStorage.setItem('final_items',JSON.stringify(final_items));

            await this.$parent.addExperiment();
            this.$router.push("/Consistency");

        },
    }
}
</script>

<style scoped>
    html {
        overflow-y: scroll; 
    }
    .column1 {
        float: left;
        width: 20%;
        padding: 10px;
    }
    .column2 {
        float: left;
        width: 40%;
        padding: 10px;
    }
    .column3 {
        float: left;
        width: 40%;
        padding: 10px;
    }
    .row {
        content: "";
        display: table;
        clear: both;  
    }
    tr{
        height: 45px;
    }
    .card-body{
        max-width: 600px;
    }

    @media (max-width:1300px){
        .column1 {
            float: left;
            width: 30%;
            padding: 10px;
        }
        .column2 {
            float: left;
            width: 65%;
            padding: 10px;
        }
        .column3 {
            float: left;
            width: 100%;
            padding: 10px;
            margin-left: 400px;
        }
        .apexchart{
            position:relative;
            left:-10%;
        }
    }
    @media (max-width:720px){
        .column1 {
            float: left;
            width: 100%;
            padding: 10px;
        }
        .column2 {
            float: left;
            width: 100%;
            padding: 10px;
        }
        .column3 {
            float: left;
            width: 100%;
            padding: 10px;
        }
        .apexchart{
            position:relative;
            left:20%;
        }
    }
</style>