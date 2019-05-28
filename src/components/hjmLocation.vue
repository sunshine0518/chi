<template>
    <div id="container"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://webapi.amap.com/maps?v=1.4.6&key=58c724b5641c3029776eb71a472b1150"; // 高德地图
    document.body.appendChild(script);
  },
  methods: {
    onLocation() {
      let _this = this;
      /***************************************
        由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
        ***************************************/
      let map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true
      });
      map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB"
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
      //解析定位结果
      function onComplete(data) {
        let resData = {
          longitude: data.position.getLng(), //经度
          latitude: data.position.getLat(), //维度
          detailAddress: data.formattedAddress || "", //详细地址
          detailAreaCode: data.addressComponent.adcode || "" //所在城市编号
        };
        //抛出一个方法用来进行数据操作
        _this.$emit("getResData", resData);
      }
      //解析定位错误信息
      function onError(data) {
        alert("定位失败请输入详细地址信息");
      }
    }
  }
};
</script>


