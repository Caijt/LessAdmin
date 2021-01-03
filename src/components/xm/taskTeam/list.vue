<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="分派班组记录"
      :disabled="disabled"
      :border="false"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :show-toolbar="showToolbar"
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-list-func="api.getList"
    >
      <template slot="column">
        <el-table-column label="分派班组" min-width="100" prop="teamName"></el-table-column>
        <el-table-column label="是否负责" width="100" prop="isLead" align="center">
          <template slot-scope="{row}">
            <el-icon v-if="row.isLead" class="el-icon-check"></el-icon>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="实施人数" width="100" align="center" prop="amount"></el-table-column>
        <el-table-column label="分派状态" width="100" align="center">
          <template slot-scope="{row}">
            <span class="c-link" v-if="row.isAssigned" @click="openEmployeeDialog(row)">已分派</span>
            <span v-else>（未分派）</span>
          </template>
        </el-table-column>
      </template>
    </list>
    <team-employee-dialog :show-toolbar="false" :in-dialog="inDialog" ref="teamEmployeeDialog" />
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";
import api from "@/api/xm/taskTeam";
import teamEmployeeDialog from "@/components/xm/taskTeamEmployee/listDialog";

export default {
  components: { list, teamEmployeeDialog },
  mixins: [listMixins],
  data() {
    return {
      api,
      queryParams: {}
    };
  },
  methods: {
    openEmployeeDialog(row) {
      this.$refs.teamEmployeeDialog.open().then(that => {
        that.getData({ taskTeamId: row.id });
      });
    }
  }
};
</script>