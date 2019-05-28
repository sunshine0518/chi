<template>
    <div class="wrapper">
        <div  class="payBlock" :class="{'showPayBlock':acitvePayBlock}">
            <div class="payCon">去支付</div>
            <div class="buttons">
                <span class="button_confirm" @click="confirmPay">确定</span>
                <span class="button_cancle" @click="canclePay">取消</span>
            </div>
        </div>
        <commonTop text_middle="提交订单"></commonTop>
        <div class="add_address" v-if="addAddress" @click="addAddressByUser">
           <span><i class="el-icon-plus"></i>新增收货地址</span>
        </div>
        <div class="user_Info" v-if="!addAddress">
            <p>
                <span class="glyphicon glyphicon-user">{{address.delivery_user}}</span>
                <span class="el-icon-phone">{{address.delivery_tel}}</span>
            </p>
            <p>
                <!-- <span class="province">广东省</span>
                <span class="city">广州市</span>
                <span class="qu">曼秀区</span>
                <span class="other">广州中大道中111号</span> -->
                <span>{{address.delivery_address}}</span>
            </p>
            <span class="el-icon-arrow-right moreAddress" @click="goAddressList"></span>
        </div>
        <div class="payFood">
            <el-row>
                <el-col :span="18">
                    <div class="grid-content payFood_pic" v-for="(item,index) in selectedFood" :key="index">
                       <ul>
                            <li class="payFood_list"><img :src="item.commodity_pic"></li>
                       </ul>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content payFood_count" @click="goFoodDetail">
                        <span>共{{count}}件</span>
                        <span class="el-icon-arrow-right"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="favor">
            <div class="favor_left">
                <span class='favor_text'>优惠券</span>
                <span class='favor_num'>0张可用</span>
            </div>
            <div class="favor_right">
                <span class='favor_text'>去使用</span>
                <span class="el-icon-arrow-right"></span>
            </div>
        </div>
        <div class="beizhu">
            <p class='beizhu_title'>订单备注</p>
            <textarea class="beizhuText" placeholder="限50个字之内"></textarea>
        </div>
        <div class="payWay">
            <p class="payWay_title">支付方式</p>
            <div class="payWay_con">
                <!-- <div class="ways selected">在线支付</div>
                <div class="ways">货到付款</div> -->
                <el-radio-group v-model="payButton">
                    <el-radio-button label="在线支付"></el-radio-button>
                    <el-radio-button label="货到付款"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="payWay_selected">
                <div class='ways_select' @click="selectWay(index)" v-for="(item,index) in payWays" :key="index">
                    <span>{{item.way}}</span>
                    <span class="el-icon-success" :class="{selected_icon:item.active}"></span>
                </div>
                <!-- <div class='ways_select'>
                    <span>微信支付</span>
                    <span class="el-icon-success"></span>
                </div> -->
            </div>
        </div>
        <div class="payMoney">
            <p class="foods_money"><span>商品金额</span><span class="money_span">{{totalPrice}}元</span></p>
            <p class="foods_delivery"><span>运费</span><span class="money_span">{{delivery}}元</span></p>
        </div>
        <div class="submitOrder">
            <div class="fukuanMoney">实付款:{{realTotalPrice}}元</div>
            <div class="submitBlock" @click="payOrder">提交订单</div>
        </div>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
import commonTop from '@/components/common/header';
import localStorage from '../../utils/localStorage';
export default {
  name: 'pay',
  components: {
      commonTop,
  },
  data(){
      return {
          addAddress:false,
          address:'',
          acitvePayBlock:false,
          payButton:'在线支付',
          payWays:[
              {
                  way:"微信支付",
                  active:true,
              },
               {
                  way:"支付宝支付",
                  active:false,
              }
          ],
          user:{}
      }
  },
  created(){
       var self=this;
       var from=this.$route.params.from;
       this.user= localStorage.get('userInfo');
       if(from === 'addressList'){
           this.address=this.$route.params.address;
       }
       else{
            this.$http.post('/api/address/selectAddressUser',
                {address_user:this.user.user_tel},).then(function (response){
                    console.log(response.data);
                    console.log(response.data.length);
                    localStorage.set('address',response.data);
                    self.handle(response.data);
      });
       }
    //   this.$http.post('/api/address/selectAddressUser',{address_user:this.user.user_tel}).then(function (response){
    //       console.log(response.data);
    //       console.log(response.data.length);
    //       self.handle(response.data);
    //   });
  },
  computed:{
    ...mapGetters('login',{ 
        token:'getToken',
        // user:'getUser',
    }),
     ...mapGetters('food',{ 
        food:'getFood',
        selectedFood:'getSelectedFood',
        count:'getCount',
        totalPrice:'getTotalPrice'
    }),
     ...mapGetters('shop',{ 
       shop:'getShop'
    }),
    showFood(){
        if(this.selectedFood.length >  3){
            let foodShow=[];
            this.selectedFood.forEach((item,index)=>{
               foodShow.push(item);
               if(index === 3){
                    return foodShow;
               }
            });
        }else{
            return this.selectedFood;
        }
    },
    delivery(){
        return this.shop.shop_delivery;
    },
    realTotalPrice(){
        return Number(this.totalPrice)+Number(this.delivery);
    },
  },
  methods:{
      ...mapActions('address',[ 
          'getNewDeliveryAddress',
      ]),
      handle(res){
          if(!res.length){
              this.addAddress=true;
          }
          else{
              this.addAddress=false;
              this.address=res[0];
              this.getNewDeliveryAddress({'address':res});
          }
      },
      addAddressByUser(){
        //   this.$http.post('/api/address/addAddressUser',{address_user:'18792936241'}).then(function (response){
        //     console.log(response.data);
        //   });
        console.log(this.user.user_tel);
        this.$router.push({
            name:'addAddress',
            params:{
                address_user:this.user.user_tel,
            },
        });
      },
      goAddressList(){
          this.$router.push({
              name:'addressList',
              params:{
                   from:'pay',
              },
          });
      },
      selectWay(index){
          var pattern = /^在线支付$/;
          if(pattern.test(this.payButton)){
              console.log('222');
              this.payWays.forEach((item)=>{
                 item.active=false;
              });
          this.payWays[index].active=true;
          }else{
              console.log('111');
              this.payWays.forEach((item)=>{
                 item.active=false;
              });
              return;
          }
      },
      payOrder(){
          console.log('pay');
          var self=this;
          this.$http.get('/api/waitPay').then(function (response){
              console.log(response.data);
              var result=response.data.status;
              if(result === 1){
                  self.acitvePayBlock=true;
              }
          });
      },
      confirmPay(){
          this.acitvePayBlock=false;
          console.log(this.address);
          this.$router.push({
              name:'orderDetail',
              params:{
                 realTotalPrice:this.realTotalPrice, 
                 address:this.address,
                 from:'pay',
                 price:this.totalPrice
              }
          });
        //   var self=this;
        //   this.$http.post('/api/commodity/updateCommodity',{
        //       selectedFood:self.selectedFood
        //   }).then(function (response){

        //   });
      },
      canclePay(){
          this.acitvePayBlock=true;
      },
      goFoodDetail(){
          this.$router.push('/FoodDetail');
      }
  },
}
</script>
<style lang='less' scoped>
.wrapper{
    margin-bottom:60px;
    position:relative;
    .payBlock{
        position:fixed;
        top:38%;
        left:23%;
        border-radius:0.25rem;
        background:#3AC0B5;
        z-index:10000;
        color:#fff;
        display:none;
        padding:.5rem;
        .payCon{
            width:100%;
            height:2rem;
            text-align:center;
            line-height:2rem;
            font-size:.55rem;
        }
        .buttons{
            display:flex;
            justify-content: space-between;
            align-items: center;
            margin:0 20px;
            span{
                 padding:.25rem .5rem;
                 border:1px solid #fff;
                 border-radius:.25rem;
                 margin:0  0.25rem;
            }
        }
    }
    .showPayBlock{
        display:block;
    }
    .add_address{
        margin:.5rem auto;
        padding:0.25rem .5rem .8rem .5rem;
        border-bottom:1px solid #ccc;
        span{
            padding:.5rem;
            border:1px solid #3AC0B5;
            color:#3AC0B5;
            font-size:.5rem;
            border-radius:.25rem;
        }
    }
    .user_Info{
        color: #999;
        margin:.5rem 0;
        padding:0 .5rem;
        font-size:.5rem;
        text-align:left;
        border-bottom:1px solid #ccc;
        position:relative;
        .moreAddress{
            position:absolute;
            right:.8rem;
            top:.25rem;
            font-size:.55rem;
            color:#999;
        }
    }
    .payFood{
        padding:0 .5rem;
        width:100%;
        height:2.8rem;
        overflow: hidden;
        border-bottom:1px solid #ccc;
        .payFood_pic{
            width:100%;
            ul,li{
                margin:0;
                padding:0;
                list-style:none;
            }
            .payFood_list{
                width:33%;
                float:left;
                img{
                    width:2.5rem;;
                    height:2.5rem;
                }
            }
        }
        .payFood_count{
            color: #999;
            font-size:.55rem;
            margin-top:.8rem;
        }
    }
    .favor{
        padding:.5rem;
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items: center;
        border-bottom:1px solid #ccc;
        .favor_text{
            font-size:.5rem;
            color:#000;
        }
        .favor_num{
            border: 1px solid #ff9000;
            background: #ff9000;
            border-radius: 4px;
            color: #fff;
            padding: 3px 5px;
            display: inline-block;
        }
        .favor_right{
            color:#999;
            font-size:.55rem;
             .favor_text{
                 color:#999;
            }
        }
    }
    .beizhu{
        width:100%;
        padding:.5rem;
        border-bottom:1px solid #ccc;
        .beizhu_title{
            text-align:left;
            font-size:.5rem;
            line-height:1rem;
        }
        .beizhuText{
            width:100%;
            height:2rem;
            border-radius:.2rem;
            padding:.2rem;
        }
    }
    .payWay{
        width:100%;
        padding:.5rem;
        border-bottom:1px solid #ccc;
        .payWay_title{
            font-size:.5rem;
            line-height:1rem;
            text-align:left;
        }
        .payWay_con,.payWay_selected .ways_select{
            display:flex;
            justify-content: space-between;
            align-items: center;
        }
        .payWay_con{
            .ways{
                padding: 3px 5px;
                border: 1px solid #999;
                color: #000;
                border-radius: 6px;
                font-size:.55rem;
            }
            .selected{
                border: 1px solid #ff9000;
                background: #ff9000;
                color:#fff;
            }
        }
        .payWay_selected{
            .ways_select{
                height:1rem;
                margin-top:.3rem;
                font-size:.5rem;
                color:#999;
                .selected_icon{
                    color:#ff9000;
                }
            }
        }
    }
    .payMoney{
        width:100%;
        padding:.5rem;
        .foods_money,.foods_delivery{
            display:flex;
            justify-content:space-between;
            align-items: center;
            line-height:1rem;
            .money_span{
                color:#ff9000;
            }
        }
    }
    .submitOrder{
        position:fixed;
        bottom:0;
        left:0;
        display:flex;
        width:100%;
        height:60px;
        line-height:60px;
        font-size:.55rem;
        .fukuanMoney{
            flex:3;
            background:#000;
            color:#fff;
        }
        .submitBlock{
            flex:2;
            background: #ff9000;
            color: #fff;
        }
    }
}
</style>
