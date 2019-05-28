<template>
    <div class="wrapper">
        <commonTop :text_middle="userName"></commonTop>
        <div class="block_info">
            <div class="info_img">
                <div class="info_img_wrapper">
                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                </div>
                <img :src="userPic"/>
                <div class="login" v-if="!token">
                    <span @click="goLogin">登录</span>
                    <span  @click="goRegister">注册</span>
                </div>
            </div>
            <!-- <el-row class="info_order">
                <el-col :span="6">
                    <div class="grid-content">
                        <div>2</div>
                        <div>待付款</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div>1</div>
                        <div>已付款</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div>0</div>
                        <div>配送中</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <div>1</div>
                        <div>已完成</div>
                    </div>
                </el-col>
            </el-row> -->
        </div>
        <div class="info_operation">
            <el-row class="info_operation_list">
                <el-col :span="3" class="row_left">
                    <div class="grid-content">
                        <span class="icon icon_order">
                            <i class="glyphicon glyphicon-list-alt"></i>
                        </span>
                    </div>
                </el-col>
                <el-col :span="18" class="row_left">
                    <div class="grid-content" @click="goOrder">
                        <span class="text">我的订单</span>
                    </div>
                </el-col>
                <el-col :span="3" class="row_right">
                    <div class="grid-content">
                        <span class="icon_right"><i class="el-icon-arrow-right"></i></span>
                    </div>
                </el-col>
            </el-row>
            <!-- <el-row class="info_operation_list">
                <el-col :span="3" class="row_left">
                    <div class="grid-content">
                        <span class="icon icon_user">
                            <i class="glyphicon glyphicon-user"></i>
                        </span>
                    </div>
                </el-col>
                <el-col :span="18" class="row_left">
                    <div class="grid-content">
                        <span class="text">我的资料</span>
                    </div>
                </el-col>
                <el-col :span="3" class="row_right">
                    <div class="grid-content">
                        <span class="icon_right"><i class="el-icon-arrow-right"></i></span>
                    </div>
                </el-col>
            </el-row> -->
            <div class="info_operation_list_block" @click="goModify">
                <el-row class="info_operation_list">
                    <el-col :span="3" class="row_left">
                        <div class="grid-content">
                            <span class="icon icon_lock">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="18" class="row_left">
                        <div class="grid-content">
                            <span class="text">修改密码</span>
                        </div>
                    </el-col>
                    <el-col :span="3" class="row_right" @click="goModify">
                        <div class="grid-content">
                            <span class="icon_right"><i class="el-icon-arrow-right"></i></span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row class="info_operation_list">
                <el-col :span="3" class="row_left">
                    <div class="grid-content">
                        <span class="icon icon_qrcode">
                            <i class="glyphicon glyphicon-qrcode"></i>
                        </span>
                    </div>
                </el-col>
                <el-col :span="18" class="row_left">
                    <div class="grid-content">
                        <span class="text">优惠券</span>
                    </div>
                </el-col>
                <el-col :span="3" class="row_right">
                    <div class="grid-content">
                        <span class="icon_right"><i class="el-icon-arrow-right"></i></span>
                    </div>
                </el-col>
            </el-row>
            <el-row class="info_operation_list">
                <el-col :span="3" class="row_left">
                    <div class="grid-content">
                        <span class="icon icon_marker">
                            <i class="glyphicon glyphicon-map-marker"></i>
                        </span>
                    </div>
                </el-col>
                <el-col :span="18" class="row_left">
                    <div class="grid-content">
                        <span class="text">收货地址</span>
                    </div>
                </el-col>
                <el-col :span="3" class="row_right">
                    <div class="grid-content" @click='goAddress'>
                        <span class="icon_right"><i class="el-icon-arrow-right"></i></span>
                    </div>
                </el-col>
            </el-row>
             <div class="info_operation_list_block" @click="exit">
                <el-row class="info_operation_list">
                    <el-col :span="3" class="row_left">
                        <div class="grid-content">
                            <span class="icon icon_off">
                                <i class="glyphicon glyphicon-off"></i>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="18" class="row_left">
                        <div class="grid-content">
                            <span class="text">退出</span>
                        </div>
                    </el-col>
                    <el-col :span="3" class="row_right">
                        <div class="grid-content">
                            <span class="icon_right"></span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="tab_block">
            <!-- <el-row class="menu">
                    <el-col :span="6">
                        <div class="grid-content">
                        <div class="menu-list home"></div>
                        <div class="text">首页</div>
                        </div>
                    </el-col>
                        <div class="grid-content">
                        <div class="menu-list class"></div>
                        <div class="text">分类</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                        <div class="menu-list my"></div>
                        <div class="text">我的</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                        <div class="menu-list cart"></div>
                        <div class="text">购物车</div>
                        </div>
                    </el-col>
            </el-row> -->
            <el-row class="tab">
                <el-col :span="6"><div class="grid-content tabList"><router-link to="/"><i class="glyphicon glyphicon-thumbs-up"></i><br>推荐</router-link></div></el-col>
                <el-col :span="6"><div class="grid-content tabList"><router-link to="/all"><i class="glyphicon glyphicon-th"></i><br>所有</router-link></div></el-col>
                <el-col :span="6"><div class="grid-content tabList"><router-link to="/order"><i class="glyphicon glyphicon-shopping-cart"></i><br>订单</router-link></div></el-col>
                <el-col :span="6"><div class="grid-content tabList"><router-link to="/my"><i class="glyphicon glyphicon-user"></i><br>我的</router-link></div></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
import commonTop from '@/components/common/header';
import localStorage from '../../utils/localStorage';
export default {
  name: 'my',
  components: {
      commonTop,
  },
  data(){
      return {
          token:'',
          user:'',
      }
  },
  computed:{
        userPic(){
            if(!this.token){
                console.log('111');
                return 'http://144.202.90.177:3004/upload/userImg/defaultUser.jpg';
            }
            else{
                console.log('222');
                return this.user.user_pic;
            }
        },
        userName(){
             if(!this.token){
                return '客多多';
            }
            else{
                console.log('222');
                return this.user.user_name;
            }
        }
  },
  created(){
      console.log(localStorage.get('userInfo'));
      console.log(localStorage.get('accessToken'));
      this.token=localStorage.get('accessToken');
      this.user=localStorage.get('userInfo');
    //   console.log(localStorage.getItem('accessToken'));
    //   this.localToken=localStorage.getItem('accessToken');
    //   console.log(localStorage.getItem('userInfo'));
    //   var json=localStorage.getItem('userInfo');
    //   console.log(JSON.parse(json));
    //   console.log(JSON.parse(localStorage.getItem('userInfo')));
    //   this.localUser=JSON.parse(localStorage.getItem('userInfo'));
    //   console.log(this.localUser);
  },
  mounted(){
  },
  methods:{
    ...mapActions('login',[ 
        'getNewToken',
        'getNewUser',
    ]),
    goLogin(){
        this.$router.push('/login');
    },
    goRegister(){
        this.$router.push('/register');
    },
    checkIsLogin(token){
        if(!token){
            return false;
        }
        else{
            return true;
        }
    },
    handleFile: function (e) {
      let self=this;
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      let token=this.token;
      let user=this.user;
      let user_tel=user.user_tel;
      if(this.checkIsLogin(token)){
           var reader = new FileReader();
            reader.onload = (data) => {
                let res = data.target || data.srcElement;
                this.user.user_pic = res.result;
                console.log(this.user.user_pic);
                this.$http.post('/api/uploadUserPic',{user_pic:res.result}).then(function(response) {
                    console.log(response.data);
                    let user_pic='http://0.0.0.0:3000/public/img/'+response.data.user_pic;
                    return user_pic;
                }).then(function (response){
                    console.log(response);
                    self.$http.post('/api/user/updateUserPic',{user_pic:response,user_tel:user_tel}).then(function (response){
                        console.log(response.data);
                    });
                });     
            }
      }else{
          return ;
      }
      reader.readAsDataURL(file);
    },
    goModify() {
       let token=this.token;
       if(this.checkIsLogin(token)){
           this.$router.push('/modify');
       }
        else{
             return;
        }
    },
    exit(){
        console.log('exit');
        if(this.token){
            this.token='';
            localStorage.clear();
        }else{
            return;
        }
    },
    goAddress(){
          this.$router.push({
              name:'addressList',
              params:{
                   from:'edit',
              },
          });
    },
    goOrder(){
        this.$router.push('/order');
    }
  },
}
</script>
<style lang="less" scoped>
.wrapper{
    margin-bottom:60px;
}
.block_info{
    width:100%;
    .info_img{
        width:120px;
        height:120px;
        margin:20px auto;
        position:relative;
        .info_img_wrapper{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            .hiddenInput{
                width:100%;
                height:100%;
                opacity:0;
            }
        }
        img{
            max-width:100%;
            border-radius:50%;
            overflow:hidden;
        }
        .login{
            margin-top:.25rem;
            span{
                padding:.25rem;
                color:#999;
            }
        }
    }
    .info_order{
        line-height: 26px;
        font-size: 16px;
        color:#3AC0B5;
    }
    .menu{
        margin:20px 20px;
        .menu-list{
            margin:0 auto;
            width:50px;
            height:50px;
            border-radius:50%;
        }
        .home{
            background:url('../../assets/d1.jpg') no-repeat;
            background-size:cover;
        }
        .class{
            background:url('../../assets/d2.jpg') no-repeat;
            background-size:cover;
        }
        .my{
            background:url('../../assets/d3.jpg') no-repeat;
            background-size:cover;
        }
        .cart{
            background:url('../../assets/d4.jpg') no-repeat;
            background-size:cover;
        }
    }
}
.info_operation{
    height:auto;
    margin:20px 20px;
    margin-top:40px;
    .info_operation_list{
        margin: 10px 0px;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        padding:10px 0;
        .row_left{
            text-align:left;
            .icon{
                display:inline-block;
                width:30px;
                height:30px;
                color:#fff;
                text-align:center;
                line-height:30px;
                border-radius:6px;
            }
            .icon_order{
                background:#51BDBD;
            }
            .icon_user{
                background:#77C31F;
            }
            .icon_lock{
                background:#F69463;
            }
            .icon_qrcode{
                background:#F784A5;
            }
            .icon_marker{
                background:#30B5D6;
            }
            .icon_off{
                background:#405E90;
            }
            .text{
                display:inline-block;
                height:30px;
                line-height:30px;
                font-size:16px;
                color:rgba(0,0,0,.6);
            }
        }
        .row_right{
            text-align:right;
            display: inline-block;
            width:30px;
            height:30px;
            .icon_right{
                color:rgba(0,0,0,.6);
                font-size:20px;
            }
        }
    }
}
.tab_block{
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