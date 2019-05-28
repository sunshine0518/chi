<template>
    <div class="wrapper">
        <commonTop text_middle='收货地址'></commonTop>
        <div class="address_wrapper">
            <ul>
                <li class="address_list" v-for="(item,index) in addressAll" :key="index" @click="selectAddress(index)">
                    <el-row>
                        <el-col :span="20">
                            <div class="grid-content address_block">
                                <p>
                                    <span>{{item.delivery_user}}</span>
                                    <span class="tel">{{item.delivery_tel}}</span>
                                </p>
                                <p>
                                    {{item.delivery_address}}
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content" @click.stop="editAddress(item)">
                                <span class="el-icon-edit-outline edit"></span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </div>
        <span class="goAdd" @click="goAddAddress">新增地址</span>
    </div>
</template>
<script>
import commonTop from '@/components/common/header';
import localStorage from '../../utils/localStorage';
import {mapState,mapGetters,mapActions} from 'vuex'; 
export default {
  name: 'addressList',
  components: {
      commonTop,
  },
  data(){
      return {
          addressAll:'',
          user:{},
          address:{},
      }
  },
  computed:{
    // ...mapGetters('login',{
    //     user:'getUser',
    // }),
    // ...mapGetters('address',{ 
    //     address:'getDeliveryAddress',
    // }),
  },
  created(){
      this.user=localStorage.get('userInfo');
      this.address=localStorage.get('address');
      console.log(this.user.user_tel);
      console.log(this.$route.params.from);
      if(this.$route.params.from === 'edit'){
            var self=this;
            this.$http.post('/api/address/selectAddressUser',{address_user:this.user.user_tel}).then(function (response){
            self.addressAll=response.data;
            });
      }else{
          this.addressAll=this.address;
      }
  },
  methods:{
      editAddress(item){
          this.$router.push({
              name:'editAddress',
              params:{
                  item:item,
              }
          });
      },
      goAddAddress(){
        this.$router.push({
            name:'addAddress',
            params:{
                address_user:this.user.user_tel,
            },
        });
      },
      selectAddress(index){
          var address=this.addressAll[index];
          this.$router.push({
              name:'pay',
              params:{
                  address:address,
                  from:'addressList'
              }
          });
      },
  },
}
</script>
<style lang="less" scoped>
.wrapper{
    .address_wrapper{
        text-align:left;
        ul,li{
            margin:0;
            padding:0;
            list-style:none;
        }
        .address_list{
            padding:.25rem .5rem 0;
            border-bottom:1px solid #999;
            .address_block{
                border-right:.05rem solid #999;
                 .tel{
                    color:#999;
                }
            }
            .edit{
                display:inline-block;
                width:1rem;
                height:1rem;
                font-size:.5rem;
                margin-top:.7rem;
                color:#999;
                text-align:right;
            }
        }
    }
    .goAdd{
        margin:.5rem 0;
        display:inline-block;
        font-size:.5rem;
        padding:.25rem 1rem;
        color:#fff;
        background:#3AC0B5;
        border-radius:.1rem;
        border:0.1rem  solid #3AC0B5;
    }
}
</style>