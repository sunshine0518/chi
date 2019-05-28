<template>
    <div class="wrapper">
      <div class="wrapper_header">
            <div class="back_arrow" @click='back'><i class="el-icon-arrow-left"></i></div>
            <el-row>
              <el-col :span="5">
                <div class="grid-content shop_detail_pic">
                    <img class="cover" src='http://144.202.90.177:3004/upload/eatImg/eat.jpg' />
                </div>
              </el-col>
              <el-col :span="19">
                <div class="grid-content shop_detail_content">
                    <div class="shop_detail_header">{{shopInfo.shop_name}}</div>
                    <div class="shop_detail_fee">
                      <el-row>
                          <el-col :span="20">
                            <div class="grid-content fee_distance">
                              <span>商家配送</span>
                              <span>/20分钟送达</span>
                              <span>/配送费￥{{shopInfo.shop_delivery}}</span>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content goShopMore">
                              <span><i class="el-icon-arrow-right"></i></span>
                            </div>
                          </el-col>
                      </el-row>
                    </div>
                    <div class="shop_description_promotion">
                      <p class="description_promotion ellipsis">公告：欢迎光临，用餐高峰请提前下单，谢谢</p>
                    </div>
                </div>
              </el-col>
            </el-row>
      </div>
      <div class="nav">
        <ul v-for='(item,index) in navList' :key='index'>
          <li @click='toggleNav(index)' :class="{'activeLi':item.active}">{{item.name}}</li>
        </ul>
      </div>
      <div class="goods" v-show='navList[0].active'>
        <div class="menu-wrapper" ref="menuWrapper">
            <div>
              <ul  v-for='(item,index) in food' :key='index'>
                <li class="menu_left_list" :class="{'activity_menu' : currentIndex === index}" @click='selectMenu(index,$event)'><span>{{item.menuClass}}</span></li>
              </ul>
            </div>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <div>
              <ul v-for="(item,indexP) in food" class="food-hook" :key="indexP">
                <li class="menuLi">
                  <p>{{item.menuClass}}</p>
                  <ul v-for="(item,indexC) in item.food" :key='item.Id'>
                    <li class="menu_right_list">
                      <el-row>
                          <el-col :span="6">
                            <div class="grid-content menu_right_list_pic">
                              <img class="cover" :src='item.commodity_pic' />
                            </div>
                          </el-col>
                          <el-col :span="18">
                            <div class="grid-content menu_right_list_description">
                              <div class="food_description_head">
                                <span class="food_name">{{item.commodity_name}}</span>
                                <span class="stock">仅剩{{item.commodity_stock}}份</span>
                              </div>
                              <div class="food_description_sale_rating">
                                <span>月售{{item.commodity_sold}}份</span>
                                <span>赞90</span>
                              </div>
                              <div class="menu_detail_footer">
                                <el-row>
                                    <el-col :span="8">
                                      <div class="grid-content food_price">
                                        <span>￥{{item.commodity_price}}</span>
                                      </div>
                                    </el-col>
                                    <el-col :span="16">
                                      <div class="grid-content cart_button">
                                        <span class="buttons add_button" @click='addCount(indexC,indexP,$event)'>{{$parent.$index}}+</span>
                                        <span class="cart_num">{{item.count}}</span>
                                        <span class="buttons sub_button" @click="subCount(indexC,indexP,$event)">-</span>
                                      </div>
                                    </el-col>
                                </el-row>
                              </div>
                            </div>
                          </el-col>
                      </el-row>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <div class="rate" v-show='navList[1].active'>
        评价
      </div>
      <div class="buy_cart_container">
          <el-row>
            <el-col :span="14">
              <div class="grid-content buy_cart_container_left" @click="toggleFood">
                <span class="cart_block">
                  <i class="glyphicon glyphicon-shopping-cart"></i>
                  <!-- <span v-show="totalCount > 0" class="cart_count">{{totalCount}}</span> -->
                </span>
                <span class="cart_buy"  v-show="totalCount === 0">未选购商品</span>
                <span class="cart_buy"  v-show="totalCount != 0">￥{{totalPrice}}</span>
                <span class="cart_delivery"  v-show="totalCount > 0">另需配送费￥{{shopInfo.shop_delivery}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content buy_cart_container_right" :class="payClass"  @click="goPay">
                <span>{{payDesc}}</span>
              </div>
            </el-col>
          </el-row>
      </div>
      <div class="food" ref="food" v-show='foodShow'>
        <div class="food_cart">
          <div class="food_header">
          <div class="food_title">购物车</div>
          <div class="empty" @click='emptyFood'>清空</div>
        </div>
        <div class="food_content">
          <ul v-for="(item,index) in selectedFood" :key="item.Id">
            <li class="food_list">
              <div class="food_name">{{item.commodity_name}}</div>
              <div class="food_price">
                <span>￥{{item.commodity_price}}</span>
              </div>
              <div class="food_count">
                <span class="buttons add_button" @click='addCount(index,$event)'>+</span>
                <span class="cart_num">{{item.count}}</span>
                <span class="buttons sub_button"  @click='subCount(index,$event)'>-</span>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import {mapState,mapGetters,mapActions} from 'vuex'; 
export default {
  name: 'detail',
  data() {
      return {
        navList:[{name:'商品',active:true},{name:'评价',active:false}],
        food:[],
        listHeight:[],
        scrollY:0,
        selectedFood:[],
        fold:true,
      };
  },
  created(){
      var shop=this.$route.params.commodity_shop;
      var self=this;
      this.$http.post('/api/food/selectFood', { commodity_shop : shop } ).then(function(response) {
            response.data.food.forEach((item)=>{
              item.food.forEach((food)=>{food.count=0;});
            });
            console.log('111');
            self.food=response.data.food;
            self.$nextTick(() => {
              self._initScroll();
              self._calculateHeight();
            });
            console.log(response.data);
            self.getNewFood({'getNewFood':response.data.food});
      });
  },
  computed: {
    ...mapGetters('shop',{ 
       shopInfo:'getShop'
    }),
    currentIndex(){
      this.listHeight.forEach((item,i)=>{
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2 || (this.scrollY > height1 && this.scrollY < height2)){
          return i;
        }
        return 0;
      });
    },
    totalPrice(){
      let total=0;
      this.selectFood.forEach((item)=>{
        total+=((item.commodity_price*item.count));
      });
      this.getNewTotalPrice({'totalPrice':total.toFixed(2)});
      return total.toFixed(2);
    },
    totalCount(){
      let count=0;
      this.selectFood.forEach((item)=>{
        count+=item.count;
      });
      this.getNewCount({'count':count});
      return count;
    },
    payDesc(){
      if(this.totalPrice === 0){
        return '￥'+this.shopInfo.shop_startFee+'元起送';
      }
      else if(this.totalPrice < this.start){
        let diff=(this.shopInfo.shop_startFee - this.totalPrice).toFixed(2);
        return '还差￥'+diff+'元起送';
      }
      else{
        return '去结算';
      }
    },
    payClass(){
      if(this.totalPrice < this.start){
        return 'not-enough';
      }else{
        return 'enough';
      }
    },
    selectFood(){
        let foods = [];
        this.food.forEach((food) => {
            food.food.forEach((item)=>{
              if(item.count){
                foods.push(item);
              }
            });
        });
        this.selectedFood=foods;
        // this.$store.dispatch('getNewSelectedFood',this.selectedFood);
        this.getNewSelectedFood({'selected':this.selectedFood});
        return foods;
    },
    foodShow(){
      if(!this.totalCount){
        this.fold = true;
        return false;
      }
      let show=!this.fold;
      if(show){
         this.$nextTick(() => {
            if(!this.scroll){
               this.scroll = new BScroll(this.$refs.food, {
                  click:true,
                });
            }else{
              this.scroll.refresh();
            }
        });
      }
      return show;
    }
  },
  mounted(){
  },
  methods: {
    ...mapActions('food',[ 
        'getNewFood',
        'getNewSelectedFood',
        'getNewCount',
        'getNewTotalPrice',
    ]),
     ...mapActions('shop',[ 
        'getNewShop'
    ]),
    _initScroll(){
                this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                  click:true,
                });
                this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
                  click:true,
                  probrType:3,
                });
                this.foodsWrapper.on('scroll',(pos)=>{
                  console.log(this.scrollY);
                  this.scrollY=Math.abs(Math.round(pos.y));
                });
    },
    _calculateHeight(){
        let foodHook=this.$refs.foodsWrapper.getElementsByClassName('food-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<foodHook.length;i++){
          let item=foodHook[i];
          height+=(item.clientHeight);
          this.listHeight.push(height);
        }
    },
    selectMenu(index,event){
      if(!event._constructed){return;}
      let foodHook=this.$refs.foodsWrapper.getElementsByClassName('food-hook');
      let el=foodHook[index];
      this.foodsWrapper.scrollToElement(el,300);
    },
    addCount(index,parentIndex,event){
      if(!event._constructed) {
          return ;
      }
      this.food[parentIndex].food[index].count++;
    },
    subCount(index,parentIndex,event){
      if(!event._constructed) {
          return ;
      }
      this.food[parentIndex].food[index].count--;
      if(this.food[parentIndex].food[index].count <= 0){
        this.food[parentIndex].food[index].count = 0;
      }
    },
    toggleFood(){
        if(!this.totalCount){
          return ;
        }
        this.fold=!this.fold;
    },
    toggleNav(index){
      this.navList.forEach((item)=>{
        item.active=false;
      });
      this.navList[index].active=true;
    },
    emptyFood(){
      this.selectFood.forEach((item) => {
        item.count=0;
      });
    },
    back(){
        this.$router.go(-1);
    },
    goPay(){
      if(this.payDesc === '去结算'){
        console.log('11');
        this.$router.push({
          name:'pay',
          // params:{
          //   'delivery':this.shopInfo.shop_delivery,
          // }
        });
      }
    }
  },
}
</script>
<style scoped lang="less">
.wrapper{
  .wrapper_header{
      width:100%;
      height:125px;
      background-color: rgba(119,103,137,.43);
      color:#fff;
      padding:.25rem .25rem .25rem .25rem;
      box-sizing:border-box;
      text-align:left;
      overflow: hidden;
      .back_arrow{
          font-size:.75rem;
          color:#fff;
          text-align:left;
      }
      .shop_detail_pic{
        .cover{
          max-width:100%;
        }
      }
      .shop_detail_content{
        margin-left:.2rem;
        color: #fff;
        .shop_detail_header{
          font-size: .6rem;
          font-weight: 600;
          width: 100%;
          margin-bottom: .15rem;
        }
        .shop_detail_fee{
          font-size: .45rem;
          margin-bottom: .15rem;
          .goShopMore{
            text-align:right;
            font-size:.5rem;
          }
        }
        .shop_description_promotion{
          width:100%;
          .description_promotion{
              font-size: .5rem;
              width:100%;;
            }
            .ellipsis {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
        }
      }
  }
  .nav{
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
    }
    .activeLi{
      color:#3AC0B5;
    }
  }
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top:165px ;
    bottom: 40px ;
    overflow: hidden;
    .menu-wrapper{
        flex: 0 0 80px ;
        width: 80px;
        background: #f3f5f7;
        ul,li{
            width:100%;
            padding: 0;
            margin: 0;
            list-style: none;
        }
        .menu_left_list{
                padding: .7rem .3rem;
                border-bottom: .025rem solid #ededed;
                box-sizing: border-box;
                border-left: .15rem solid #f8f8f8;
                position: relative;
                span{
                  font-size: .6rem;
                  color: #666;
                }
        }
        .activity_menu{
                border-left: .15rem solid #3AC0B5;
                background-color: #fff;
        }
    }
    .foods-wrapper{
        flex: 1 ;
        background: #FFF;
        ul,li{
          list-style:none;
          margin:0;
        }
        .menuLi{
          text-align:left;
          background:#f3f5f7;
          font-size:.5rem;
          color:#000;
          padding:0;
          margin:0;
          p{
            padding:.25rem;
            margin:0;
          }
        }
        .menu_right_list{
                text-align:left;
                padding:0.5rem .25rem;
                border-bottom: 1px solid #f8f8f8;
                background:#fff;
                box-sizing:border-box;
                  .menu_right_list_pic{
                    .cover{
                      max-width:100%;
                    }
                  }
                  .menu_right_list_description{
                    margin-left:.5rem;
                    .food_description_head{
                      display:flex;
                      justify-content: space-between;
                      font-size:.55rem;
                      color:#000;
                      font-weight:600;
                      margin-bottom:.15rem;
                      .stock{
                        font-size:.5rem;
                        font-weight:normal;
                      }
                    }
                    .food_description_sale_rating{
                      font-size:.5rem;
                      color:#000;
                      margin-bottom:.15rem;
                    }
                  }
                  .menu_detail_footer{
                    .food_price{
                      font-size: .5rem;
                      color: #3AC0B5;
                    }
                    .cart_button{
                      .cart_num{
                        margin:0.15rem;
                        font-size:.5rem;
                      }
                      .buttons{
                        display:inline-block;
                        width:0.8rem;
                        height:0.8rem;
                        line-height:0.8rem;
                        text-align:center;
                        border:1px solid #ccc;
                        border-radius:50%;
                        font-size:0.55rem;
                      }
                    }
                  }
        }
    }
  }
  .rate{
    display: flex;
    position: absolute;
    width: 100%;
    top:165px ;
    bottom: 40px ;
    overflow: hidden;
  }
  .buy_cart_container{
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        height:40px;
        line-height:40px;
        color:#fff;
        z-index:1000;
        .buy_cart_container_left{
          background: #000;
          opacity: 0.3;
          text-align:center;
          .cart_block{
            display:inline-block;
            width: 0.8rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align:center;
            position:relative;
            .cart_count{
              position:absolute;
              width:0.6rem;
              height:.6rem;
              right:-0.1rem;
              top:-0.7rem;
              color:#fff;
              font-weight:bold;
              font-size:.65rem;
            }
          }
          .cart_delivery{
            font-size:.35rem;
          }
        }
        .buy_cart_container_right{
          background: #000;
        }
        .not-enough{
          background: #000;
          opacity: 0.6;
        }
        .enough{
          background:#3AC0B5;
        }
  }
  .food{
    position:absolute;
    z-index: 999;
    bottom: 40px;
    left: 0;
    top:125px;
    background-color: #fff;
    width:100%;
    overflow:hidden;
    .food_header{
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-align: center;
      align-items: center;
      padding: .3rem .6rem;
      background-color: #eceff1;
    }
    .food_content{
      ul,li{
        margin:0;
        padding:0;
        list-style:none;
      }
      .food_list{
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: .6rem .5rem;
        .food_price{
           font-size:.5rem;
           color: #3AC0B5;
        }
         .food_count{
                     
                      .cart_num{
                        margin:0.15rem;
                        font-size:.5rem;
                      }
                      .buttons{
                        display:inline-block;
                        width:1.5rem;
                        height:1.5rem;
                        line-height:1.5rem;
                        text-align:center;
                        border:1px solid #ccc;
                        border-radius:50%;
                        font-size:0.55rem;
                      }
          }
      }
    }
  }
}
</style>