const state={
    token:"",
    user:{
    },
};
const getters={
    getToken(state){ 
        return state.token;
    },
    getUser(state){ 
        return state.user;
    },
};
const mutations={
    newToken(state,token){ 
        state.token=token;
    },
    newUser(state,user){ 
        console.log(user);
        state.user=user;
    },
 };
const actions={
    getNewToken(context,token){
        context.commit('newToken',token.token);
    },
    getNewUser(context,user){
        context.commit('newUser',user.user);
    },
};
export default {
     namespaced:true,
     state,
     getters,
     mutations,
     actions
}