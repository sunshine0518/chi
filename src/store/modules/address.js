const state={
    deliveryAddress:[],
};
const getters={
    getDeliveryAddress(state){ 
        return state.deliveryAddress;
    },
};
const mutations={
    newDeliveryAddress(state,deliveryAddress){ 
        state.deliveryAddress=deliveryAddress;
    },
 };
const actions={
    getNewDeliveryAddress(context,deliveryAddress){
        context.commit('newDeliveryAddress',deliveryAddress.address);
    }
};
export default {
     namespaced:true,
     state,
     getters,
     mutations,
     actions
}