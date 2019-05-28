// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = 'userId'; 
// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
    }
    //生成token
    generateToken() {
        let data = this.data;
        console.log(data);
        let created = Math.floor(Date.now() / 1000);
        // let cert = fs.readFileSync(path.join(__dirname, 'public/private_key.pem'));//私钥 可以自己生成
        let token = jwt.sign(
            {userId: data},
            secret,
            {expiresIn: created + 60 * 30},
        );
        console.log(token);
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        let id;
        console.log(token);
        // let cert = fs.readFileSync(path.join(__dirname, 'public/public_key.pem'));//公钥 可以自己生成
        // let res;
        // try {
        //     let result = jwt.verify(token) || {};
        //     let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
        //     if (current <= exp) {
        //         res = result.data || {};
        //     }
        // } catch (e) {
        //     res = 'err';
        // }
        // return res;
        console.log(jwt);
        jwt.verify(token, secret, function (err, data) {
            if (err) {console.log(err);}
            else{
                console.log('解析的数据', data);
                id=data;
            }
        })
        return id;
    }
}

module.exports = Jwt;