<template>
    <div class="wrapper">
        <commonTop text_middle='购物车'></commonTop>
        <div class="cart_wrapper">
            <ul class="cart_ul" v-for="item in getSelectedFood" :key='item.Id'>
                <li class="cart_list">
                    <el-row>
                        <el-col :span="10">
                            <div class="grid-content food_pic">
                                <img src="../../assets/5b44623809ae7.jpg" />
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="grid-content food_desc">
                                <p class="food_name">{{item.commodity_name}}<p>
                                <div class="food_cart">
                                    <div class="food_price">￥{{item.commodity_price}}</div>
                                    <div class="food_num">
                                        <span class="buttons" @click="addCount">+</span>
                                        <span class="num">{{item.count}}</span>
                                        <span class="buttons" @click="subCount">-</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </div>
        <div class="cart_buy">
            <div class="count">
                <span>结算{{count}}元</span>
            </div>
            <div class="submit">
                <span>提交订单</span>
            </div>
        </div>
    </div>
</template>
<script>
import commonTop from '@/components/common/header';
export default {
  name: 'cart',
  components: {
      commonTop,
  },
  data(){
      return {
          getSelectedFood:[],
          count:660,
      }
  },
  created(){
      this.getSelectedFood=this.$store.getters.getSelectedFood;
      console.log(this.getSelectedFood);
  },
  methods:{
      addCount(){
        this.food[index].count++;
      },
      subCount(){},
  },
}
</script>
<style scoped lang='less'>
.wrapper{
    padding-bottom:60px;
    .cart_wrapper{
        height:auto;
        .cart_ul{
            margin:0;
            padding:0;
            .cart_list{
                list-style:none;
                padding:15px;
                .food_pic{
                    
                    img{
                        max-width:85%;
                    }
                }
                .food_desc{
                    .food_name{
                        font-size:.65rem;
                        text-align:left;
                    }
                    .food_cart{
                        margin-right:.5rem;
                        margin-top:.5rem;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        .food_price{
                            color:#ff9000;
                            font-size:.65rem;
                        }
                        .food_num{
                            span{
                                margin:0.1rem;
                            }
                            .buttons{
                                display: inline-block;
                                width: .8rem;
                                height: .8rem;
                                border: 1px solid #3AC0B5;
                                border-radius: 50%;
                                color: #fff;
                                background: #3AC0B5;
                                text-align: center;
                                line-height: .8rem;
                            }
                        }
                    }
                }
            }
        }
    }
    .cart_buy{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        height:60px;
        font-size:.65rem;
        display:flex;
        text-align:center;
        line-height:60px;
        .count{
                background: rgba(0,0,0,.6);
                color:#fff;
                flex:1;
            }
        .submit{
                background: #ff9000;
                color:#337ab7; 
                flex:1;
        }
    }
}
</style>