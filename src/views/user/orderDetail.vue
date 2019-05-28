<template>
    <div class="wrapper">
        <commonTop middle_text="订单详情"></commonTop>
        <div class="orderDetail">
            <div class="orderItemList" v-for="(item,index) in result" :key='index'>
                <div class="orderPic">
                    <img class="cover" :src="item.commodity_pic" />
                </div>
                <div class="orderInfo">
                    <div class="orderName">{{item.commodity_name}}</div>
                    <div class="orderMoney">
                        <div class="num">{{item.commodity_count}}件</div>
                        <div class="price">{{item.price}}元</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="totalMoney">
            <span>运费：{{shop.shop_delivery}}元</span><br/>
            <span>总计：{{price}}元</span>
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
  name: 'orderDetail',
  components: {
      commonTop,
  },
  data(){
      return {
          result:[],
          price:0,
      }
  },
  computed:{
    ...mapGetters('food',{ 
        selectedFood:'getSelectedFood',
        count:'getCount',
        totalPrice:'getTotalPrice',
    }),
     ...mapGetters('shop',{ 
       shop:'getShop'
    }),
    getTotalPrice(){
        return this.shop.shop_delivery+this.price;
    }
 },
 created(){
    var self=this;
    this.token=localStorage.get('accessToken');
    console.log(this.shop);
    if(this.$route.params.from === 'pay'){
        console.log('111');
         this.$http.post('/api/order/createOrder',{
         selectedFood:self.selectedFood,
         realTotalPrice:self.$route.params.realTotalPrice,
         address:self.$route.params.address,
         token:self.token,
         }).then(function (response){
            self.$http.post('/api/order/selectOrderItem',{id:response.data.orderId}).then(function (response){
                self.result=response.data.result;
            });
            self.price=self.$route.params.price;
        });
    }else if(this.$route.params.from === 'order'){
         self.$http.post('/api/order/selectOrderItem',{id:this.$route.params.id}).then(function (response){
             self.result=response.data.result;
         });
         self.price=self.$route.params.price;
    }
  },

}
</script>
<style lang='less' scoped>
.wrapper{
    .orderDetail{
        .orderItemList{
            display:flex;
            color:#fff;
            background:#3AC0B5;
            margin-bottom:.4rem;
            font-size:.5rem;
            .orderPic{
                flex:1;
                .cover{
                    max-width:100%;
                }
            }
            .orderInfo{
                flex:2;
                text-align:left;
                padding:.3rem;
                box-sizing:border-box;
                .orderMoney{
                    display:flex;
                    justify-content: space-between;
                }
            }
        }
    }
    .totalMoney{
        text-align:right;
        font-size:.5rem;
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