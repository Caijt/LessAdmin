<template>
  <common-dialog
    ref="dialog"
    width="500px"
    title="已阅人员"
    :inDialog="inDialog"
    :get-data-func="getData"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
    @opened="onOpened"
  >
    <el-table :data="data" v-loading="showLoading">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="姓名" prop="employeeName"></el-table-column>
      <el-table-column label="部门" prop="depName"></el-table-column>
      <el-table-column label="阅读时间">
        <template slot-scope="{row}">{{row.readTime | toShortDatetimeString}}</template>
      </el-table-column>
    </el-table>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/notice";
export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      data: [],
      api,
      showLoading:false
    };
  },
  methods: {
    onClosed() {
      this.data = [];
    },
    getData(data) {
      this.showLoading = true;
      api.getReadEmployeeList(data).then(res => {
        this.data = res.data;
        this.showLoading = false;
      });
    },
    onOpened(data){
      this.getData(data);
    }
  }
};
</script>