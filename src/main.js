// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'//引入store
import ElementUI from 'element-ui'
import $ from 'jquery';
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css' 
import SIdentify from '@/components/Identify';    //自定义组件
import localStorage from './utils/localStorage';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';
import wx from 'weixin-js-sdk';
import AMap from 'vue-amap';

Vue.use(MintUI);
Vue.use(wx);
Vue.use(AMap);
Vue.component("SIdentify",SIdentify);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;



AMap.initAMapApiLoader({
  key: '58c724b5641c3029776eb71a472b1150',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geolocation']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.get('accessToken')) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
});
// export const Axios = axios.create({
// 	baseURL: 'https://127.0.0.1:8080/',  //接口名称
// 	timeout: 5000,  //请求接口的时间
// });
// Axios.interceptors.request.use(function(config) {
// 	console.log(config)
// 	// 在发送请求之前做些什么 设置token 判断有没有token
// 	if (localStorage.get('accessToken')) {
// 		// console.log(store.state.token)
// 		config.headers.token = localStorage.get('accessToken');
// 		// config['headers']['Authorization'] = AUTH_TOKEN
// 	}
// 	return config;
// }, function(error) {
// 	// 对请求错误做些什么
// 	return Promise.reject(error);
// });
Vue.prototype.$http = axios;