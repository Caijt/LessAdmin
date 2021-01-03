<template>
  <div v-loading="loading">
    <el-carousel trigger="click" height="20vh">
      <el-carousel-item v-for="item in 3" :key="item">
        <el-image :src="'/bg/'+item+'.jpg'" fit="cover" style="height:20vh;width:100%;"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-button @click="test">test</el-button>
    <edit-dialog ref="editDialog" />
  </div>
</template>
<script>
import editDialog  from "@/components/xz/notice/editDialog";
export default {
  name: "index",
  components: { editDialog },
  data() {
    return {
      loading: false,
      homeStatistic: {
        followUpBusinessAmount: 0,
        newBusinessAmount: 0,
        newCustomerAmount: 0,
        newEmployeeAmount: 0,
        toApprovalAmount: 0,
        regularEmployeeAmount: 0,
        expireRegularEmployeeAmount: 0,
        dimissionEmployeeAmount: 0,
        expireQualificationAmount: 0,
        outCarAmount: 0,
        notices: []
      }
    };
  },
  created() {},
  methods: {
    goBusiness() {
      this.$router.push("/yx/business");
    },
    openNoticeDetails(noticeId) {
      this.$refs.noticeDetails.openDetailsById(noticeId);
    },
    test(){
      this.$refs.editDialog.openEdit({
        content:"<b>asdf</b>123"
      })
    }
  }
};
</script>