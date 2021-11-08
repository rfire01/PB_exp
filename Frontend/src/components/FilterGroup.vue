<template>
    <div>
        <b-dropdown text="Filter categories" variant="primary" class="m-2">
            <!-- <b-dropdown-form> -->
                <b-form-checkbox v-model="select_all" @change="checkAll($event)" style="display: inline;margin-left:5px">Select all</b-form-checkbox>
                <hr>
                <div v-for="group in this.groups" :key='group'>
                    <b-dropdown-item @click.native.capture.stop>
                        <b-form-checkbox v-model="group.selected" @change="checkGroup($event,group)" style="display: inline;">{{group.group_name}}</b-form-checkbox>
                        <img :src="getImageURL(group.group_name)" alt="" width="30" height="30" style="display: inline;margin-left:5px"/>
                    </b-dropdown-item>
                </div>
            <!-- </b-dropdown-form> -->
        </b-dropdown>
        (click on a project to show more details)
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            groups: this.getGroupes(),
            items_by_groups:JSON.parse(localStorage.getItem('items')).map(v => ({...v, selected: false})).map(v => ({...v, given_value: 0,_showDetails: false})),
            select_all:true
        }
    },
    methods:{
        getImageURL(img){
            return require('../assets/'+img+'.png');
        },
        getGroupes(){
            let groups=[];
            let groupedItems=[];
            let items =JSON.parse(localStorage.getItem('items'));
            items.forEach(item => {
                if(!groups.some(group => group.group_name == item.item_group))
                    groups.push({group_name:item.item_group,selected:true});
            });
            return groups;
        },
        checkGroup(e,group){
            if(e){
                this.items_by_groups.forEach(item => {
                    if(item.item_group==group.group_name)
                        this.$parent.items.push(item);
                });
            }
            else{
                let itemsToSplice=[];
                this.$parent.items.forEach(item => {
                    console.log(item.item_name);
                    if(item.item_group==group.group_name){
                        this.items_by_groups.forEach(ig => {
                            if(ig.item_name==item.item_name){ ig.selected=item.selected;ig.given_value=item.given_value;}
                        });
                        itemsToSplice.push(item.item_name);
                    }
                });
                itemsToSplice.forEach(index => {
                    this.$parent.items.splice(this.$parent.items.map(function(i) { return i.item_name; }).indexOf(index),1);
                });
                this.select_all=false;
            }
        },
        checkAll(e){
            this.groups.forEach(group => {
                if(e && !group.selected){
                    this.checkGroup(e,group);
                    group.selected=e;
                }
                else if(!e && group.selected){
                    this.checkGroup(e,group);
                    group.selected=e;
                }
            });
        }
    }
}
</script>

<style>
hr {
  margin-top: 3px;
  margin-bottom: 2px;
}
</style>