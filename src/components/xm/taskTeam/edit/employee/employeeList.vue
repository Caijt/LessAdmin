<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table
      v-loading="loading"
      style="margin:5px 0"
      ref="table"
      :data="data"
      @selection-change="onCheckedChange"
    >
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column type="index" width="40" label="#" align="center"></el-table-column>
      <el-table-column label="人员" min-width="100" prop="employeeName"></el-table-column>
      <el-table-column label="负责" width="100" prop="isLead" align="center" v-if="showLeadColumn">
        <template slot-scope="{row}">
          <el-switch v-model="row.isLead" @change="onChange(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <employee-dialog
      ref="employeeDialog"
      :in-dialog="inDialog"
      selectable
      multiple
      @select-multiple="onSelect"
    >
      <template slot="toolbar-left">
        <el-button type="warning">班组任务查询</el-button>
      </template>
    </employee-dialog>
  </div>
</template>
<script>
import employeeDialog from "@/components/hr/employee/listDialog";
import api from "@/api/xm/taskTeam";
export default {
  components: { employeeDialog },
  props: {
    teamId: {},
    inDialog: {
      type: Boolean,
      default: false
    },
    showLeadColumn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      checkedRows: [],
      loading: false
    };
  },
  methods: {
    add() {
      let notIds = this.data.map(item => item.employeeId);
      this.$refs.employeeDialog.open().then(that => {
        that.getData({ notIds, depId: this.teamId });
      });
    },
    clear() {
      this.data = [];
    },
    remove(index) {
      this.$emit("change");
      this.data.splice(index, 1);
    },
    removeBatch() {
      this.checkedRows.forEach(item => {
        let index = this.data.indexOf(item);
        this.remove(index);
      });
    },
    onCheckedChange(rows) {
      this.checkedRows = rows;
    },
    getData(data) {
      this.loading = true;
      api.getTeamEmployeeList(data).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    onSelect(data) {
      data.forEach(item => {
        this.data.push({
          employeeId: item.id,
          employeeName: item.name,
          isLead: false
        });
      });
      this.$emit("change");
    },
    onChange(data) {
      this.$emit("change");
      this.data.forEach(item => {
        if (item.employeeId != data.employeeId) {
          item.isLead = false;
        }
      });
    }
  }
};
</script>