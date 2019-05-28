<template>
    <div id="editAddress">
      <van-cell-group>
        <van-cell class="btn_box">
           <van-button class="location_btn" size="small" @click="onLocation()">获取当前定位</van-button>
        </van-cell>
        <van-cell class="showAlert" title="所在地区" :value="address" is-link @click="showPopup()"/>
        <van-field v-model="detail_address" label="联系地址" type="textarea" placeholder="请输入详细地址，如街道、小区、楼栋号、单元室等" rows="3" autosize/>
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :lazy-render="false">
        <van-area ref="van_area" :area-list="areaList"  @confirm="onConfirm" @cancel="onCancel()" :value="detail_area"/>
      </van-popup>
      <hjm-location ref="location" @getResData='getResData($event)'></hjm-location>
    </div>
</template>
<script>
import { setTimeout } from "timers";
import hjmLocation from "./hjmLocation.vue";
export default {
  data() {
    return {
      address: "",
      detail_address: "",
      detail_area: "",
      show: false,
      areaList: {}
    };
  },
  created() {
    this.areaList = cityCode;
  },
  components: {
    hjmLocation
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value) {
      this.address = "";
      value.forEach(a => {
        this.address += `${a.name}  `;
      });
      this.onCancel();
    },
    onCancel() {
      this.show = false;
    },
    onLocation() {
      this.$refs.location.onLocation();
    },
    getResData(resData) {
      this.detail_address = resData.detailAddress;
      this.detail_area = resData.detailAreaCode;
      setTimeout(() => {
        //获取van-area的value值
        let _value = this.$refs.van_area.getValues();
        this.onConfirm(_value);
      }, 100);
    }
  }
};
</script>


<style scoped>
#editAddress {
  height: 100%;
}
</style>
<style>
#editAddress .btn_box .van-cell__value {
  text-align: right;
}
#editAddress .showAlert .van-cell__value {
  text-align: left;
  flex: 3;
}
</style>


