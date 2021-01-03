<template>
  <common-dialog
    ref="dialog"
    class="c-print-dialog"
    width="1000px"
    title="客户数据分析打印"
    :inDialog="inDialog"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <div class="no-print">
      <el-alert type="success">建议先在浏览器进行打印预览，调整无误后再进行打印。</el-alert>
      <div class="c-h10"></div>
    </div>
    <table class="c-table" style="text-align:center;line-height:1.5">
      <tr>
        <th>日期</th>
        <th>客户类型</th>
        <th>合同数量</th>
        <th>同期合同数量</th>
        <th>合同金额</th>
        <th>同期合同金额</th>
      </tr>
      <tr v-for="(row,index) in rows" :key="index">
        <td>{{row.year}}{{row.month==0?'':'-'+row.month}}</td>
        <td>{{row.customerTypeName||"-"}}</td>
        <td>{{row.newAmount}}</td>
        <td>{{row.lastAmount||"-"}}</td>
        <td>{{row.newNumber}}</td>
        <td>{{row.lastNumber||"-"}}</td>
      </tr>
    </table>
    <template slot="footer">
      <el-button icon="el-icon-printer" type="primary" @click="print">打印</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      rows: []
    };
  },
  methods: {
    onClosed() {
      this.rows = [];
    },
    print() {
      window.print();
    }
  }
};
</script>