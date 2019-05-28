const crypto = require('crypto');
var md5 = crypto.createHash('md5'); 
class  md{
    constructor(data) {
        this.data = data;
    }
    jiami(){
        let str=this.data;
        md5.update(str);
        var sign = md5.digest('hex');
        return sign;
    }
    jiemi(){
        let str=this.data;
        var verifysign = crypto.createHash('md5').update(str, 'utf8').digest("hex");
        return verifysign;
    }
}
module.exports = md;
