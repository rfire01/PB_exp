<template>
  <div id="map" ref="map" style="margin-left:1%;width: 600px;height: 600px; position:relative">
        <transition name="fade" appear>
            <img :src="getImageURL('userHome3')" height="85" width="85" ref="homeImage">
        </transition>
        <div v-for="item in this.our_items" :key='item'>
            <img v-if="item.coords.length==1" :src="getImageURL(item.item_group)" :height="image_size" :width="image_size" :ref="item.item_name" v-b-tooltip.hover :title="item.item_name">
            <img v-else :src="getImageURL(item.item_group)" :height="image_size/1.5" :width="image_size/1.5" :ref="item.item_name" v-b-tooltip.hover :title="item.item_name">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            url:'../assets/userHome3.png',
            our_items:this.getAllItems(),
            image_size:"50",
            home:[{x:10,y:20},{x:60,y:50},{x:40,y:30},{x:20,y:80}],
        }
    },
    mounted(){
        this.drawImages();
    },
    methods: {
        getImageURL(img){
            return require('../assets/'+img+".png");
        },
        drawImages(){
            // let homePos=this.home[Math.floor(Math.random() * this.home.length)];
            let homePos=JSON.parse(localStorage.getItem('homePos'));
            this.$refs.homeImage.style.position='relative';
            this.$refs.homeImage.style.left=homePos.x+'%';
            this.$refs.homeImage.style.top=homePos.y+'%';

            let i=0;
            this.our_items.forEach(item => {

                if(this.$refs[item.item_name].length==1 || i==3) i=0;

                this.$refs[item.item_name][i].style.position='absolute';
                // this.$refs[item.item_name][i].style.float='left';
                this.$refs[item.item_name][i].style.left=item.x_coord.toString()+'%';
                this.$refs[item.item_name][i].style.top=item.y_coord.toString()+'%';
                this.$refs[item.item_name][i].style.opacity=0.3;

                i++;
            });
        },
        getAllItems(){
            let items=JSON.parse(localStorage.getItem('items'));
            let allItems=[];
            items.forEach(item => {
                let coords=item.coords.split("#");
                coords.forEach(coord => {
                    allItems.push({'item_name':item.item_name,'item_group':item.item_group,'x_coord':coord.split(',')[0],'y_coord':coord.split(',')[1],'coords':coords})
                });
            });

            return allItems;
        },
        changeOpacity(item_name,opacity){
            let items=this.$refs[item_name];
            items.forEach(item => {
                item.style.opacity=opacity;
            });
        }
    }
}
</script>

<style>
    #map
    {
        background-image: url('../assets/city_digital1.png');
        background-size:cover;
        /* background-repeat: no-repeat; */
        width: 600px;
        height: 600px;
    }
    .fade-enter-active{
        animation: bounce-in 1s;
    }
    @keyframes bounce-in {
        0% {
            top:100%
        }
    }
</style>