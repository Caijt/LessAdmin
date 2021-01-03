<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="reload">
      <el-tab-pane label="待考核" name="todo"></el-tab-pane>
      <el-tab-pane label="已考核" name="done"></el-tab-pane>
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
          <el-button size="mini" type="text" @click="edit(row)" :disabled="row.handleTime!=null">考核</el-button>
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/hr/kpiManage/list";
import editDialog from "@/components/hr/kpiManage/editDialog";
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
      this.$refs.list.getData({
        isSubmit: this.tabName == "todo" ? false : true
      });
    }
  }
};
</script>