<template>
    <div class="wrapper">
       <commonTop text_middle="编辑收货地址"></commonTop>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
            <!-- <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="联系人" prop="deliveryUser">
                <el-input type="text" v-model="ruleForm.deliveryUser"></el-input>
            </el-form-item>
            <el-form-item label="" prop="sex">
                <el-radio v-model="ruleForm.sex" label="0">先生</el-radio>
                <el-radio v-model="ruleForm.sex" label="1">女士</el-radio>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <el-input type="text" v-model="ruleForm.tel" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="省市区" prop="address">
                <el-input type="text" v-model="ruleForm.address" autocomplete="off" @focus="showAddresss" @blur="hideAddress"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
                <el-input type="text" v-model='ruleForm.detailAddress'></el-input>
            </el-form-item>
            <!-- <el-form-item label="注册时间" prop="registeTime">
                <el-date-picker  type="date" placeholder="注册日期" v-model="ruleForm.registeTime" style="width: 100%;"></el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="身份" prop="flag">
                <el-select class="select-flag" v-model="form.flag" placeholder="请选择身份">
                    <el-option label="普通用户" value="0"></el-option>
                    <el-option label="管理员" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" class="submit" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="deleteAddress">删除</el-button>
            </el-form-item>
        </el-form>
        <addressPopupTool v-on:getRegion="regionGet" v-if="addressShow"></addressPopupTool>
    </div>
</template>
<script>
import commonTop from '@/components/common/header';
import Util from '../../utils/utils';
import {mapState,mapGetters,mapActions} from 'vuex';
import addressPopupTool from '@/components/addressPopupTool';
export default {
  name: 'editAddress',
  data(){
       var validateTel = (rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入手机号'));
            }   
            else if(!Util.phoneReg.test(this.ruleForm.tel)){
                callback(new Error('请输入合法的手机号'));
            }
            else {
                callback();
            }   
      };
      return {
          addressShow:false,
          ruleForm:{
              deliveryUser:'',
              tel:'',
              address:'',
              Id:'',
              sex:'',
              detailAddress:'',
          },
          rules:{
            deliveryUser: [
                 { required: true,message:'请输入联系人'}
            ],
            tel: [
                { required: true, validator: validateTel, trigger: 'blur' }
            ],
            address: [
                 { required: true,message:'请选择省市区'}
            ],
            detailAddress: [
                 { required: true,message:'请输入详细地址'}
            ],
          },
      }
  },
  components: {
      commonTop,
      addressPopupTool
  },
  computed:{
    ...mapGetters('address',{ 
        address:'getDeliveryAddress',
    }),
  },
  created(){
      this.addressItem=this.$route.params.item;
      console.log(this.addressItem);
      this.ruleForm.deliveryUser=this.$route.params.item.delivery_user;
      this.ruleForm.tel=this.$route.params.item.delivery_tel;
      this.ruleForm.address=this.$route.params.item.delivery_address.split('区')[0]+'区';
       this.ruleForm.detailAddress=this.$route.params.item.delivery_address.split('区')[1];
      this.ruleForm.Id=this.$route.params.item.Id;
      this.ruleForm.sex=this.$route.params.item.delivery_sex;
  },
  methods:{
    submitForm(formName) {
        const self = this;	
        this.$refs[formName].validate((valid) => {
            if (valid) {
                self.$http.post('/api/address/updateAddress',self.ruleForm).then(function(response) {
                    console.log(response.data);
                    if(parseInt(response.data.status) === 1){
                        self.$router.push({
                            name:'addressList',
                            params:{
                                from:'edit',
                            },
                        });
                    }
                })
            }
            else {
                return false;
            }
        });
    },
    deleteAddress(){
        var self=this;
        this.$http.post('/api/address/deleteAddress',{Id:this.ruleForm.Id}).then(function (response){
            console.log(response.data);
            if(parseInt(response.data.status) === 1){
                self.$router.push({
                    name:'addressList',
                    params:{
                         from:'edit',
                        },
                });
            }
        });
    },
    regionGet(data){
        console.log(data);
        this.ruleForm.address=data;
    },
    showAddresss(){
        console.log('111');
        this.addressShow=true;
    },
    hideAddress(){
        this.addressShow=false;
    }
  },
}
</script>
<style lang='less' scoped>
.wrapper{
    .demo-ruleForm {
        margin:20px 20px;
    }
    .submit{
        background:#3AC0B5;
    }
}
</style>
