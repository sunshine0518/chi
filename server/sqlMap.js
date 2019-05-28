var sqlMap = {
  // 用户
  user: {
      add: 'insert into user(user_tel,user_pwd) values (?,?)',
      select: 'select * from user where user_tel = ? && user_pwd = ?', 
      selectByPhone: 'select count(user_tel) as count from user where user_tel = ?',
      updatePic : 'update user set user_pic = ? where user_tel = ?',
      verifyPwd : 'select count(user_pwd) as count from user where user_tel = ? && user_pwd =?',
      updatePwd : 'update user set user_pwd = ? where user_tel = ?',
  },
  //商品
  commodity: {
      select: 'select * from commodity order by commodity_time desc limit 10', 
      update : 'select commodity.commodity_stock,order.commodity_count inner join (select * from orderitem where orderId = ?) on commodity.Id=orderitem.commodity_id',
      selectAll: 'select * from commodity',
      selectDetail: 'select * from commodity where Id=?',
  },
  //店铺
  shop: {
    select: 'select * from shop where Id = ?',
  },
  //店铺菜单分类
  class: {
    select : 'select * from class where Id  = ?',
  },

  //店铺菜单分类下的菜品
  food: {
    select : 'select * from commodity where commodity_shop = ?  order by commodity_class ASC',
    selectClass: 'select commodity.commodity_class,class.class_name  from commodity left join class on commodity.commodity_class = class.Id where commodity.commodity_shop = ? group by commodity.commodity_class',
  },

  //收货地址
  address: {
    select : 'select * from address where address_user = ? ',
    add: 'insert into address (address_user,delivery_address,delivery_user,delivery_tel,delivery_sex) values (?,?,?,?,?)',
    update : 'update address set delivery_address= ? , delivery_tel =? ,delivery_user = ? , delivery_sex = ?  where Id = ?',
    delete : 'delete from address where Id = ?'
  },

  //订单
  order: {
    add: 'insert into orders (order_number,order_address,order_price,order_time,order_user) values (?,?,?,?,?)',
    select : 'select order_price,orders.Id,orders.order_number,orders.order_time,address.delivery_user,address.delivery_tel,address.delivery_address from orders left join address on orders.order_address = address.Id where orders.order_user=? && orders.order_status =? '
  },
  
  //订单明细表
  ordreitem :{
    add : 'insert into orderitem (commodity_id,commodity_count,order_id) values (?,?,?)',
    select : 'select orderitem.commodity_count,commodity.commodity_name,commodity.commodity_price,commodity.commodity_pic from orderitem left join commodity on orderitem.commodity_id=commodity.Id where order_id = ?'
  },
}
module.exports = sqlMap;