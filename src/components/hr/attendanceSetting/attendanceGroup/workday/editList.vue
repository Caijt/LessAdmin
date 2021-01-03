<template>
  <div>
    <div style="display:flex;">
      <div style="flex:1">
        <el-button @click="setShiftBatch" type="primary">批量更改班次</el-button>
      </div>
      <div style="flex:0">       
        <slot></slot>
      </div>
    </div>
    <el-table v-loading="loading" ref="table"  :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column label="工作日" width="60" align="center" prop="week">
        <template slot-scope="{row}">{{weekNames[row.week]}}</template>
      </el-table-column>
      <el-table-column label="考勤班次时间">
        <template
          slot-scope="{row}"
        >{{row.isChecked?(row.attendanceShiftId?row.shiftDescription:"未选择"):"休息"}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="setShift(row)">更改班次</el-button>
        </template>
      </el-table-column>
    </el-table>
    <shift-dialog in-dialog ref="shiftDialog" select @select="onSelect" />
  </div>
</template>
<script>
import shiftDialog from "@/components/hr/attendanceSetting/attendanceShift/listDialog";
import api from "@/api/hr/attendanceGroup"
export default {
  components: {
    shiftDialog
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    sourceEmployeeId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        week: i,
        attendanceShiftId: null,
        shiftDescription: "",
        isChecked: false
      });
    }
    return {
      data,
      weekNames: api.weekNames,
      checkedRows: [],
      loading: false,
      selectedItem: null
    };
  },
  methods: {
    getData(params) {
      this.loading = true;
      api.getNodeList(params).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    reset() {
      this.data.forEach(item => {
        item.attendanceShiftId = null;
      });
      this.$refs.table.clearSelection();
    },
    setShift(row) {
      this.selectedItem = row;
      this.$refs.shiftDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setShiftBatch() {
      if (this.checkedRows.length == 0) {
        this.$message.warning("请勾选工作日");
        return false;
      }
      this.setShift(null);
    },
    onCheckedChange(rows) {
      this.data.forEach(item => {
        if (rows.some(item2 => item2 == item)) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
      });
      this.checkedRows = rows;
    },
    setData(data) {
      data.forEach(item => {
        let d = this.data[item.week];
        d.attendanceShiftId = item.attendanceShiftId;
        d.shiftDescription = item.shiftDescription;
        this.$refs.table.toggleRowSelection(d, true);
      });
    },
    onSelect(data) {
      if (this.selectedItem) {
        this.selectedItem.attendanceShiftId = data.id;
        this.selectedItem.shiftDescription =
          data.name + ":" + data.timeDescription;
        this.$refs.table.toggleRowSelection(this.selectedItem, true);
      } else {
        this.checkedRows.forEach(item => {
          item.attendanceShiftId = data.id;
          item.shiftDescription = data.name + ":" + data.timeDescription;
          this.$refs.table.toggleRowSelection(item, true);
        });
      }
    }
  }
};
</script>