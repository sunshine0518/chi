<template>
    <div class="wrapper">
        <commonTop text_middle="订单"></commonTop>
        <div class="order">
             <ul v-for='(item,index) in navList' :key='index'>
                <li @click='toggleNav(index)' :class="{'activeLi':item.active}">{{item.name}}</li>
            </ul>
        </div>
        <div class="waitPay" :class="{'active':navList[0].active}">
               <div class="orderDiv" v-for='(item,index) in order' :key='item.Id' @click="goOrderDetail(item.Id,index)">
                   <ul>
                       <li>
                           <div>
                               <span>订单编号：{{item.order_number}}</span>
                            </div>
                            <div>
                               <span>订单时间:{{item.order_time}}</span>
                            </div>
                            <div>
                                <span>收货人：{{item.delivery_user}}</span>
                                <span>收货电话：{{item.delivery_tel}}</span>
                            </div>
                            <div>
                                <span>收货地址：{{item.delivery_address}}</span>
                            </div>
                       </li>
                   </ul>
               </div>
        </div>
        <div class="finishPay" :class="{'active':navList[1].active}">
        </div>
        <el-row class="tab">
            <el-col :span="6"><div class="grid-content tabList"><router-link to="/"><i class="glyphicon glyphicon-thumbs-up"></i><br>推荐</router-link></div></el-col>
            <el-col :span="6"><div class="grid-content tabList"><router-link to="/all"><i class="glyphicon glyphicon-th"></i><br>所有</router-link></div></el-col>
            <el-col :span="6"><div class="grid-content tabList"><router-link to="/order"><i class="glyphicon glyphicon-shopping-cart"></i><br>订单</router-link></div></el-col>
            <el-col :span="6"><div class="grid-content tabList"><router-link to="/my"><i class="glyphicon glyphicon-user"></i><br>我的</router-link></div></el-col>
        </el-row>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
import commonTop from '@/components/common/header';
import localStorage from '../../utils/localStorage';
export default {
  name: 'order',
  components: {
      commonTop,
  },
  data(){
      return {
          activeIndex:1,
          order:[],
          token:'',
          navList:[{
              name:'待支付',
              active:true
            },
            {
             name:'已完成',
             active:false,
            }
          ],
      }
  },
  computed:{
    // ...mapGetters('login',{ 
    //     user:'getUser',
    // }),
     ...mapGetters('food',{ 
        food:'getFood',
        selectedFood:'getSelectedFood',
        count:'getCount',
        totalPrice:'getTotalPrice'
  }),
 },
 created(){
     console.log(this.$route.params.realTotalPrice);
     console.log(this.$route.params.address);
     console.log(this.$route.params.from);
     console.log(this.selectedFood);
     this.token=localStorage.get('accessToken');
     console.log('1111');
      console.log(this.token);
     var self=this;
    //  var date=new Date().getTime();
    //  var time=this.getNowDate();
    // if(this.$route.params.from === 'pay'){
    //     console.log('111');
    //      this.$http.post('/api/order/createOrder',{
    //      selectedFood:self.selectedFood,
    //      realTotalPrice:self.$route.params.realTotalPrice,
    //      address:self.$route.params.address,
    //      token:this.token,
    //      }).then(function (response){
    //          console.log(response.data);
    //     });
    // }else{
    //      this.$http.post('/api/order/selectOrder',{order_user:this.token,order_status:this.activeIndex}).then(function (response){
    //       console.log(response.data);
    //       self.order=response.data;
    //       self.order.forEach((item)=>{
    //          item.order_time= self.handle(item.order_time);
    //       });
    //     });
    // }

     this.$http.post('/api/order/selectOrder',{order_user:this.token,order_status:this.activeIndex}).then(function (response){
          console.log(response.data);
          self.order=response.data;
          self.order.forEach((item)=>{
             item.order_time= self.handle(item.order_time);
          });
        });

 },
 methods:{
     toggleNav(index){
         this.navList.forEach((item)=>{
             console.log(item);
             item.active=false;
         });
        this.navList[index].active=true;
     },
     handle(time){
         var res=[];
         var arr1=time.split('T');
         res.push(arr1[0]);
         var arr2=arr1[1].split(".");
         res.push(arr2[0]);
         res=res.join(' ');
         return res;
        
     },
     goOrderDetail(id,index){
         this.$router.push({
             name:'orderDetail',
             params:{
                 id:id,
                 from:'order',
                 price:this.order[index].order_price,
             }
         });
     },
    //  getNowDate(){
    //     var date = new Date();
    //     var sign1 = "-";
    //     var sign2 = ":";
    //     var year = date.getFullYear() // 年
    //     var month = date.getMonth() + 1; // 月
    //     var day  = date.getDate(); // 日
    //     var hour = date.getHours(); // 时
    //     var minutes = date.getMinutes(); // 分
    //     var seconds = date.getSeconds() //秒
    //     if (month >= 1 && month <= 9) {
    //         month = "0" + month;
    //     }
    //     if (day >= 0 && day <= 9) {
    //         day = "0" + day;
    //     }
    //     if (hour >= 0 && hour <= 9) {
    //         hour = "0" + hour;
    //     }
    //     if (minutes >= 0 && minutes <= 9) {
    //         minutes = "0" + minutes;
    //     }
    //     if (seconds >= 0 && seconds <= 9) {
    //         seconds = "0" + seconds;
    //     }
    //     var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
    //     return currentdate;
    //  }
 },
}
</script>
<style lang='less' scoped>
.wrapper{
     margin-bottom:70px;
    .order{
        width:100%;
        height:40px;
        line-height:40px;
        color:#666;
        display:flex;
        ul,li{
            padding:0;
            margin:0;
            list-style:none;
            flex:1;
            border-bottom:1px solid #999;
        }
        .activeLi{
            color:#3AC0B5;
            border-bottom:1px solid #3AC0B5;
        }
    }
    .waitPay,.finishPay{
        width:100%;
        height:auto;
        display:none;
    }
    .active{
        display:block;
    }
    .orderDiv{
        ul,li{
            padding:0;
            margin:0;
        }
        li{
            list-style:none;
            div{
                display:flex;
                justify-content:space-between;
                text-align:left;
                margin:.35rem .25rem;
            }
            border-bottom:1px solid #999;
        }
        
    }
    .tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  background: #000;
  opacity: 0.4;
  color:#fff;
  padding-top:10px;
  a{
    color:#fff;
  }
}
}
</style>