var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
const JwtUtil = require('../jwt');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const md=require('../md5.js');
var config = require('../config/config');
var wechat = require('../config/WeChat');
const crypto = require('crypto'); //引入加密模块
const sign = require('../config/sign.js');
const sign1 = require('../config/sign1.js');



// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect(
    function (err){
        if(err){console.log('失败',err);}
        else {console.log("成功");}
    }
);

var getNow=function (){
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day  = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
    return currentdate;
};
var wechatApp = new wechat(config); //实例wechat 模块
var appId='wx586d2a4d23646ecd';
var appsecret='95d4047822b6845c236b7249e6389ef5';
module.exports = {
    getToken(req,res,next){
        wechatApp.auth(req,res,next);
    },
    getAccessToken(req, res, next) {
        // wechatApp.getAccessToken(req,res,next);
        // let config = {
        //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: appId, // 必填，公众号的唯一标识
        //   timestamp: '', // 必填，生成签名的时间戳
        //   nonceStr: '', // 必填，生成签名的随机串
        //   signature: '',// 必填，签名，见附录1
        //   jsApiList: ['chooseImage', 'getLocation', 'openLocation', 'scanQRCode', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // };
        // let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appsecret
        // axios.get(url).then(token => {
        //     console.log('token',token.data);
        //   let access_token = token.data.access_token;
        //   axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi').then(jsapi => {
        //       console.log('jsapi',jsapi.data.ticket);
        //       console.log('jsapi',jsapi.data);
        //     let c = sign(jsapi.data.ticket,req.body.url);
        //     config.timestamp = c.timestamp;
        //     config.nonceStr = c.nonceStr;
        //     config.signature = c.signature;
        //     res.json({data: config, msg: '获取微信JS-SDK配置成功', code: 200})
        //   })
        //   // res.json(rsp.data);
        // })
        console.log(sign1);
        sign1(req,res,next);
      },
    selectUserByPhone(req, res, next){
        var sql = $sql.user.selectByPhone;
        var params = req.body;
        conn.query(sql, [params.tel], function(err, result) {
            if (err) {
                res.send(err);
                return err;
            }
            if (result) {
                res.send(result);
                return result;
            }
        });
    },
    addUser(req, res, next){
        var sql = $sql.user.add;
        var params = req.body;
        var pass1=new md(params.pass);
        pass1=pass1.jiami();
        conn.query(sql, [params.tel,pass1], function(err, result) {
            if (err) {
                res.send(err);
            }
            if (result) {
                res.send(result);
            }
        })
    },
    selectCommodity(req, res, next){
        var sql = $sql.commodity.select;
        conn.query(sql,function(err, result) {
            if (err) {
                const ret={'code':'0','message':'fail'};
                res.send(ret);
            }
            if (result) {
                const ret={'code':'1','message':'ok','result':result};
                res.send(ret);
            }
        })
    },
    selectCommodityAll(req,res,next){
        var sql = $sql.commodity.selectAll;
        conn.query(sql,function(err, result) {
            if (err) {
                const ret={'code':'0','message':'fail'};
                res.send(ret);
            }
            if (result) {
                const ret={'code':'1','message':'ok','result':result};
                res.send(ret);
            }
        });
    },
    selectCommodityDetail(req,res,next){
        var sql = $sql.commodity.selectDetail;
        var params=req.body;
        conn.query(sql,[params.id],function(err, result) {
            if (err) {
                const ret={'code':'0','message':'fail'};
                res.send(ret);
            }
            if (result) {
                const ret={'code':'1','message':'ok','result':result};
                res.send(ret);
            }
        });
    },
    selectUser(req, res, next){
        var sql = $sql.user.select;
        var params = req.body;
        console.log(params);
        var pass1=new md(params.pass);
        pass1=pass1.jiemi();
        conn.query(sql, [params.tel,pass1],function(err, result) {
            if (err) {
                res.send(err);
            }
            if (result) {
                if(!result.length){
                    res.send({status:0,msg:'fail'})
                }else{
                    var response=JSON.parse(JSON.stringify(result[0]));
                    // 登陆成功，添加token验证
                    let id = response.Id.toString();
                    // 将用户id传入并生成token
                    let jwt = new JwtUtil(id);
                    let token = jwt.generateToken();
                    // 将 token 返回给客户端
                    let user={
                        user_name:response.user_name,
                        user_tel:response.user_tel,
                        user_pic:response.user_pic,
                    };
                    res.send({status:1,msg:'ok',user:user,token:token});
                }
            }
        });
    },
    selectShop(req, res, next){
        var sql = $sql.shop.select;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                const ret={'code':'0','message':'fail'};
                res.send(ret);
            }
            if (result) {
                res.send(result);
            }
        })
    },
    selectShopDetail(req,res,next){
        var sql = $sql.shop.select;
        var params = req.body;
        conn.query(sql, [params.Id],function(err, result) {
            if (err) {
                const ret={'status':0,'message':'fail'};
                res.send(ret);
            }
            if (result) {
                var response=JSON.parse(JSON.stringify(result[0]));
                let shop={
                    shop_id:response.Id,
                    shop_name:response.shop_name,
                    shop_pic:response.shop_pic,
                    shop_startFee:response.shop_startFee,
                    shop_delivery:response.shop_delivery,
                };
                res.send({status:1,msg:'ok',shop:shop});
            }
        });
    },
    selectClass(req,res,next){
        var params = req.body;
        var sql = $sql.class.select;
        conn.query(sql,  [params.Id], function(err, result) {
            if (err) {
                const ret={status:0,'message':'fail'};
                res.send(ret);
            }
            if (result) {
                console.log(result);
            }
        })
    },
    selectFood(req,res,next){
        console.log('food');
        var params = req.body;
        var sql1 = $sql.food.selectClass;
        var sql2= $sql.food.select;
        conn.query(sql1,  [params.commodity_shop], function(err, result) {
            if (err) {
                console.log(err);
                const ret={'status':0,'message':'fail'};
                res.send(ret);
            }
            if (result) {
                var temRes=[];
                for(let i=0;i<result.length;i++){
                    let json={
                        menu:(JSON.parse(JSON.stringify(result[i]))).commodity_class,
                        menuClass:(JSON.parse(JSON.stringify(result[i]))).class_name,
                        food:[],
                    };
                    temRes.push(json);
                }
                conn.query(sql2,[params.commodity_shop], function(err, result){
                   if(err){
                       res.send(err);
                   }
                   if(result){
                    //根据商品进行排序
                    for(let j=0;j<result.length;j++){
                        for(let k=0;k<result.length-1-j;k++){
                            let commodity1 = JSON.parse(JSON.stringify(result[k]));
                            let commodity2 = JSON.parse(JSON.stringify(result[k+1]));
                            if(commodity1.commodity_sold < commodity2.commodity_sold){
                                let t=result[k];
                                result[k]=result[k+1];
                                result[k+1]=t;
                                flag=false;
                            }
                        }
                    }
                    //返回热销榜菜单
                    let hotSold={menu:0,menuClass:'热销榜',food:[]};
                    for(let i=0;i<5;i++){
                        let commodity = JSON.parse(JSON.stringify(result[i]));
                        hotSold.food.push(commodity);
                    }
                    temRes.unshift(hotSold);
                    //返回json格式的每个菜单下的菜品相对应    
                    for(let i=0;i<temRes.length;i++){
                            for(let j=0;j<result.length;j++){
                                let commodity = JSON.parse(JSON.stringify(result[j]));
                                if(temRes[i].menu === commodity.commodity_class){
                                    temRes[i].food.push(commodity);
                                    result.splice(j,1);
                                    j--;
                                }
                            }
                        }
                        res.send({status:1,msg:'ok',food:temRes});
                   }
                });
            }
        });
    },
    uploadUserPic(req,res,next){
        var params=req.body;
        var basefile=params.user_pic;
        var fileName = Date.parse(new Date());
        var publicPath='public/img/'+fileName+'.jpg';
        // var publicPath= 'http://144.202.90.177:3004/upload/userImg/'+fileName+'.jpg';
        var user_pic=fileName+'.jpg';
        var base64 = basefile.replace(/^data:image\/\w+;base64,/,'');
        var dataBuffer = new Buffer.from(base64, 'base64');
        console.log(publicPath);
        fs.writeFile(publicPath, dataBuffer, function(err){
            if(err){
               return err;
            }
            else{
                return res.json({
                    user_pic:user_pic,
                });
            }
        })
    },
    updateUserPic(req,res,next){
        var params = req.body;
        var sql = $sql.user.updatePic;
        conn.query(sql,[params.user_pic,params.user_tel], function(err, result) {
            if(err){
                res.send(err);
            }else{
               if(result.affectedRows){
                   res.send({
                       status:1,
                       msg:'ok'
                   });
               }
                else{
                    res.send({
                        status:0,
                        msg:'fail'
                    });
                }
            }
        })
    },
    verifyUserPwd(req,res,next){
        var params=req.body;
        var sql = $sql.user.verifyPwd;
        var pwd = req.body.user_pwd;
        var tel = req.body.user_tel;
        var pass1=new md(pwd);
        pass1=pass1.jiemi();
        console.log(params);
        conn.query(sql,[tel,pass1], function(err, result) {
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
    },
    updateUserPwd(req,res,next){
        var params=req.body;
        if(params.oldPwd === params.newPwd){
            res.send({
                status:'1',
                text:'ok',
                message:'修改成功'
            });
            return ;
        }
        else{
            var sql = $sql.user.updatePwd; 
            var pass1=new md(params.newPwd);
            pass1=pass1.jiami();
            conn.query(sql,[pass1,params.user_tel], function(err, result) {
                if(err){
                    res.send(err);
                }else{
                    console.log(result);
                    if(result.changedRows){
                        res.send({
                            status:'1',
                            text:'ok',
                            message:'修改成功'
                        });
                    }
                    else{
                        res.send({
                            status:'0',
                            text:'fail',
                            message:'修改失败'
                        });
                    }
                }
            })
        }
    },
    selectAddressUser(req,res,next){
        var params=req.body;
        var sql = $sql.address.select; 
        conn.query(sql,[params.address_user], function(err, result) {
            if(err){
                console.log(err);
                res.send(err);
            }
            if(result){
                let response=[];
                result.forEach((Element) => {
                    let json={
                        Id:Element.Id,
                        address_user:Element.address_user,
                        delivery_address:Element.delivery_address,
                        delivery_tel:Element.delivery_tel,
                        delivery_user:Element.delivery_user,
                        delivery_sex:Element.delivery_sex,
                    };
                    response.push(json);
                });
                res.send(response);
            }
        });
    },
    addAddressUser(req,res,next){
        var params=req.body;
        var sql = $sql.address.add; 
        var address=params.address+params.detailAddress;
        conn.query(sql,[params.address_user,address,params.deliveryUser,params.tel,params.sex], function(err, result) {
            if(err){
                res.send(err);
            }else{
                var response=JSON.parse(JSON.stringify(result));
                if(response.affectedRows){
                    res.send({
                        status:'1',
                        mag:'ok'
                    });
                }else{
                    res.send({
                        status:'0',
                        mag:'fail'
                    });
                }
            }

        });
    },
    updateAddress(req,res,next){
        var params=req.body;
        var sql = $sql.address.update;
        console.log(params);
        var add=params.address;
        var detail=params.detailAddress;
        var address=add+detail;
        conn.query(sql,[address,params.tel,params.deliveryUser,params.sex,params.Id], function(err, result) {
            if(err){
                res.send(err);
            }
            if(result){
                if(result.affectedRows){
                    res.send({
                        status:'1',
                        msg:'ok',
                    });
                }else{
                    res.send({
                        status:'0',
                        msg:'fail',
                    });
                }
            }
        });
    },
    deleteAddress(req,res,next){
        var params=req.body;
        var sql = $sql.address.delete; 
        conn.query(sql,[params.Id], function(err, result) {
            if(err){
                res.send(err);
            }
            if(result){
               if(result.affectedRows){
                   res.send({
                       status:'1',
                       msg:'ok'
                   });
               }else{
                   res.send({
                       status:'0',
                       msg:'fail'
                   });
               }
            }
        })
    },
    waitPay(req,res,next){
        res.send({
            status:1,
            msg:'待支付',
        });
    },
    createOrder(req,res,next){
        var sql1= $sql.order.add;
        var sql2= $sql.ordreitem.add;
        var params=req.body;
        var date=new Date().getTime();
        var time=getNow();
        var token=params.token;
        let jwt = new JwtUtil(token);
        let id = jwt.verifyToken().userId;
        conn.query(sql1,[date,params.address.Id,params.realTotalPrice,time,id],function(err, result) {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                if(result.affectedRows){
                    var orderId=result.insertId;
                    var len=params.selectedFood.length;
                    params.selectedFood.forEach((item,index)=>{
                        conn.query(sql2,[item.Id,item.count,orderId],function (err,result){
                            if(err){
                                res.send(err);
                            }else{
                                if(index === len-1){
                                    res.send({
                                        status:1,
                                        msg:'ok',
                                        orderId:orderId
                                    });
                                }
                            }
                        });
                    });
                }
            }
        });
    },
    selectOrder(req,res,next){
        var sql=$sql.order.select;
        var params=req.body;
        var token=params.order_user;
        console.log(token);
        let jwt = new JwtUtil(token);
        let id = jwt.verifyToken().userId;
        console.log(id);
        conn.query(sql,[id,params.order_status],function(err, result) {
            console.log(sql);
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                console.log(result);
                res.send(result);
            }
        });
    },
    selectOrderItem(req,res,next){
        var sql=$sql.ordreitem.select;
        var params=req.body;
        console.log(params);
        conn.query(sql,[params.id],function(err, result) {
            if(err){console.log(err);
                res.send(err);
            }
            else{
                result.forEach((item)=>{
                    item.price=item.commodity_count*item.commodity_price;
                    item.order_time=item.order_time+8;
                });
                console.log(result);
                res.send({status:1,msg:'ok',result:result});
            }
        });
    }
};