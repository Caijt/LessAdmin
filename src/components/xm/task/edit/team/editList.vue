<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="班组名称" min-width="100" prop="teamName"></el-table-column>
      <el-table-column label="实施人数" width="140" align="center" prop="amount">
        <template slot-scope="{row}">
          <el-input-number
            v-model="row.amount"
            :min="1"
            controls-position="right"
            style="width:90px"
          />
        </template>
      </el-table-column>
      <el-table-column label="负责" width="100" prop="isLead" align="center">
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
    <team-dialog
      ref="teamDialog"
      :in-dialog="inDialog"
      selectable
      multiple
      @select-multiple="onSelect"
    >
      <template slot="toolbar-left">
        <el-button @click="openTeamStatus">班组任务查询</el-button>
      </template>
    </team-dialog>
     <team-status-dialog in-dialog ref="teamStatusDialog"/>
  </div>
</template>
<script>
import teamDialog from "@/components/hr/department/team/listDialog";
import teamStatusDialog from "@/components/xm/taskTeam/taskStatus/listDialog";
export default {
  components: { teamDialog, teamStatusDialog },
  props: {
    inDialog: {
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
      let notIds = this.data.map(item => item.teamId);
      this.$refs.teamDialog.open().then(that => {
        that.getData({ notIds });
      });
    },
    clear() {
      this.data = [];
    },
    remove(index) {
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
    setData(data) {
      this.data = data;
    },
    onSelect(data) {
      data.forEach(item => {
        this.data.push({
          teamId: item.id,
          teamName: item.name,
          amount: 1,
          isLead: false
        });
      });
    },
    onChange(data) {
      this.data.forEach(item => {
        if (item.teamId != data.teamId) {
          item.isLead = false;
        }
      });
    },
    openTeamStatus() {
      this.$refs.teamStatusDialog.open().then(that=>{
        that.query({
          implementEndDateBegin:this.$commonJs.getNowDateString()
        });
      })
    }
  }
};
</script>