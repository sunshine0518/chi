const express = require('express');
const router = express.Router();
const api = require('./api/userApi');
// // 增加用户接口
// router.post('/addUser', (req, res) => {
//   var sql = $sql.user.add;
//   var params = req.body;
//   conn.query(sql, [params.name, params.pass, params.tel, params.registeTime], function(err, result) {
//       if (err) {
//           console.log(err);
//           const ret={'code':'0','message':'fail'};
//           res.send(ret);
//       }
//       if (result) {
//           console.log(result);
//           const ret={'code':'1','message':'ok'};
//           res.send(ret);
//       }
//   })
// });
// //查询用户接口
// router.post('/selectUser', (req, res) => {
//   var sql = $sql.user.select;
//   var params = req.body;
//   console.log(params);
//   sql += " where user_name ='"+ params.name +"'";
//   console.log(sql);
//   conn.query(sql, params.name, function(err, result) {
//       if (err) {
//           console.log(err);
//           const ret={'code':'0','message':'fail'};
//           res.send(ret);
//       }
//       if (result) {
//           console.log(result);
//           const ret={'code':'1','message':'ok'};
//           res.send(ret);
//       }
//   })
// });

// //查询用户接口
// router.get('/select_User', (req, res) => {
//   var sql = $sql.user.select;
//   console.log(sql);
//   conn.query(sql, params.name, function(err, result) {
//       if (err) {
//           console.log(err);
//           const ret={'code':'0','message':'fail'};
//           res.send(ret);
//       }
//       if (result) {
//           console.log(result);
//           const ret={'code':'1','message':'ok'};
//           res.send(ret);
//       }
//   })
// });





// //查询商品接口
// router.get('/selectCommodity', (req, res) => {
//   var sql = $sql.commodity.select;
//   var params = req.body;
//   console.log(params);
//   console.log(sql);
//   conn.query(sql,function(err, result) {
//       if (err) {
//           console.log(err);
//           const ret={'code':'0','message':'fail'};
//           res.send(ret);
//       }
//       if (result) {
//           console.log(result);
//           const ret={'code':'1','message':'ok'};
//           res.send(ret);
//       }
//   })
// });
router.get('/getToken',(req,res,next)=>{
   api.getToken(req,res,next);
});
router.post('/getAccessToken',(req,res,next)=>{
  api.getAccessToken(req,res,next);
});
router.post('/user/selectUserByPhone', (req, res, next) => {
  api.selectUserByPhone(req, res, next);
});
router.post('/user/addUser', (req, res, next) => {
  api.addUser(req, res, next);
});
router.post('/uploadUserPic', (req, res, next) => {
  api.uploadUserPic(req, res, next);
});
router.post('/user/updateUserPic', (req, res, next) => {
  api.updateUserPic(req, res, next);
});
router.post('/user/verifyUserPwd', (req, res, next) => {
  api.verifyUserPwd(req, res, next);
});
router.post('/user/updateUserPwd', (req, res, next) => {
  api.updateUserPwd(req, res, next);
});
router.get('/commodity/selectCommodity', (req, res, next) => {
  api.selectCommodity(req, res, next);
});
router.get('/commodity/selectCommodityAll', (req, res, next) => {
  api.selectCommodityAll(req, res, next);
});
router.post('/commodity/selectCommodityDetail', (req, res, next) => {
  api.selectCommodityDetail(req, res, next);
});
router.post('/commodity/updateCommodity', (req, res, next) => {
  api.updateCommodity(req, res, next);
});
router.post('/user/selectUser', (req, res, next) => {
  api.selectUser(req, res, next);
});
router.get('/shop/selectShop', (req, res, next) => {
  api.selectShop(req, res, next);
});
router.post('/shop/selectShopDetail', (req, res, next) => {
  api.selectShopDetail(req, res, next);
});
router.post('/class/selectClass', (req, res, next) => {
  api.selectClass(req, res, next);
});
router.post('/food/selectFood', (req, res, next) => {
  api.selectFood(req, res, next);
});
// router.post('/food/selectFoodCount', (req, res, next) => {
//   api.selectFoodCount(req, res, next);
// });
router.post('/address/selectAddressUser', (req, res, next) => {
  api.selectAddressUser(req, res, next);
});
router.post('/address/addAddressUser', (req, res, next) => {
  api.addAddressUser(req, res, next);
});
router.post('/address/updateAddress', (req, res, next) => {
  api.updateAddress(req, res, next);
});
router.post('/address/deleteAddress', (req, res, next) => {
  api.deleteAddress(req, res, next);
});
router.get('/waitPay', (req, res, next) => {
  api.waitPay(req, res, next);
});
router.post('/order/createOrder', (req, res, next) => {
  api.createOrder(req, res, next);
});
router.post('/order/selectOrder', (req, res, next) => {
  api.selectOrder(req, res, next);
});
router.post('/order/selectOrderItem', (req, res, next) => {
  api.selectOrderItem(req, res, next);
});
module.exports = router;
