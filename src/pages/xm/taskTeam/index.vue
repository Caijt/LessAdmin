<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="onTabClick">
      <el-tab-pane label="待分派" name="todo"></el-tab-pane>
      <el-tab-pane label="已分派" name="done"></el-tab-pane>
    </el-tabs>
    <list ref="list" :disabled="!$permission.canRead()">
      <el-table-column
        slot="column"
        label="操作"
        fixed="right"
        align="center"
        width="80"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button size="mini" type="text" @click="assign(row)">{{tabName=="todo"?"分派":"更改"}}人员</el-button>
        </template>
      </el-table-column>
    </list>
    <assign-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xm/taskTeam/taskList";
import assignDialog from "@/components/xm/taskTeam/assignDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    assignDialog
  },
  mixins: [curdMixins],
  data() {
    return {
      tabName: "todo"
    };
  },
  methods: {
    reload() {
      this.$refs.list.getData({ isTeamAssign: this.tabName != "todo" });
    },
    onTabClick() {
      this.reload();
    },
    assign(row) {
      this.$refs.editDialog.openDetailsById(row.id);
    }
  }
};
</script>