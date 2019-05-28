const state={
    shop:{},
};
const getters={
    getShop(state){ 
        return state.shop;
    }
};
const mutations={
    newShop(state,shop){ 
        state.shop=shop;
    }
 };
const actions={
    getNewShop(context,shop){
        context.commit('newShop',shop.shop);
    }
};
export default {
     namespaced:true,
     state,
     getters,
     mutations,
     actions
}