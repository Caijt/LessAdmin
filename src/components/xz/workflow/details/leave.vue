<template>
  <div>
    <el-form-item label="请假时间">{{data.beginTime}} 至 {{data.endTime}}</el-form-item>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="请假类型">{{api.leaveTypes[data.type]}}</el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="请假原因">{{data.reason}}</el-form-item>
    <el-form-item label="附件" class="no-border">
      <attach-list ref="attachList" :guid="data.guid" card />
    </el-form-item>
  </div>
</template>
<script>
import attachList from "@/components/common/attach/list";
import api from "@/api/xz/workflow";

export default {
  components: {
    attachList
  },
  data() {
    return {
      data: {},
      api
    };
  },
  methods: {
    setData(data) {
      this.data = { ...data };
      this.$nextTick(() => {
        this.$refs.attachList.getData();
      });
    },
    reset() {
      this.$refs.attachList.clear();
      this.data = {};
    }
  }
};
</script>