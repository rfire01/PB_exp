(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-96461fb6"],{2727:function(e,t,i){"use strict";var o=i("5963"),r=i.n(o);r.a},"2aec":function(e,t,i){e.exports=i.p+"img/Ranking_value.a0ce9058.gif"},5490:function(e,t,i){"use strict";var o=i("a6b6"),r=i.n(o);r.a},5963:function(e,t,i){},"5e68":function(e,t,i){"use strict";var o=i("cfd4"),r=i.n(o);r.a},"712f":function(e,t,i){e.exports=i.p+"img/Ranking_value_money.653ee03b.gif"},a0be:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"map",staticStyle:{"margin-left":"1%",width:"600px",height:"600px",position:"relative"},attrs:{id:"map"}},[i("transition",{attrs:{name:"fade",appear:""}},[i("img",{ref:"homeImage",attrs:{src:e.getImageURL("userHome3"),height:"85",width:"85"}})]),e._l(this.our_items,(function(t){return i("div",{key:t},[1==t.coords.length?i("img",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],ref:t.item_name,refInFor:!0,attrs:{src:e.getImageURL(t.item_group),height:e.image_size,width:e.image_size,title:t.item_name}}):i("img",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],ref:t.item_name,refInFor:!0,attrs:{src:e.getImageURL(t.item_group),height:e.image_size/1.5,width:e.image_size/1.5,title:t.item_name}})])}))],2)},r=[],a={data(){return{url:"../assets/userHome3.png",our_items:this.getAllItems(),image_size:"50",home:[{x:10,y:20},{x:60,y:50},{x:40,y:30},{x:20,y:80}]}},mounted(){this.drawImages()},methods:{getImageURL(e){return i("9e01")("./"+e+".png")},drawImages(){let e=JSON.parse(localStorage.getItem("homePos"));this.$refs.homeImage.style.position="relative",this.$refs.homeImage.style.left=e.x+"%",this.$refs.homeImage.style.top=e.y+"%";let t=0;this.our_items.forEach(e=>{1!=this.$refs[e.item_name].length&&3!=t||(t=0),this.$refs[e.item_name][t].style.position="absolute",this.$refs[e.item_name][t].style.left=e.x_coord.toString()+"%",this.$refs[e.item_name][t].style.top=e.y_coord.toString()+"%",this.$refs[e.item_name][t].style.opacity=.3,t++})},getAllItems(){let e=JSON.parse(localStorage.getItem("items")),t=[];return e.forEach(e=>{let i=e.coords.split("#");i.forEach(o=>{t.push({item_name:e.item_name,item_group:e.item_group,x_coord:o.split(",")[0],y_coord:o.split(",")[1],coords:i})})}),t},changeOpacity(e,t){let i=this.$refs[e];i.forEach(e=>{e.style.opacity=t})}}},s=a,n=(i("5490"),i("2877")),l=Object(n["a"])(s,o,r,!1,null,null,null);t["a"]=l.exports},a6b6:function(e,t,i){},b13f:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("b-dropdown",{staticClass:"m-2",attrs:{text:"Filter categories",variant:"primary"}},[i("b-form-checkbox",{staticStyle:{display:"inline","margin-left":"5px"},on:{change:function(t){return e.checkAll(t)}},model:{value:e.select_all,callback:function(t){e.select_all=t},expression:"select_all"}},[e._v("Select all")]),i("hr"),e._l(this.groups,(function(t){return i("div",{key:t},[i("b-dropdown-item",{nativeOn:{"!click":function(e){e.stopPropagation()}}},[i("b-form-checkbox",{staticStyle:{display:"inline"},on:{change:function(i){return e.checkGroup(i,t)}},model:{value:t.selected,callback:function(i){e.$set(t,"selected",i)},expression:"group.selected"}},[e._v(e._s(t.group_name))]),i("img",{staticStyle:{display:"inline","margin-left":"5px"},attrs:{src:e.getImageURL(t.group_name),alt:"",width:"30",height:"30"}})],1)],1)}))],2),e._v(" (click on a project to show more details) ")],1)},r=[],a={data(){return{groups:this.getGroupes(),items_by_groups:JSON.parse(localStorage.getItem("items")).map(e=>({...e,selected:!1})).map(e=>({...e,given_value:0,_showDetails:!1})),select_all:!0}},methods:{getImageURL(e){return i("9e01")("./"+e+".png")},getGroupes(){let e=[],t=JSON.parse(localStorage.getItem("items"));return t.forEach(t=>{e.some(e=>e.group_name==t.item_group)||e.push({group_name:t.item_group,selected:!0})}),e},checkGroup(e,t){if(e)this.items_by_groups.forEach(e=>{e.item_group==t.group_name&&this.$parent.items.push(e)});else{let e=[];this.$parent.items.forEach(i=>{console.log(i.item_name),i.item_group==t.group_name&&(this.items_by_groups.forEach(e=>{e.item_name==i.item_name&&(e.selected=i.selected,e.given_value=i.given_value)}),e.push(i.item_name))}),e.forEach(e=>{this.$parent.items.splice(this.$parent.items.map((function(e){return e.item_name})).indexOf(e),1)}),this.select_all=!1}},checkAll(e){this.groups.forEach(t=>{(e&&!t.selected||!e&&t.selected)&&(this.checkGroup(e,t),t.selected=e)})}}},s=a,n=(i("baf0"),i("2877")),l=Object(n["a"])(s,o,r,!1,null,null,null);t["a"]=l.exports},b7af:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h1",{staticStyle:{"margin-top":"20px","font-family":"'Courier New', monospace","text-align":"center"}},[e._v("Improving Utopia City")]),o("div",{staticClass:"row"},[o("div",{staticClass:"column1"},[o("apexchart",{attrs:{type:"pie",width:"300",options:e.chartOptions,series:e.series[0].data}}),o("p",{staticStyle:{position:"relative",left:"5%"}},[o("b",[e._v("Points used:")]),e._v(" "+e._s(e.currSum)+" "),o("br"),o("br"),o("span",{ref:"moneyLabel"},[o("b",[e._v("Points left:")]),e._v(" "+e._s(e.budget-e.currSum))])]),o("div",{staticStyle:{"text-align":"center",position:"absolute","border-radius":"25px",border:"3px solid #555","background-color":"lightblue",width:"250px","margin-left":"10px","margin-top":"40px",padding:"10px"}},[e._m(0),o("br"),o("a",[e._v(" You need to distribute "+e._s(e.budget.toLocaleString({style:"currency"}))+" among the projects. The more money you assign to a project, the more important it is to build.")]),o("br"),o("br"),o("b-button",{attrs:{variant:"outline-primary"},on:{click:function(t){return e.$bvModal.show("instructions_modal")}}},[e._v("Show instructions")])],1),o("b-modal",{attrs:{size:"lg",id:"instructions_modal","hide-footer":""}},[o("instructions"),o("b-button",{attrs:{variant:"outline-primary",block:""},on:{click:function(t){return e.$bvModal.hide("instructions_modal")}}},[e._v("Close")])],1)],1),o("div",{staticClass:"column2"},[o("filter-group"),o("b-table",{ref:"selectableTable",staticClass:"table-sm",attrs:{"sticky-header":"500px",striped:"",hover:"","table-variant":"light","head-variant":"dark",items:e.items,fields:e.fields,responsive:"sm"},on:{"row-clicked":e.details,"row-hovered":e.rowHovered,"row-unhovered":e.rowUnHovered},scopedSlots:e._u([{key:"cell(arrow)",fn:function(e){return[o("img",{style:e.item._showDetails?"margin-top:5px":"transform: rotate(270deg); margin-top:5px",attrs:{src:i("c5d4"),width:"20",height:"10"}})]}},{key:"cell(group)",fn:function(t){return[o("img",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{src:e.$parent.getImageURL(t.item.item_group),alt:"",width:"30",height:"30",title:t.item.item_group}})]}},{key:"cell(range)",fn:function(t){return[o("b-form-input",{attrs:{type:"range",min:"0",max:"100",step:"1"},on:{change:function(i){return e.calc(t)}},model:{value:t.item.given_value,callback:function(i){e.$set(t.item,"given_value",i)},expression:"row.item.given_value"}})]}},{key:"row-details",fn:function(t){return[o("b-card",[e._v(" "+e._s(t.item.item_desc)+" ")])]}}])}),e.goodSum?e._e():o("b-alert",{staticStyle:{"text-align":"center"},attrs:{show:"",variant:"danger"}},[e._v("Please make sure the values add to a "+e._s(e.budget.toLocaleString({style:"currency"}))+" ")]),o("div",{staticStyle:{float:"right"}},[o("b-button",{staticStyle:{width:"100px"},attrs:{variant:"outline-primary"},on:{click:e.resetTable}},[e._v("Reset")]),o("b-button",{staticStyle:{"margin-left":"10px",width:"100px"},attrs:{variant:"outline-primary"},on:{click:e.normalize}},[e._v("Normalize")]),o("b-button",{staticStyle:{"margin-left":"10px",width:"100px"},attrs:{variant:"outline-primary"},on:{click:e.submit}},[e._v("Submit")])],1)],1),o("div",{staticClass:"column3"},[o("Map",{ref:"map"})],1)])])},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("u",[i("b",[e._v(" What you need to do")])])}],a=i("1321"),s=i.n(a),n=i("a0be"),l=i("b13f"),c=i("f104");i("db49");var u={components:{Map:n["a"],apexchart:s.a,FilterGroup:l["a"],Instructions:c["a"]},data(){return{currSum:0,budget:100,goodSum:!0,items:JSON.parse(localStorage.getItem("items")).map(e=>({...e,given_value:0,_showDetails:!1})),fields:[{key:"arrow",label:""},{key:"group",label:"Category"},{key:"item_name",label:"Project",sortable:!0,class:"text-center"},{key:"range",label:""},{key:"given_value",label:"value",formatter:(e,t,i)=>i.given_value.toLocaleString({style:"currency"})}],chartOptions:{dataLabels:{enabled:!1},labels:[],legend:{show:!1}},series:[{data:[100,0]}]}},computed:{},methods:{details(e,t,i){e._showDetails=!e._showDetails},calc(e){let t=[];this.currSum=0,this.items.forEach(e=>{this.currSum+=parseInt(e.given_value)}),this.items.forEach(e=>{t.push(Math.round(e.given_value/this.currSum*this.budget))}),this.currSum>this.budget?this.$refs.moneyLabel.style.color="red":this.$refs.moneyLabel.style.color="black",this.chartOptions.labels=this.items.map(e=>e.item_name),this.chartOptions={dataLabels:{enabled:!1},labels:this.items.map(e=>e.item_name),legend:{show:!1,position:"bottom",horizontalAlign:"left"}},this.series=[{data:t}]},rowHovered(e){this.$refs.map.changeOpacity(e.item_name,1)},rowUnHovered(e,t){0==e.given_value&&this.$refs.map.changeOpacity(e.item_name,.3)},normalize(){this.currSum!=this.budget&&this.currSum>0&&this.currSum!=this.budget&&this.items.forEach(e=>{e.given_value=Math.round(e.given_value/this.currSum*this.budget)}),this.currSum>0&&(this.currSum=this.budget,this.goodSum=!0),this.$refs.moneyLabel.style.color="black"},resetTable(){this.items.forEach(e=>{e.given_value=0,this.$refs.map.changeOpacity(e.item_name,.3)}),this.chartOptions={dataLabels:{enabled:!1},labels:this.items.map(e=>e.item_name),legend:{show:!1,position:"bottom",horizontalAlign:"left"}},this.series=[{data:[100,0]}],this.currSum=0,this.$refs.moneyLabel.style.color="black"},async submit(){if(this.currSum!=this.budget)return void(this.goodSum=!1);if(!confirm("Once you press OK you can't go back and change your choices"))return;let e=(new Date).getTime();localStorage.setItem("budgeting_finish",JSON.stringify(e));let t=[];this.items.forEach(e=>{t.push({item_id:e.item_id,item_name:e.item_name,item_value:e.given_value,item_price:e.item_value})}),localStorage.setItem("final_items",JSON.stringify(t)),await this.$parent.addExperiment(),this.$router.push("/Consistency")}}},m=u,h=(i("5e68"),i("2877")),d=Object(h["a"])(m,o,r,!1,null,"211f1512",null);t["default"]=d.exports},baf0:function(e,t,i){"use strict";var o=i("edad"),r=i.n(o);r.a},cfd4:function(e,t,i){},edad:function(e,t,i){},f104:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("fieldset",[i("h2",{staticStyle:{"text-align":"center"}},[e._v("Step 3: Instructions")]),i("br"),i("b-card",{staticStyle:{"background-color":"#e8e8e8","max-width":"900px",margin:"auto"}},[i("h3",[e._v("The task:")]),e._v(" You are a resident in Utopia City and the city council has decided to spend a portion of the city budget this year on improving the residents’ quality of life. Several types of infrastructure upgrades, located across the city, have been proposed. Based on earlier discussions with the residents, the list has been narrowed down to "+e._s(e.num_of_projects)+" projects. Unfortunately, the budget is not sufficient to implement all "+e._s(e.num_of_projects)+" projects, so you have the opportunity to help decide which projects should be prioritized. ")]),i("b-card",{staticStyle:{"background-color":"#e8e8e8","max-width":"900px",margin:"auto"}},[i("h3",[e._v("What you need to do: ")]),i("br"),i("p",[e._v("(If the video looks blurry, you can double-click on it to improve the quality and to see it in full screen)")]),i("iframe",{attrs:{src:e.getVideo(),width:"850",height:"395",allowfullscreen:""}})]),i("b-card",{staticStyle:{"background-color":"#e8e8e8","max-width":"900px",margin:"auto"}},[i("h3",[e._v("The next steps:")]),i("br"),i("h5",[e._v("1) Quiz")]),e._v(" You will answer a quiz based on the information you learned from this page. "),i("br"),i("br"),i("h5",[e._v("2) The Task")]),e._v(" You will choose the projects you'd like to see funded. "),i("br"),i("br"),i("h5",[e._v("3) Consistency check")]),e._v(" You will be asked 3 simple questions about your choices, in order to make sure you paid attention (answering all three questions correctly will grant you the bonus payment). "),i("br"),i("br"),i("h5",[e._v("4) Feedback")]),e._v(" The final part is for you to give us feedback on your experience (you must complete this step to get your payment). ")]),i("b-card",{staticStyle:{"background-color":"#e8e8e8","max-width":"900px",margin:"auto"}},[i("h3",[e._v("Your payment:")]),i("ul",[i("li",[e._v("40 cent payment for the task contingent on passing a quiz and finishing the subsequent steps. ")]),i("li",[e._v("30 cent bonus for correctly answering a consistency test after submitting the task.")])])])],1)},r=[],a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",["Utilities"==e.voting_method?o("div",[o("br"),e._v(" You will be asked to distribute 100 points among "+e._s(e.num_of_projects)+" projects. The more points you assign to an item, the more important you think the item is to your city. "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using shown for an imaginary citizen called Alex. The projects that Alex finds most useful (in decreasing order of importance) are: "),e._m(0),e._v(" For example, in the following image, you can see a "),o("b",[e._v("possible rating")]),e._v(" by Alex: "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("4211"),width:"70%"}}),o("br"),o("br"),o("b",[e._v("Note:")]),o("br"),e._v(" You can use the Normalize button to automatically adjust your values to add up to 100 while keeping the relative importance of items intact. You will only be able to press the SUBMIT button if the values add up to 100. ")]):"Knapsack"==e.voting_method?o("div",[o("br"),e._v(" The city council has reserved a budget of $500,000 to fund infrastructure projects this year. You need to select the projects that you would personally like to see funded given this budget limit. "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using, filled out by an imaginary resident named Alex. The projects that Alex prefers are: "),e._m(1),e._v(" On the left you can see the total cost of the selected projects and the unused portion of the budget. "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("aa3d"),width:"90%"}}),o("br"),o("br"),o("b",[e._v("Note:")]),o("br"),e._v(" Alex can no longer add another project even through he has not exhausted his entire budget. ")]):"k_approval"==e.voting_method?o("div",[o("br"),e._v(" You will be presented with "+e._s(e.num_of_projects)+" projects and asked to select up to 5 projects that you would most like to see funded "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using, filled out by an imaginary resident named Alex. "),o("br"),e._v(" The projects that Alex would like to see funded are: "),e._m(2),e._v(" In the following image, you can see the choices of Alex and the number of projects selected. Up to two additional projects can be selected. "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("0b2d"),width:"90%"}})]):"Ranking_value"==e.voting_method?o("div",[o("br"),e._v(" Rank the suggested projects from most to least important according to your preferences. "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using. "),o("br"),e._v(" You will be asked to rank the items from MOST important (at the top) to the LEAST important (bottom). "),o("br"),e._v(" You can CLICK and DRAG on an item to change its ranking in the list. "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("2aec"),width:"60%"}})]):"Threshold"==e.voting_method?o("div",[o("br"),e._v(" Select each of the following projects ONLY if the answer to the following question is YES. "),o("br"),e._v(" If 100 points are divided among the projects based on their importance, should this project get AT LEAST 10 points? "),o("br"),e._v(" Use your best judgement. "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using shown for an imaginary citizen called Alex. "),o("br"),e._v(" The projects that Alex finds worth at least 10 out of 100 points are: "),e._m(3),e._v(" In the following image, you can see the choices of Alex and the number of selected proejcts. "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("9cea"),width:"90%"}})]):"Ranking_value_money"==e.voting_method?o("div",[o("br"),e._v(" You need to rank the projects by “value for money”, which measures the project's importance to you relative to the cost of the project. "),o("br"),o("br"),o("b",[e._v("Below is an example")]),e._v(" of the interface you will be using shown for an imaginary citizen called Alex. "),o("br"),e._v(" The “value for money” for a project is computed as the utility of the project divided by cost. "),o("br"),e._v(' For example: if the project "Dog Park" costs $250,000 and you utility for it is 250, then the "value for money" for it will be 1000. '),o("br"),e._v(" Rank the projects from greatest “value for money” (top of the list) to least “value for money” (bottom of the list). "),o("br"),e._v(" CLICK and DRAG on the project to change its ranking in the list. "),o("br"),e._v(" You need to sort the list in DECREASING order of “value for money” (from the highest value to the lowest value). "),o("br"),o("br"),o("img",{staticStyle:{margin:"auto",display:"block"},attrs:{src:i("712f"),width:"60%"}}),o("br"),o("br"),o("b",[e._v("Note:")]),o("br"),e._v(" The interface you will use won’t include the columns “utility for Alex” and “Value for money”. You need to think independently about what is the utility for each project and compute the “value for money” for each project. ")]):o("div",[e._v(" no todo")])])},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[e._v("Building an amphitheater in the public park")]),i("li",[e._v("Soak Up the Solar Power")]),i("li",[e._v("Security Cameras")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[e._v("We Need More Crosswalks")]),i("li",[e._v("Soak Up the Solar Power")]),i("li",[e._v("Remodel the Kitchen at the Youth Center")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[e._v("We Need More Crosswalks")]),i("li",[e._v("Security Cameras")]),i("li",[e._v("Interactive Technology for the Main Library")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[e._v("We Nedd More Crosswalks")]),i("li",[e._v("Security Cameras")]),i("li",[e._v("Nursing Pod for Mothers and Infants")])])}],n={data(){return{voting_method:localStorage.getItem("voting_method"),num_of_projects:localStorage.getItem("num_of_projects")}}},l=n,c=i("2877"),u=Object(c["a"])(l,a,s,!1,null,null,null),m=(u.exports,{data(){return{voting_method:localStorage.getItem("voting_method"),num_of_projects:localStorage.getItem("num_of_projects")}},methods:{getVideo(){return"Utilities"==this.voting_method?"https://drive.google.com/file/d/1SLjAr3v55kvLrGNKH1CP0kmobBN9TDEa/preview":"Knapsack"==this.voting_method?"https://drive.google.com/file/d/14w7iHHImeV-WqFKBokdCfgHSf4pPWdOe/preview":"k_approval"==this.voting_method?"https://drive.google.com/file/d/1Vv9jacnlmmFGn7_xmrYTTGy_-KdpEeAh/preview":"Ranking_value"==this.voting_method?"https://drive.google.com/file/d/1pt25Mbwo7Ljn4qcg0XWVp3u052P-QRkd/preview":"Threshold"==this.voting_method?"https://drive.google.com/file/d/1PM2JXrbZkDfAfPbH92sXbc5w6SSxrGHd/preview":"Ranking_value_money"==this.voting_method?"https://drive.google.com/file/d/14ZYZHtBEmeb17j--E1QYz-Qk-Qx5v-yv/preview":void 0}}}),h=m,d=(i("2727"),Object(c["a"])(h,o,r,!1,null,null,null));t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-96461fb6.3263e16e.js.map