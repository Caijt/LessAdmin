<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="onTabClick">
      <el-tab-pane label="待实施&实施中" name="todo"></el-tab-pane>
      <el-tab-pane label="已完成" name="done"></el-tab-pane>
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
          <el-button size="mini" type="text" @click="edit(row)">记录</el-button>
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xm/taskImplement/taskList";
import editDialog from "@/components/xm/taskImplement/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  data() {
    return {
      tabName: "todo"
    };
  },
  methods: {
    reload() {
      this.$refs.list.getData({ isImplementFinish: this.tabName != "todo" });
    },
    onTabClick() {
      this.reload();
    }
  }
};
</script>