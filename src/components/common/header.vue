<template>
    <div class="header">
        <el-row>
            <el-col :span="6"><div class="grid-content icon_left" @click="goBack"><img :src="icon_arrow_left" class="icon_arrow_left"></div></el-col>
            <el-col :span="12"><div class="grid-content text-middle">{{text_middle}}</div></el-col>
            <el-col :span="6"><div class="grid-content"></div></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            icon_arrow_left: require('../../assets/arrow_left_home.png'),
        }
    },
    props:{
        text_middle: {
            type: String,
            default: '客多多'
        },
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    },
}
</script>
<style scoped lang='less'>
.header{
    padding:0 20px;
    width:100%;
    height:50px;
    line-height:50px;
    box-sizing:border-box;
    background:#3AC0B5;
    color:#fff;
    font-size:18px;
}
.icon_left{
    text-align:left;
    margin-top:10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0,0,0,.2);
    box-shadow: 0 0 0 0.1rem rgba(0,0,0,.1);
    .icon_arrow_left{
        max-width:100%;
        display:block;
    }
}
.text-middle{
    text-align:center;
}
</style>