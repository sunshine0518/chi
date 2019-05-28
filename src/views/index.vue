<template>
  <div class="wrapper">
    <div class="header">
      <el-row>
        <el-col :span="5">
          <div class="grid-content">
             <el-dropdown>
                <span class="el-dropdown-link">
                  西安<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                </el-dropdown-menu>
             </el-dropdown>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content header_search">
                <input type="text" placeholder="请输入商品">
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content" @click="goMy">
            <img src='../assets/ic_action_map.png' class="goMy">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide"><img class="cover" src="../assets/5b3acc36c3539.jpg"/></div>
          <div class="swiper-slide"><img class="cover" src="../assets/5b3b1b239525e.jpg"/></div>
          <div class="swiper-slide"><img class="cover" src="../assets/5b3b1bd811341.jpg"/></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <el-row class="menu">
      <el-col :span="6">
        <div class="grid-content">
          <router-link to="/">
            <div class="menu-list home"></div>
            <div class="text">首页</div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <router-link to="/all">
            <div class="menu-list class"></div>
            <div class="text">所有</div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <router-link to="/my">
            <div class="menu-list my"></div>
            <div class="text">我的</div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <router-link to="/order">
            <div class="menu-list cart"></div>
            <div class="text">订单</div>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <el-row class="recommendation">
      <el-col :span="24"><div class="grid-content">新品推荐</div></el-col>
    </el-row>
    <div @click="goDetail(item.Id)" v-for="item in allEat" class="eatWrapper" :key="item.id">
      <el-row class="eatList">
        <el-col :span="8"><div class="grid-content"><img :src="item.commodity_pic" class="eatImg"/></div></el-col>
        <el-col :span="16">
          <div class="grid-content eatInfo">
            <p class="commodity_name">{{item.commodity_name}}</p>
            <p class="commodity_info">{{item.commodity_info}}</p>
            <p class="commodity_sell">
              <el-row>
                <el-col :span="12" class="commodity_price"><div class="grid-content">{{item.commodity_price}}元</div></el-col>
                <el-col :span="12" class="commodity_sold"><div class="grid-content">已售{{item.commodity_sold}}份</div></el-col>
              </el-row>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="block">
      <el-col :span="6"><div class="grid-content row_block" @click="goLogin" :class="{'acitveMenu':showMenu}">登录</div></el-col>
      <el-col :span="6"><div class="grid-content row_block" @click="goRegister" :class="{'acitveMenu':showMenu}">注册</div></el-col>
      <el-col :span="12"><div class="grid-content goTop" @click="goTop">返回顶部</div></el-col>
    </el-row>
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
import localStorage from '../utils/localStorage';
import Util from '../utils/utils';
import Swiper from 'swiper';
import wx from 'weixin-js-sdk';
export default {
    name: 'index',
    data() {
        return {
          allEat: [],
          token:'',
        }
    },
    created() {
      // this.$http.get('/api/getToken').then(function (res){console.log(res);});
      // this.$http.get('/api/getAccessToken').then(function (res){
      //    console.log(res);});
      // this.getAccessToken()
       this.token=localStorage.get('accessToken');
    },
    computed:{
      showMenu(){
         if(this.token){
            return true;
        }
       else{
          return false;
         }
      }
    },
    mounted(){
        new Swiper ('.swiper-container', {
           autoplay:true,
           loop: true,
          // 如果需要分页器
          pagination: '.swiper-pagination',
        }); 
        var self=this;
        this.$http.get('/api/commodity/selectCommodity').then(function(response) {
          console.log('food');
             console.log(response);
             self.fetchData(response.data.result);
        });  
        this.$http.post('/api/shop/selectShopDetail',{Id:1}).then(function (response){
            console.log(response.data);
             self.getNewShop({shop:response.data.shop});
             self.getNewShop({shop:response.data.shop});
        }); 
    },
    methods:{
       ...mapActions('shop',[ 
        'getNewShop',
      ]),
      goLogin() {
        this.$router.push('/login');
      },
      goRegister() {
        this.$router.push('/register');
      },
      goTop() {
         var timer=null;
         cancelAnimationFrame(timer);
         timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                timer = requestAnimationFrame(fn);
            }else{
                cancelAnimationFrame(timer);
            }    
        });
      },
      goMy() {
        this.$router.push('/my');
      },
      fetchData(res){
        this.allEat=res;
      },
      goDetail(id){
        // this.$router.push('/detail');
        this.$router.push({
          name:"detail",
          params:{
            commodity_shop:1,
            id:id
          }
        });
      },
    getAccessToken () {
        console.log('aaa');
        let self = this;
        let url = window.location.href.split('#')[0];
        console.log(url);
        this.$http.post('/api/getAccessToken',{url:url}).then(rsp => {
        console.log(rsp);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: rsp.data.appId, // 必填，公众号的唯一标识
          timestamp: rsp.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: rsp.data.noncestr, // 必填，生成签名的随机串
          signature: rsp.data.signature, // 必填，签名
          jsApiList: ["getLocation",'chooseImage'] // 必填，需要使用的JS接口列表
        });
        wx.checkJsApi({
          jsApiList: [
            'getLocation'
          ],
        success: function (res) {
          alert(JSON.stringify(res));
        }
        });
        wx.ready(function () {
          console.log('ready')
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log(res)
              self.location.latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
              self.location.longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
              self.location.speed = res.speed // 速度，以米/每秒计
              self.location.accuracy = res.accuracy // 位置精度
            }
          })
        });
        wx.error(function (res) {
          alert(res)
        })
      })
    },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import 'swiper/dist/css/swiper.min.css';
.wrapper{
  margin-bottom:70px;
}
.header{
    width: 100%;
    height: 48px;
    background-color: #3AC0B5;
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    .grid-content {
      margin-top:8px;
      height: 40px;
      line-height:40px;
      color:#fff;
      font-size:14px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .header_search {
      height: 35px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      background: rgba(0, 0, 0, 0.1);
      position:relative;
        & input {
            padding-left: 30px;
            width: 100%;
            height: 30px;
            outline: none;
            border: none;
            background: url('../assets/search_home.png') no-repeat -3px -4px;
            font-size: 12px;
            position:relative;
            top:-4px;
        }
    }
    .goMy{
      width:25px;
      height:25px;
    }
}
.swiper-container{
  width:100%;
  height:260px;
  margin-top:48px;
  .cover{
    max-width:100%;
  }
}
.menu{
  margin:20px 20px;
  a{
    color:#000;
    text-decoration: none;
  }
  .menu-list{
    margin:0 auto;
    width:50px;
    height:50px;
    border-radius:50%;
  }
  .home{
    background:url('../assets/d1.jpg') no-repeat;
    background-size:cover;
  }
  .class{
    background:url('../assets/d2.jpg') no-repeat;
    background-size:cover;
  }
  .my{
    background:url('../assets/d3.jpg') no-repeat;
    background-size:cover;
  }
  .cart{
    background:url('../assets/d4.jpg') no-repeat;
    background-size:cover;
  }
}
.recommendation{
  font-size:16px;
  text-align:left;
  margin-left:20px;
}
.eatWrapper{
  margin:10px 20px;
  height:auto;
  .eatList{
    border-top: 1px solid #ccc;
    padding:10px 0px;
    .eatImg{
      max-width:80%;
    }
    .eatInfo{
      height:auto;
      .commodity_name{
        font-size:16px;
        text-align:left;
        color:#000;
      }
      .commodity_info{
        color:#999;
        font-size:14px;
        text-align:left;
      }
      .commodity_sell{
        .commodity_price{
          color:#3AC0B5;
          font-size:14px;
          font-weight:bold;
          text-align:left;
        }
        .commodity_sold{
          color:#999;
          font-size:14px;
          text-align:right;
        }
      }
    }
  }
}
.block {
    background:#fff;
    font-size:20px;
      .acitveMenu{
        opacity:1;
      }
      .grid-content {
        margin-top:8px;
        height: 40px;
        line-height:40px;
        color:#fff;
        font-size:14px;
      }
      .row_block {
        opacity:0;
        border:1px solid #3ac0b5;
        color:#3ac0b5;
        border-radius:4px
      }
      .goTop {
        color: #8b4b27;
        font-size:12px;
        text-align:right;
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

</style>
