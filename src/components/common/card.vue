<template>
  <div class="_card-container" :style="{backgroundColor:color}">
    <div class="_header">
      <div class="_title">{{title}}</div>
      <div class="_text">{{text}}</div>
    </div>
    <div class="_icon" v-if="icon!=undefined">
      <el-icon :class="icon"></el-icon>
    </div>
    <div class="_footer" v-if="details" @click="()=>$emit('details-click')">
      查看详情
      <el-icon class="el-icon-d-arrow-right"></el-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: [String,Number],
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    details:{
      type:Boolean,
      default:false
    },
    color: {
      type: String,
      default: "#00c0ef"
    }
  }
};
</script>
<style lang="scss">
._card-container {
  color: #fff;
  border-radius: 4px;
  position: relative;
  display: block;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  ._text {
    margin: 0 0 10px;
    font-size: 15px;
  }
  ._header {
    padding: 10px;
    ._title {
      font-size: 42px;
      font-weight: bold;
      margin: 0 0 10px 0;
      white-space: nowrap;
      padding: 0;
    }
  }
  ._icon {
    font-size: 80px;
    -webkit-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    transition: all 0.3s linear;
    position: absolute;
    top: 0px;
    right: 10px;
    z-index: 0;
    font-size: 90px;
    color: rgba(0, 0, 0, 0.15);
  }
  ._footer {
    cursor: pointer;
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255, 255, 255, 0.8);
    display: block;
    z-index: 10;
    background: rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
}
._card-container:hover ._icon {
  font-size: 95px;
}
</style>