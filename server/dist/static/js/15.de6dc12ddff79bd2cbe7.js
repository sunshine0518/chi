webpackJsonp([15],{"12bf":function(e,r){},aLUb:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("oAV5"),l=(t("R4Sj"),t("Mitt")),u=t("ssT3"),s={name:"modify",components:{commonTop:l.a},data:function(){var e=this;return{ruleForm:{oldPwd:"",newPwd:"",checkPwd:""},rules:{oldPwd:[{required:!0,validator:function(r,t,l){""===t?l(new Error("请输入密码")):o.a.pwdReg.test(e.ruleForm.oldPwd)?e.$http.post("/api/user/verifyUserPwd",{user_pwd:e.ruleForm.oldPwd,user_tel:e.user.user_tel}).then(function(e){e.data[0].count?l():l(new Error("密码错误"))}):l(new Error("请输入合法的密码"))},trigger:"blur"}],newPwd:[{required:!0,validator:function(r,t,l){""===t?l(new Error("请输入密码")):o.a.pwdReg.test(e.ruleForm.newPwd)?(""!==e.ruleForm.checkPwd&&e.$refs.ruleForm.validateField("checkPwd"),l()):l(new Error("请输入合法的密码"))},trigger:"blur"}],checkPwd:[{required:!0,validator:function(r,t,o){""===t?o(new Error("请再次输入密码")):t!==e.ruleForm.newPwd?o(new Error("两次输入密码不一致!")):o()},trigger:"blur"}]}}},created:function(){this.user=u.a.get("userInfo")},methods:{submitForm:function(e){var r=this,t=this;console.log(this.user),this.$refs[e].validate(function(e){if(!e)return!1;t.$http.post("/api/user/updateUserPwd",{user_tel:r.user.user_tel,oldPwd:r.ruleForm.oldPwd,newPwd:r.ruleForm.newPwd}).then(function(e){console.log(e.data),parseInt(e.data.status)&&t.$router.go("-1")})})}}},n={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"wrapper"},[t("commonTop",{attrs:{text_middle:"修改密码"}}),e._v(" "),t("div",{staticClass:"formWrapper"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"auto"}},[t("el-form-item",{attrs:{label:"原密码",prop:"oldPwd"}},[t("el-input",{attrs:{type:"password",utocomplete:"off"},model:{value:e.ruleForm.oldPwd,callback:function(r){e.$set(e.ruleForm,"oldPwd",r)},expression:"ruleForm.oldPwd"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新密码",prop:"newPwd"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.newPwd,callback:function(r){e.$set(e.ruleForm,"newPwd",r)},expression:"ruleForm.newPwd"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPwd"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPwd,callback:function(r){e.$set(e.ruleForm,"checkPwd",r)},expression:"ruleForm.checkPwd"}})],1),e._v(" "),t("el-form-item",[t("el-button",{staticClass:"submit",attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("确定")]),e._v(" "),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var a=t("C7Lr")(s,n,!1,function(e){t("12bf")},"data-v-07755e2e",null);r.default=a.exports}});
//# sourceMappingURL=15.de6dc12ddff79bd2cbe7.js.map