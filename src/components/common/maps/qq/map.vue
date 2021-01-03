<template>
  <div>
    <div style="display:flex;margin-bottom:5px">
      <div style="flex:auto">
        <div style="font-size:12px;line-height:28px">
          当前地址：
          <el-button type="text" @click="goCenter">{{address}}</el-button>
        </div>
      </div>
      <div style="flex:none">
        <el-input
          v-show="selectable"
          v-model="addressKeyword"
          placeholder="地址关键字"
          style="width:180px"
          @keyup.enter.native="search()"
        >
          <el-button icon="el-icon-search" slot="append" @click="search()"></el-button>
        </el-input>
      </div>
    </div>
    <div ref="mapContainer" :style="{width,height}" style="border:1px solid #dcdfe6"></div>
  </div>
</template>
<script>
/*
城市服务 CityService 

cs.searchCityByIP('61.135.172.68');

地址解析 Geocoder
var callbacks={
    complete:function(results){
        map.setCenter(result.detail.location);
        var marker = new qq.maps.Marker({
            map:map,
            position: result.detail.location
        });
    },
}
geocoder = new qq.maps.Geocoder(callbacks);
geocoder.getLocation("中国,北京,海淀区,海淀大街38号");
*/
// import maps from "qqmap"
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    selectable: {
      type: Boolean,
      default: true
    },
    //初始化中心坐标点 { lat,lng }
    initCenterLocation: {
      type: Object,
      default: undefined
    },
    initZoom: {
      type: Number,
      default: 11
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      map: null,
      marker: null,
      geocoder: null,
      cityService: null,
      addressKeyword: "",
      address: ""
    };
  },
  methods: {
    init() {
      let center;
      if (this.initCenterLocation) {
        center = new qq.maps.LatLng(
          this.initCenterLocation.lat,
          this.initCenterLocation.lng
        );
      } else {
        center = new qq.maps.LatLng(39.916527, 116.397128);
      }
      let map = new qq.maps.Map(this.$refs.mapContainer, {
        // 地图的中心地理坐标。
        center,
        zoom: this.initZoom
      });
      let marker = new qq.maps.Marker({
        //设置Marker的位置坐标
        position: center,
        //设置显示Marker的地图
        map
      });
      //坐标地址解析服务
      let geocoder = new qq.maps.Geocoder();
      geocoder.setComplete(result => {
        console.log(result);
        this.address = result.detail.address;
        // 这个字段有值的话，说明是搜索关键字到坐标，那得设置marker，并设置中心点
        if (result.detail.gps_type) {
          map.setCenter(result.detail.location);
          map.setZoom(13);
          marker.setPosition(result.detail.location);
        }
      });
      geocoder.setError(e => {
        this.$message.error("找不到对应的地址信息");
      });
      geocoder.getAddress(center);
      //地图点击事件
      qq.maps.event.addListener(map, "click", e => {
        if (this.selectable) {
          this.address = "";
          marker.setPosition(e.latLng);
          geocoder.getAddress(e.latLng);
        }
      });
      //城市服务
      let cityService = new qq.maps.CityService();
      cityService.setComplete(result => {
        map.setZoom(13);
        map.setCenter(result.detail.latLng);
        marker.setPosition(result.detail.latLng);
        geocoder.getAddress(result.detail.latLng);
      });
      this.map = map;
      this.marker = marker;
      this.geocoder = geocoder;
      this.cityService = cityService;
    },
    //设置坐标位置
    setLocation(location) {
      let latLng = new qq.maps.LatLng(location.lat, location.lng);
      this.map.setCenter(latLng);
      this.map.setZoom(13);
      this.marker.setPosition(latLng);
      this.geocoder.getAddress(latLng);
    },
    getLocation() {
      return this.marker.getPosition();
    },
    getAddress() {
      return this.address;
    },
    search(keyword = null) {
      if (keyword) {
        this.addressKeyword = keyword;
      }
      this.geocoder.getLocation(this.addressKeyword);
    },
    goCenter() {
      this.map.setCenter(this.marker.getPosition());
    },
    goLocalCity() {
      this.cityService.searchLocalCity();
    }
  }
};
</script>
