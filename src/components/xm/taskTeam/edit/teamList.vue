<template>
  <div>
    <el-table style="margin:5px 0px" v-loading="loading" ref="table" :data="data">
      <el-table-column label="#" width="50" type="index" align="center"></el-table-column>
      <el-table-column label="分派班组" min-width="100" prop="teamName"></el-table-column>
      <el-table-column label="是否负责" width="100" prop="isLead" align="center">
        <template slot-scope="{row}">
          <el-tag type="danger" v-if="row.isLead">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="实施人数" width="100" align="center" prop="amount"></el-table-column>
      <el-table-column label="分派状态" width="100" align="center">
        <template slot-scope="{row}">
          <span class="c-link" v-if="row.isAssigned" @click="openEmployeeDialog(row)">已分派</span>
          <span v-else>（未分派）</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row}">
          <el-button
            type="text"
            @click="assign(row)"
            :disabled="!row.canAssign"
          >{{row.isAssigned?"更改":"分派"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog :in-dialog="inDialog" ref="editDialog" @close-saved="reload" />
    <team-employee-dialog :show-toolbar="false" :in-dialog="inDialog" ref="teamEmployeeDialog" @close-saved="reload" />
  </div>
</template>
<script>
import editDialog from "./employee/editDialog";
import api from "@/api/xm/taskTeam";
import teamEmployeeDialog from "@/components/xm/taskTeamEmployee/listDialog";
export default {
  components: { editDialog, teamEmployeeDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      loading: false,
      params: null
    };
  },
  methods: {
    reload(data) {
      this.getData(this.params);
      this.$emit("saved");
    },
    assign(row) {
      this.$refs.editDialog.openEdit({ ...row });
    },
    clear() {
      this.data = [];
    },
    getData(data) {
      this.params = data;
      this.loading = true;
      api.getAssignTeamList(data).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    openEmployeeDialog(row) {
      this.$refs.teamEmployeeDialog.open().then(that => {
        that.getData({ taskTeamId: row.id });
      });
    }
  }
};
</script>