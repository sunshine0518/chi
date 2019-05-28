<template>
  <div class="wrapper">
    <commonTop text_middle="登录"></commonTop>
      <div class="registeInfo">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
					<el-form-item label="手机号" prop="name">
						<el-input type="text" v-model="ruleForm.tel" autocomplete="off" placeholder="手机号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
					</el-form-item>
          <el-form-item  label="验证码" prop="validate">
            <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" ></el-input>
            <div class="code" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </el-form-item>
					<!-- <el-form-item label="身份" prop="flag">
						 <el-radio-group v-model="ruleForm.flag">
                            <el-radio :label="0">普通用户</el-radio>
                            <el-radio :label="1">管理员</el-radio>
                        </el-radio-group>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
		  </div>
      <div class="goRegister" @click="goRegister">去注册?</div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
import Util from '../../utils/utils';
import localStorage from '../../utils/localStorage';
import commonTop from '@/components/common/header';
export default {
  name: 'login',
  components: {
      commonTop,
  },
  data() {
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
        return {
          identifyCodes: "1234567890",
          identifyCode: "",
          ruleForm: {
            tel: '',
            pass: '',
            checkPass: '',
            validate: '' ,     
            flag:0
          },
          rules: {
            tel: [  
              { required: true, validator: validateTel,trigger: 'blur' }
            ],
            pass: [
              { required: true, validator: validatePass,trigger: 'blur' }
            ],
            checkPass: [
              { required: true, validator: validatePass2,trigger: 'blur' }
            ],
            validate: [
              { required: true,trigger: 'blur' }
            ]
          }
        };
    },
    computed:{
    },
    mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      ...mapActions('login',[ 
          'getNewToken',
          'getNewUser',
      ]),
      submitForm(formName) {
            const self = this;	
            this.$refs[formName].validate((valid) => {
            if (valid) {
                self.$http.post('/api/user/selectUser',self.ruleForm).then(function(response) {
                  console.log(response.data);
                    let token=response.data.token;
                    let user=response.data.user;
                    console.log(response.data.user);
                    self.getNewToken({'token':token});
                    self.getNewUser({'user':user});
                    localStorage.set('accessToken',token);
                    localStorage.set('userInfo',user);
                    if(self.$route.query.redirect){
                      console.log("111");
                      var path=self.$route.query.redirect;
                      console.log(path);
                      self.$router.push(path);
                    }else{
                      console.log("222");
                      self.$router.push("/");
                    }
                })
            } 
            else {
                return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
      },
      randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
      },
      makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
      },
      goRegister(){
        this.$router.push('/register');
      }
    }
  }
</script>
<style scoped>
  .registeInfo{
    margin:20px 20px;
  }
  .code {
        width: 50%;
        height: 35px;
        float: left;
        border-radius: 2px;
        margin-left:5px;
    }
    .validate-code {
        width: 45%;
        float: left;
    }
    .goRegister{
      color:#999;
      font-size:.5rem;
      text-align:right;
      margin-right:20px;
    }
</style>