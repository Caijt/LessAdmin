<template>
  <common-dialog
    class="c-print-dialog"
    ref="dialog"
    width="1000px"
    title="工资单打印"
    :inDialog="inDialog"
    :data="data"
    @edit-opened="onEditOpened"
    @closed="onClosed"
    @close-saved="$emit('close-saved')"
  >
    <el-table :data="tableData">
      <el-table-column label="#" type="index" align="center" width="40"></el-table-column>
      <el-table-column label="员工姓名" prop="employeeName" width="100"></el-table-column>
      <el-table-column label="部门" prop="depName" width="100"></el-table-column>
      <el-table-column label="工资应发项" align="center" v-if="payItems.length>0">
        <el-table-column
          width="100"
          align="center"
          :label="item.wageItemName"
          v-for="(item,index) in  payItems"
          :key="index"
        >
          <template slot-scope="{row}">￥{{row.payItems[index].wageItemMoney}}</template>
        </el-table-column>
        <el-table-column label="应发合计" align="right" width="100">
          <template slot-scope="{row}">￥{{getPayTotal(row)}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="工资应扣项" align="center" v-if="deductItems.length>0">
        <el-table-column
          width="100"
          align="center"
          :label="item.wageItemName"
          v-for="(item,index) in  deductItems"
          :key="index"
        >
          <template slot-scope="{row}">￥{{row.deductItems[index].wageItemMoney}}</template>
        </el-table-column>
        <el-table-column label="应扣合计" align="right" width="100">
          <template slot-scope="{row}">￥{{getDeductTotal(row)}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="实发工资" align="right" min-width="100">
        <template slot-scope="{row}">￥{{getTotal(row)}}</template>
      </el-table-column>
    </el-table>
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
      data: {},
      payItems: [],
      deductItems: [],
      tableData: [],
      unit: "工资单"
    };
  },
  computed: {},
  methods: {
    onEditOpened(data) {
      this.setHeader(data);
      this.tableData = data;
    },
    setHeader(data) {
      if (data.length > 0) {
        this.payItems = data[0].payItems;
        this.deductItems = data[0].deductItems;
      }
    },
    getPayTotal(row) {
      let total = 0;
      row.payItems.forEach(item => {
        total += item.wageItemMoney;
      });
      return total;
    },
    getDeductTotal(row) {
      let total = 0;
      row.deductItems.forEach(item => {
        total += item.wageItemMoney;
      });
      return total;
    },
    getTotal(row) {
      let total = 0;
      row.payItems.forEach(item => {
        total += item.wageItemMoney;
      });
      row.deductItems.forEach(item => {
        total -= item.wageItemMoney;
      });
      row.money = total;
      return total;
    },
    onClosed() {}
  }
};
</script>
<style>
@media print {
  .print-dialog {
    width: 1000px;
  }
}
</style>