<template>
    <div class="wrapper">
        <commonTop></commonTop>
        <div class="eat_info">
            <div class="eat_pic">
                <img :src="eat.commodity_pic">
                <div class="eat_des">
                    <span>{{eat.commodity_name}}</span>
                    <span>{{eat.commodity_info}}</span>
                </div>
            </div>
            <div class="eat_price">
                <span class="eat_price_num">{{eat.commodity_price}}<span class="yuan">元</span></span>
                <span class="add_cart">加入购物车</span>
            </div>
        </div>
        <div class="evaluate">
            <p class="evaluate_title">宝贝评价</p>
            <div class="evaluate_container">
                <ul>
                    <li class="pingjia_list">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content pingjia_info">
                                    <img class="pingjia_img" src="../../assets/refreshing_image_01.png" />
                                    <span class="pingjia_user">小蜜蜜</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content pingjia_date">
                                     <span>2018</span>-<span>08</span>-<span>08</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="pingjia_con">
                            <p>挺好吃的，精致美味，时不时来一份。</p>
                        </div>
                    </li>
                    <li class="pingjia_list">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content pingjia_info">
                                    <img class="pingjia_img" src="../../assets/refreshing_image_01.png" />
                                    <span class="pingjia_user">小蜜蜜</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content pingjia_date">
                                     <span>2018</span>-<span>08</span>-<span>08</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="pingjia_con">
                            <p>挺好吃的，精致美味，时不时来一份。</p>
                        </div>
                    </li>
                    <li class="pingjia_list">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content pingjia_info">
                                    <img class="pingjia_img" src="../../assets/refreshing_image_01.png" />
                                    <span class="pingjia_user">小蜜蜜</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content pingjia_date">
                                     <span>2018</span>-<span>08</span>-<span>08</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="pingjia_con">
                            <p>挺好吃的，精致美味，时不时来一份。</p>
                        </div>
                    </li>
                    <li class="pingjia_list">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content pingjia_info">
                                    <img class="pingjia_img" src="../../assets/refreshing_image_01.png" />
                                    <span class="pingjia_user">小蜜蜜</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content pingjia_date">
                                     <span>2018</span>-<span>08</span>-<span>08</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="pingjia_con">
                            <p>挺好吃的，精致美味，时不时来一份。</p>
                        </div>
                    </li>
                    <li class="pingjia_list">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content pingjia_info">
                                    <img class="pingjia_img" src="../../assets/refreshing_image_01.png" />
                                    <span class="pingjia_user">小蜜蜜</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content pingjia_date">
                                     <span>2018</span>-<span>08</span>-<span>08</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="pingjia_con">
                            <p>挺好吃的，精致美味，时不时来一份。</p>
                        </div>
                    </li>
                </ul>
                <p class="showAll">查看所有评价</p>
            </div>
        </div>
        <div class="showMore">
            <p class="aboutMore">关于宝贝更多</p>
            <p class="moreInfo">三文鱼皮中含有的Ω-3不饱和脂肪酸可以帮助皮肤锁水，同时能够很好的防止皱纹的出现，有保湿、防皱的作用。
                    三文鱼皮中含有的虾青素是一种强抗氧化剂，它的效果是维生素E的900倍左右，能够有效清除体内多余自由基，保护细胞不受自由基的伤害，具有延缓衰老的功效。
                    三文鱼皮中含有丰富的蛋白质，且非常符合人体需求的蛋白物质，同时三文鱼皮中的脂肪酸含量很高，它们对于促进人体大脑的健康发育有很好的效果。
            </p>
            <img :src="eat.commodity_pic">
        </div>
    </div>
</template>
<script>
import commonTop from '@/components/common/header'
export default {
  name: 'eatDetail',
  components: {
      commonTop,
  },
  created(){
      var id=this.$route.params.id;
      var self=this;
      this.$http.post('/api/commodity/selectCommodityDetail',{id:id}).then(function (res){
          console.log(res.data);
          self.eat=res.data.result[0];
          console.log(self.eat);
      });
  },
  data() {
      return {
          eat:''
      };
  },
}
</script>
<style scoped lang="less">
.wrapper{
    .eat_info{
        width:100%;
        .eat_pic{
            position:relative;
            img{
                max-width:100%;
            }
            .eat_des{
                position:absolute;
                bottom:1rem;
                left:1rem;
                color:#fff;
                span{
                    display:block;
                    text-align:left;
                }
                span:nth-child(1){
                    font-size:.6rem;
                    margin-bottom:.25rem;
                }
                 span:nth-child(2){
                     font-size:.5rem;
                 }
            }
        }
        .eat_price{
            margin:.5rem 20px;
            overflow:hidden;
            .eat_price_num{
                float:left;
                font-size:.75rem;
                color:#3AC0B5;
                font-weight:600;
                .yuan{
                    font-size:.5rem;
                    color:#999;
                    font-weight:normal;
                }
            }
            .add_cart{
                float:right;
                display:block;
                padding: .25rem .4rem;
                background: #FF9900;
                border-radius: 6px;
                color:#fff;
                font-size:.5rem;
            }
        }
    }
    .evaluate{
        text-align:left;
        .evaluate_title{
            color:#000;
            margin:.5rem;
        }
        .evaluate_container{
            ul,li{
                margin:0;
                padding:0;
                list-style:none;
            }
            .pingjia_list:nth-child(1){
                 border-top: 1px solid #ccc;
            }
            .pingjia_list{
                padding:.35rem .5rem;
                border-bottom: 1px solid #ccc;
                .pingjia_info{
                    .pingjia_img{
                        width:1rem;
                        height:1rem;
                        border-radius:50%;
                    }
                    .pingjia_user{
                        color:#000;
                        font-size:.55rem;
                    }
                }
                .pingjia_date{
                    text-align:right;
                    color: #999;
                    font-size:.55rem;
                }
                .pingjia_con{
                    margin-top:.35rem;
                    p{
                        color:#000;
                        font-size:.45rem;
                    }
                }
            }
            .showAll{
                padding:.35rem .5rem;
                border-bottom: 1px solid #ccc;
                color:#3AC0B5;
                font-size:.5rem;
            }
        }
    }
    .showMore{
        text-align:left;
        .aboutMore{
            margin:.35rem .5rem;
            font-size:.55rem;
            color:#3AC0B5;
            font-weight:600;
        }
        .moreInfo{
            margin:.35rem .5rem;
            line-height:.85rem;
            text-indent: 1rem;
        }
        img{
            max-width:100%;
        }
    }
}
</style>