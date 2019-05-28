<template>
    <div class="registeInfo">
        <commonTop text_middle="注册"></commonTop>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
            <!-- <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="手机号" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="注册时间" prop="registeTime">
                <el-date-picker  type="date" placeholder="注册日期" v-model="ruleForm.registeTime" style="width: 100%;"></el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="身份" prop="flag">
                <el-select class="select-flag" v-model="ruleForm.flag" placeholder="请选择身份">
                    <el-option label="普通用户" value="0"></el-option>
                    <el-option label="管理员" value="1"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" class="submit" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
	</div>
</template>

<script>
import Util from '../../utils/utils';
import commonTop from '@/components/common/header'
export default {
  name: 'register',
  components: {
      commonTop,
  },
  data() {
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
      return {
				ruleForm: {
					// name: '',
          pass: '',
					checkPass: '',
					tel: '',
					// email: '',
					// registeTime: ''
        },
        rules: {
					name: [
            { required: true, validator: validateName, message: '请输入用户名', trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass,  trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          tel: [
            { required: true, validator: validateTel, trigger: 'blur' }
          ],
          email: [
             { required: true, validator: validateEmail, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
				const self = this;	
        this.$refs[formName].validate((valid) => {
          if (valid) {
						  self.$http.post('/api/user/addUser',self.ruleForm).then(function(response) {
                console.log(response);
                self.$router.push('/login');
						})
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped lang='less'>
.registeInfo{
    width:100%;
    .demo-ruleForm {
        margin:20px 20px;
    }
    .submit{
        background:#3AC0B5;
    }
}
</style>