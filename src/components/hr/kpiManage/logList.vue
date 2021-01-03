<template>
  <div>
    <el-table v-loading="loading" ref="table" :data="data">
      <el-table-column type="index" label="#" width="40" align="center"></el-table-column>
      <el-table-column label="考核人" width="150" prop="handleEmployeeName"></el-table-column>
      <el-table-column label="考核分数" align="center" prop="scoreTotal"></el-table-column>
      <el-table-column label="考核时间" width="140"  prop="handleTime">
        <template slot-scope="{row}">{{row.handleTime|toShortDatetimeString}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "@/api/hr/kpiManage";
export default {
  components: {},
  props: {},
  data() {
    return {
      data: [],
      loading: false
    };
  },
  methods: {
    getData(params) {
      this.loading = true;
      api.getLogList(params).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    clear() {
      this.data = [];
    }
  }
};
</script>