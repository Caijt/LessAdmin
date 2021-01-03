<template>
  <div>
    <el-table v-loading="loading" ref="table" :data="data">
      <el-table-column type="index" label="#" width="40" align="center"></el-table-column>
      <el-table-column label="考核类型" width="150" prop="kpiItemType"></el-table-column>
      <el-table-column label="考核描述" min-width="100" prop="kpiItemDescription"></el-table-column>
      <el-table-column label="考核满分" width="100"  align="center" prop="kpiItemScore"></el-table-column>
      <el-table-column label="考核打分" width="120"  align="center">
        <template slot-scope="{row}">
          <el-input-number v-model="row.score" :min="0" :max="row.kpiItemScore" controls-position="right" style="width:100%"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "@/api/hr/kpiManage";
export default {
  components: {  },
  props: {

  },
  data() {
    return {
      data: [],    
      loading: false
    };
  },
  methods: {
    getData(params) {
      this.loading = true;
      api.getScoreList(params).then(res => {
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