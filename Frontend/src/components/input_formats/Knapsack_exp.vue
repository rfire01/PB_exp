<template>
    <div id='app' >
            <div class='row'>
                <h1 style="margin-top:20px;font-family: 'Courier New', monospace;text-align:center;">Improving Utopia City</h1>
                <div class='column1'>
                    <div class="apexchart"><apexchart type="pie" width="300" :options="chartOptions" :series="series[0].data"></apexchart></div>
                    <p style="position:relative;left:5%;" >
                       <b>Money spent:</b> {{money_spent.toLocaleString('ja-JP',{ style: 'currency',currency: 'USD',maximumFractionDigits:0})}}
                       <br><br>
                       <span ref="moneyLabel"><b>Budget left:</b> {{(budget-money_spent).toLocaleString('ja-JP',{ style: 'currency',currency: 'USD',maximumFractionDigits:0})}}</span>
                    </p>
                    <div class="instruction">
                        <u><b> What you need to do</b></u>
                        <br>
                        <a> You need to select your preferred projects given the budget limit of {{(budget).toLocaleString('ja-JP',{ style: 'currency',currency: 'USD',maximumFractionDigits:0})}}.</a>
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
                    <b-table sticky-header="500px" striped hover table-variant='light' head-variant="dark" :items="items" :fields="fields"
                            ref="selectableTable" responsive="sm" @row-hovered="rowHovered" @row-unhovered="rowUnHovered"
                            @row-clicked="details" style="" class="table-sm">
                        <template #cell(arrow)="row">
                            <img :style='row.item._showDetails ? "margin-top:5px" : "transform: rotate(270deg); margin-top:5px"' src="../../assets/arrow.png" width="20" height="10">
                        </template>
                        <template #cell(group)="row">
                            <img :src="$parent.getImageURL(row.item.item_group)" alt="" width="30" height="30" v-b-tooltip.hover :title="row.item.item_group"/>
                        </template>
                        <template slot="cell(select)" slot-scope="row">
                            <b-form-checkbox size="lg" v-model="row.item.selected" @change="update($event,row)"></b-form-checkbox>
                        </template>
                        <template #row-details="row">
                            <b-card>
                                {{row.item.item_desc}}
                            </b-card>
                        </template>
                    </b-table>
                    <b-alert style="text-align:center" v-if="!somethingSelected" show variant="danger">You must select some projects.</b-alert>
                    <div style="float: right">
                        <b-button variant="outline-primary" @click="resetTable" style="width: 70px;">Reset</b-button>
                        <b-button variant="outline-primary" @click="submit" style="margin-left:10px;width: 70px;text-align: center;">Submit</b-button>
                    </div>
                </div>
                <div class="column3">
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

export default {
    components: { apexchart:VueApexCharts,Map, FilterGroup, Instructions, },
  data() {
      return{
        budget: 500000,
        money_spent: 0,
        items: JSON.parse(localStorage.getItem('items')).map(v => ({...v, selected: false,_showDetails: false})),
        //for table
        fields: [ 
            {key: "arrow", label: ''},
            {key: "group", label: 'Category'},
            {key: "item_name", label: 'Project',sortable: true ,class:"text-center"},
            { key: "item_value", label: 'Price',sortable: true,class:"text-center",
                formatter: (value, key, item) => {
                    return value.toLocaleString('ja-JP',{ style: 'currency',currency: 'USD',maximumFractionDigits:0});
                }
            },
            // { key: "info",label:'' },
            { key: "select",label:'',class:"text-center" }
        ],
        //for chart
        chartOptions: {
            dataLabels: {
                enabled: false
            },
            labels: ['Left', 'Used'],
            legend: {
                  position: 'top'
                },
            // colors: ['#EAEAEA', '#BFC0C2']
            colors: ['#87E778', '#EE6259']
        },
        series: [{data:[500000,0]}] ,
        somethingSelected:true
      }
  },
  mounted(){
    //   this.$router.go()
    },
  methods: {
    details (item, index, event) {
        item._showDetails = !item._showDetails;
    },
    update(e,row) {
        if(e){
            if(row.item.item_value>this.budget-this.money_spent){
                let self=this;
                setTimeout(function(){
                    self.items.forEach(item => {
                        if(item.item_name==row.item.item_name){ item.selected=false;console.log(item.selected);}
                    });
                }, 5);
                this.$refs.moneyLabel.classList.add('run-animation');
                setTimeout(function(){
                        self.$refs.moneyLabel.classList.remove('run-animation');
                }, 500);
                

            }
            else{
                this.$refs.map.changeOpacity(row.item.item_name,1);
                this.money_spent+=row.item.item_value;
                this.somethingSelected=true;
                // this.selected.push(row.item);
            }

        }
        else{
            this.$refs.map.changeOpacity(row.item.item_name,0.3);
            this.money_spent-=row.item.item_value;
            // this.selected=this.selected.filter(item => item.item_name != row.item.item_name);
        }
        // console.log(this.selected);
        this.series=[{data:[this.budget-this.money_spent,this.money_spent]}];
    },
    rowHovered(item){
        this.$refs.map.changeOpacity(item.item_name,1);
    },
    rowUnHovered(item,index){
        let isSelected=this.items.filter(obj => {return obj.item_name == item.item_name})[0].selected;
        if(!isSelected){
            this.$refs.map.changeOpacity(item.item_name,0.3);
        }
    },
    resetTable(){
        this.money_spent=0;
        this.series=[{data:[this.budget,this.money_spent]}];
        this.items.forEach(item => {
            item.selected=false;
            this.$refs.map.changeOpacity(item.item_name,0.3);
        });
    },
    async submit(){
        if (!confirm("Once you press OK you can't go back and change your choices"))
                return;
                
        let final_items=[];
        let itemsSelected=0;
        this.items.forEach(item => {
            if(item.selected){
                final_items.push({item_id:item.item_id,item_name:item.item_name,item_value:1,item_price:item.item_value});
                itemsSelected++;
            }
            else{
                final_items.push({item_id:item.item_id,item_name:item.item_name,item_value:0,item_price:item.item_value});
            }
        });
        // console.log(final_items);
        if(itemsSelected==0){
            this.somethingSelected=false;
            return;
        }
        let time=new Date().getTime();
        localStorage.setItem('budgeting_finish',JSON.stringify(time));
        localStorage.setItem('final_items',JSON.stringify(final_items));

        await this.$parent.addExperiment();
        this.$router.push("/Consistency");

    }
  }
};
</script>

<style scoped>
    .column1 {
        float: left;
        width: 15%;
        padding: 10px;
    }
    .column2 {
        float: left;
        width: 43%;
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
    /* html {
        overflow-y: scroll; 
    } */
    .run-animation{
        animation:change 0.5s;
    }
    .instruction{
        text-align:center;
        /* position:absolute; */
        border-radius: 25px; 
        border: 3px solid #555; 
        background-color:lightblue; 
        width:90%; 
        margin-left:10px; 
        margin-top:40px;
        padding:10px
    }
    .apexchart{
        position:relative;
        left:-25%;
    }
    tr{
        height: 45px;
    }
    .card-body{
        max-width: 600px;
    }

    @keyframes change {
        /* from { color: red; font-size: 140%; }
        to   { color: black } */
        0% { color: black; }
        50%   { color: red; font-size: 140%; }
        100%   { color: black }
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
    /* @media (max-width:500px){
        .column1 {
            float: none;
            width: 20%;
            padding: 10px;
        }
        .column2 {
            float: none;
            width: 40%;
            padding: 10px;
        }
        .column3 {
            float: none;
            width: 40%;
            padding: 10px;
        }
        .instruction{
            border-radius: 25px; 
            border: 3px solid #555; 
            background-color:lightblue; 
            width:200%; 
            margin-left:100%; 
            padding:10px
        }
        .h1{
            white-space: normal
        }
    } */
</style>