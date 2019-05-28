<template>
    <div class="wrapper">
            <commonTop text_middle="购买详情"></commonTop>
            <div class="goods">
                <div class="goodsList" v-for="(item,index) in selectedFood" :key="index">
                    <div class="goods_pic">
                        <img class="cover" src="../../assets/5b3acc36c3539.jpg">
                    </div>
                    <div class="goods_info">
                        <p>{{item.commodity_name}}</p>
                        <p>x{{item.count}}件</p>
                    </div>
                    <div class="goods_money">
                        ￥{{item.commodity_price*item.count}}
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
import commonTop from '@/components/common/header';
export default {
  name: 'pay',
  components: {
      commonTop,
  },
  data(){
      return {
      }
  },
   computed: {
    ...mapGetters('food',{ 
       selectedFood:'getSelectedFood'
    }),
   },
}
</script>
<style lang='less' scoped>
.goods{
    .goodsList{
        display:flex;
        height:auto;
        background:#3AC0B5;
        margin-bottom:.4rem;
        color:#fff;
        .goods_pic{
            flex:3;
            .cover{
                max-width:100%;
            }
        }
        .goods_info{
            flex:4;
        }
        .goods_money{
            flex:4;
        }
    }
}
</style>