<template>
    <div>
        <br>
        <h1 style="font-family: 'Courier New', monospace;text-align:center;">Improving Utopia City</h1>
            <div class='row'>
                <div class='column1'>
                    <div style="text-align:center;position:absolute;border-radius: 25px; border: 3px solid #555; background-color:lightblue; width:250px; margin-left:10px; margin-top:40px;padding:10px">
                        <u><b> What you need to do</b></u>
                        <br>
                        <a> You need to rank the projects by "value for money", which measures the project importance to you relative to the cost of the project.</a>
                        <br><br>
                        <b-button @click="$bvModal.show('instructions_modal')" variant="outline-primary">Show instructions</b-button>
                    </div>
                    <b-modal size="lg" id="instructions_modal" hide-footer>
                        <instructions/>
                        <b-button variant="outline-primary" block @click="$bvModal.hide('instructions_modal')">Close</b-button>
                    </b-modal>
                </div>
                <div class='column2'>
                    (click on a project to show more details)
                    <b-table head-variant="dark" :fields="fields" thead-class=""> </b-table>
                    <draggable v-model="items" :forceFallback="true" @start="startDrag" @end="finishDrag" style="margin-top:-15px;overflow: scroll;height:530px">
                        <div v-for="(item,index) in items" :key="item.item_name">
                            <br v-if="index==0">
                            <b-table @row-clicked="details" style="cursor: all-scroll;margin-top:-20px" striped hover table-variant='light' head-variant="dark" :items="item" :fields="fields" thead-class="d-none"
                                        ref="selectableTable" responsive="sm" @row-hovered="rowHovered" @row-unhovered="rowUnHovered" >
                                <template #cell(details)="row">
                                    <img :style='row.item._showDetails ? "margin-top:5px" : "transform: rotate(270deg); margin-top:5px"' src="../../assets/arrow.png" width="20" height="10">
                                    <img style="margin-left:10px;margin-right:20px" :src="getImageURL(row.item.item_group)" alt="" width="30" height="30" v-b-tooltip.hover :title="row.item.item_group"/>
                                    <!-- <b-button size="sm" disabled variant="primary" style="float: left;margin-left:10px;margin-top:0px;border-radius: 25px;">{{index+1}} )</b-button> -->
                                    {{row.item.item_name}}
                                </template>
                                <template #row-details="row">
                                    <b-card>
                                        {{row.item.item_desc}}
                                    </b-card>
                                </template>
                            </b-table>
                        </div>
                    </draggable>
                    <div style="float: right">
                        <b-button variant="outline-primary" @click="submit">Submit</b-button>
                    </div>
                </div>
                <div class='column3'>
                    <Map ref="map"/>
                </div>
            </div>
        
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Map from '../Map.vue';
import Instructions from '../Instructions.vue';

export default {
    components: { draggable,Map,Instructions },
    data(){
        return{
            items: this.getArrayItems(),
            initial_items: this.getArrayItems(),
            fields: [ 
                // {key: "group", label: 'Category',class: 'text-right'},
                {key: "details", label: 'Project',class: 'text-left'},

                // {key: "item_name", label: 'Project',class: 'text-left'},
                { key: "item_value", label: 'Price',sortable: true,class:"text-right",
                    formatter: (value, key, item) => {
                        return value.toLocaleString('ja-JP',{ style: 'currency',currency: 'USD',maximumFractionDigits:0});
                    },
                    
                },
                // {key: "utility", label: 'Utility',class: 'text-right'},
                // {key: "rank", label: 'Ranking',class: 'text-right'},
            ],
        }
    },
    methods:{
        details (item, index, event) {
            item._showDetails = !item._showDetails;
        },
        getImageURL(img){
            return require('../../assets/'+img+'.png');
        },
        finishDrag(e){
            const className = 'grabbing';
            const html = document.getElementsByTagName('html').item(0);
            if (html && new RegExp(className).test(html.className) === true) {
                // Remove className with the added space (from setClassToHTMLElement)
                html.className = html.className.replace(
                    new RegExp(' ' + className),
                    ''
                );
                // Remove className without added space (just in case)
                html.className = html.className.replace(new RegExp(className), '');
            }
        },
        startDrag(){
            const className = 'grabbing';
            const html = document.getElementsByTagName('html').item(0);
            if (html && new RegExp(className).test(html.className) === false) {
                html.className += ' ' + className; // use a space in case there are other classNames
            }
        },
        getHeaderClass(index){
            console.log
          if(index==0){
              return '';
          }
          else{
              return 'd-none';
          }
        },
        getArrayItems(){
            let items=JSON.parse(localStorage.getItem('items')).map(v => ({...v,_showDetails:false}));
            let arrayItems=[];
            items.forEach(item => {
                let itemArray=[];
                itemArray.push(item);
                arrayItems.push(itemArray);
            });
            return arrayItems;
        },
        rowHovered(item){
            console.log(item);
            this.$refs.map.changeOpacity(item.item_name,1);
        },
        rowUnHovered(item){
            this.$refs.map.changeOpacity(item.item_name,0.6);
        },
        async submit(){
            if (!confirm("Once you press OK you can't go back and change your choices"))
                return;
                
            let time=new Date().getTime();
            localStorage.setItem('budgeting_finish',JSON.stringify(time));
            let final_items=[];
            this.items.forEach((item,i) => {
                let prevPos = this.initial_items.map(function(e) { return e[0].item_id; }).indexOf(item[0].item_id);
                let value = prevPos +"->"+i;
                final_items.push({item_id:item[0].item_id,item_name:item[0].item_name,item_value:value});
            });
            localStorage.setItem('final_items',JSON.stringify(final_items));

            await this.$parent.addExperiment();
            this.$router.push("/Consistency");

        }
    }
}
</script>

<style scoped>
    .column1 {
        float: left;
        width: 25%;
        padding: 10px;
    }
    .column2 {
        float: left;
        width: 50%;
        padding: 10px;
    }
    .column3 {
        float: left;
        width: 20%;
        padding-left: 10px;
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
        max-width: 400px;
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