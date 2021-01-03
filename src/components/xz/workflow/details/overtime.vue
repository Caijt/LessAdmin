<template>
  <div>
    <el-form-item label="加班时间">{{data.beginTime}} 至 {{data.endTime}}</el-form-item>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="加班时长">{{data.duration}}</el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="加班原因">{{data.reason}}</el-form-item>
    <el-form-item label="附件" class="no-border">
      <attach-list ref="attachList" :guid="data.guid" card/>
    </el-form-item>
  </div>
</template>
<script>
import attachList from "@/components/common/attach/list";
export default {
  components:{
    attachList
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    setData(data) {
      this.data = { ...data };
      this.$nextTick(()=>{
        this.$refs.attachList.getData();
      })
    },
    reset(){
      this.$refs.attachList.clear();
      this.data = {};
    }
  }
};
</script>