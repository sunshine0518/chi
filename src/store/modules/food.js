const state={//要设置的全局访问的state对象
    food:[],
    selectedFood:[],
    count:0,
    totalPrice:0,
};
const getters = {   //实时监听state值的变化(最新状态)
    getFood(){
        return state.food;
    },
    getSelectedFood(){
        return state.selectedFood;
    },
    getCount(){
        return state.count;
    },
    getTotalPrice(){
        return state.totalPrice;
    },
};
const mutations  = {
    newFood(state,food){
        state.food=food;
    },
    newSelectedFood(state,selectedFood){
        state.selectedFood=selectedFood;
    },
    newCount(state,count){
        state.count=count;
    },
    newTotalPrice(state,totalPrice){
        state.totalPrice=totalPrice;
    },
};
const actions = {
    getNewFood(context,food){   //同上注释，num为要变化的形参
        context.commit('newFood',food);
    },
    getNewSelectedFood(context,selectedFood){
        context.commit('newSelectedFood',selectedFood.selected);
    },
    getNewCount(context,count){
        context.commit('newCount',count.count);
    },
    getNewTotalPrice(context,totalPrice){
        context.commit('newTotalPrice',totalPrice.totalPrice);
    }
};
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
