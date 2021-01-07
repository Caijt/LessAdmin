<template>
  <div v-loading="loading">
    <el-carousel trigger="click" height="180px">
      <el-carousel-item v-for="item in 3" :key="item">
        <el-image :src="'/bg/'+item+'.jpg'" fit="cover" style="height:100%;width:100%;"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-button @click="test">test</el-button>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      loading: false,
      // homeStatistic: {
      //   followUpBusinessAmount: 0,
      //   newBusinessAmount: 0,
      //   newCustomerAmount: 0,
      //   newEmployeeAmount: 0,
      //   toApprovalAmount: 0,
      //   regularEmployeeAmount: 0,
      //   expireRegularEmployeeAmount: 0,
      //   dimissionEmployeeAmount: 0,
      //   expireQualificationAmount: 0,
      //   outCarAmount: 0,
      //   notices: []
      // }
    };
  },
  created() {},
  methods: {
    test(){
      this.$router.push("/sys/user?a=b");
    }
  }
};
</script>