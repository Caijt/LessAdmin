<template>
  <div>
    <div style="display:flex;width:100%">
      <tree
        ref="tree"
        @node-click="onNodeClick"
        style="width:180px;flex-shrink:0;margin-right:10px"
      />
      <list ref="list" style="flex:1;overflow:hidden" :disabled="!$permission.canRead()">
        <template slot="toolbar-left">
          <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建员工档案</el-button>
        </template>
        <template slot="toolbar-right">
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="!$permission.canRead()"
            @click="openDeleteDialog"
          >回收站</el-button>
        </template>
        <el-table-column
          slot="table"
          label="操作"
          fixed="right"
          align="center"
          width="80"
          v-if="$permission.canWrite()"
        >
          <template slot-scope="{row}">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
            <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
          </template>
        </el-table-column>
      </list>
    </div>
    <edit-dialog ref="editDialog" @close-saved="reload" />
    <delete-dialog is-delete ref="deleteDialog" />
  </div>
</template>
<script>
import list from "@/components/hr/employee/list";
import editDialog from "@/components/hr/employee/editDialog";
import tree from "@/components/hr/department/tree";
import curdMixins from "@/mixins/curd";
import deleteDialog from "@/components/hr/employee/listDialog";

export default {
  components: {
    tree,
    list,
    editDialog,
    deleteDialog
  },
  mixins: [curdMixins],
  mounted() {
    this.$refs.tree.getData();
  },
  methods: {
    onNodeClick(data, node) {
      this.$refs.list.queryParams.depId = data.id;
      this.$refs.list.queryParamsLabel.depName = data.name;
      this.$refs.list.query();
    },
    openDeleteDialog() {
      this.$refs.deleteDialog.open().then(that => {
        that.getData();
      });
    }
  }
};
</script>