import Vue from 'vue';
import Vuex from 'vuex';
import my from './modules/my'
import login from './modules/login'
import address from './modules/address'
import food from './modules/food'
import shop from './modules/shop'
Vue.use(Vuex);

// const state={//要设置的全局访问的state对象
//     token: '',
//     menuClass:[],
//     food:[],
//     selectedFood:[],
//     user:{},
//     //要设置的初始属性值
// };
// const getters = {   //实时监听state值的变化(最新状态)
//     getToken(){
//         return state.token;
//     },
//     getUser(){
//         return state.user;
//     },
//     getFood(){
//         return state.food;
//     },
//     getSelectedFood(){
//         return state.selectedFood;
//     },
// };
// const mutations  = {
//     newToken(state,token){
//         console.log(token);
//         state.token=token;
//     },
//     newUser(state,user){
//         state.user=user;
//     },
//     newFood(state,food){
//         state.food=food;
//     },
//     newSelectedFood(state,selectedFood){
//         state.selectedFood=selectedFood;
//     },
// };
// const actions = {
//     getNewToken(context,token){
//         context.commit('newToken',token);
//     },
//     getNewUser(context,user){
//         context.commit('newUser',user)
//     },
//     getNewFood(context,food){   //同上注释，num为要变化的形参
//         context.commit('newFood',food);
//     },
//     getNewSelectedFood(context,selectedFood){
//         context.commit('newSelectedFood',selectedFood);
//     }
// };
// const store = new Vuex.Store({
//     state,
//     getters,
//     mutations,
//     actions
// });

// export default store;
export default new Vuex.Store({
    modules:{
        my,
        login,
        address,
        food,
        shop
    }
});