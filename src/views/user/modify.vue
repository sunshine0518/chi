<template>
    <div class="wrapper">
        <commonTop text_middle="修改密码"></commonTop>
        <div class="formWrapper">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="ruleForm.oldPwd" utocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Util from '../../utils/utils';
import {mapState,mapGetters,mapActions} from 'vuex'; 
import commonTop from '@/components/common/header';
import localStorage from '../../utils/localStorage';
export default {
  name: 'modify',
  components: {
      commonTop,
  },
  data(){
       var validateName = (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入昵称'));
          }
          else if(!Util.nameReg.test(this.ruleForm.name)){
            callback(new Error('请输入合法的昵称'));
          }
          else {
					  callback();
				  }
       };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!Util.nameReg.test(this.ruleForm.pwdReg)){
          callback(new Error('请输入合法的密码'));
        }
        else{
           if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateTel = (rule, value, callback)=>{
        if (value === '') {
          callback(new Error('请输入手机号'));
        } 
        else if(!Util.phoneReg.test(this.ruleForm.tel)){
          callback(new Error('请输入合法的手机号'));
        }
        else {
            this.$http.post('/api/user/selectUserByPhone',{tel:this.ruleForm.tel}).then(function(response) {
                console.log(response);
                if(response.data[0].count){
                  callback(new Error('手机号已被注册，换一个'));
                }
                else{
                  callback();
                }
						})
        }
      };
      var validateEmail= (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } 
        else if(!Util.nameReg.test(this.ruleForm.emailReg)){
          callback(new Error('请输入合法的邮箱'));
        }
        else {
          callback();
        }
      };
      var validateOldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!Util.pwdReg.test(this.ruleForm.oldPwd)){
          callback(new Error('请输入合法的密码'));
        }
        else{
            this.$http.post('/api/user/verifyUserPwd',{
                user_pwd:this.ruleForm.oldPwd,
                user_tel:this.user.user_tel,
            }).then(function (response){
                if(!response.data[0].count){
                    callback(new Error('密码错误'));
                }
                else{
                    callback();
                }
            });
        }
      };
      var validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(!Util.pwdReg.test(this.ruleForm.newPwd)){
          callback(new Error('请输入合法的密码'));
        }
        else{
           if (this.ruleForm.checkPwd !== '') {
              this.$refs.ruleForm.validateField('checkPwd');
            }
            callback();
        }
      };
      var validateCheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
				ruleForm: {
                    oldPwd:'',
                    newPwd:'',
					checkPwd: '',
        },
        rules: {
				oldPwd: [
                     { required: true, validator: validateOldPwd,  trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, validator: validateNewPwd,  trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, validator: validateCheckPwd, trigger: 'blur' }
                ],
        }
      };
  }, 
  created(){
     this.user=localStorage.get('userInfo');
  },
  methods:{
      submitForm(formName){
        const self = this;	
        console.log(this.user);
        this.$refs[formName].validate((valid) => {
          if (valid) {
              self.$http.post('/api/user/updateUserPwd',{
                          user_tel:this.user.user_tel,
                          oldPwd:this.ruleForm.oldPwd,
                          newPwd:this.ruleForm.newPwd
                }).then(function(response) {
                  console.log(response.data);
                if(parseInt(response.data.status)){
                    self.$router.go('-1');
                }})
          } 
          else {
            return false;
          }
        });
      },
  },
}
</script>
<style lang='less' scoped>
.wrapper{
    .formWrapper{
        margin:20px;
        .submit{
            background:#3AC0B5;
        }
    }
}
</style>
