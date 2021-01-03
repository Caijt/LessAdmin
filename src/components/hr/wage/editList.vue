<template>
  <div>
    <list
      show-checkbox
      show-index
      ref="list"
      local-delete
      :confirm-on-delete="false"
      :page="false"
      :border="false"
      :show-query="false"
    >
      <template slot="toolbar-left">
        <el-button @click="deleteBatch">删除</el-button>
      </template>
      <template slot="toolbar-right">
        <el-button @click="print" icon="el-icon-printer">打印</el-button>
      </template>
      <template slot="column">
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
            <template slot-scope="{row}">
              <el-input-number
                v-model="row.payItems[index].wageItemMoney"
                :controls="false"
                style="width:100%"
              />
            </template>
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
            <template slot-scope="{row}">
              <el-input-number
                v-model="row.deductItems[index].wageItemMoney"
                :controls="false"
                style="width:100%"
              />
            </template>
          </el-table-column>
          <el-table-column label="应扣合计" align="right" width="100">
            <template slot-scope="{row}">￥{{getDeductTotal(row)}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="实税工资" align="right" width="100">
          <template slot-scope="{row}">￥{{getWageTotal(row)}}</template>
        </el-table-column>
        <el-table-column label="税额" align="center" width="100">
          <template slot-scope="{row}">
            <el-input-number v-model="row.taxMoney" :controls="false" style="width:100%" />
          </template>
        </el-table-column>
        <el-table-column label="实发工资" align="right" min-width="100">
          <template slot-scope="{row}">￥{{getRealWageTotal(row)}}</template>
        </el-table-column>
      </template>
    </list>
    <print-dialog in-dialog ref="printDialog" />
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";
import wageSelect from "@/components/hr/wageItem/select";
import printDialog from "./printDialog";

export default {
  mixins: [listMixins],
  components: { list, wageSelect, printDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      payItems: [],
      deductItems: []
    };
  },
  methods: {
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
    //应税工资
    getWageTotal(row) {
      let total = 0;
      row.payItems.forEach(item => {
        total += (item.wageItemMoney || 0);
      });
      row.deductItems.forEach(item => {
        total -= (item.wageItemMoney || 0);
      });
      row.money = total;
      return total;
    },
    //实发工资
    getRealWageTotal(row) {
      return this.getWageTotal(row) - (row.taxMoney || 0);
    },
    print() {
      this.$refs.printDialog.openEdit(this.$refs.list.data);
    }
  }
};
</script>