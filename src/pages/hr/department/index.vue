<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create()" type="primary" :disabled="!$permission.canWrite()">创建部门</el-button>
      </template>
      <el-table-column
        slot="column"
        label="操作"
        fixed="right"
        align="center"
        width="100"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-plus" @click="create(row)" />
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/hr/department/list";
import editDialog from "@/components/hr/department/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  methods: {
    create(row = null) {
      this.$refs.editDialog.open().then(that => {
        if (row) {
          that.setParent(row);
        }
      });
    },
    edit(row) {
      let parent = null;
      if (row.parentId != null) {
        this.$refs.list.sourceData.forEach(item => {
          if (item.id == row.parentId) {
            parent = item;
          }
        });
      }
      this.$refs.editDialog.openEdit(row).then(that => {
        if (parent) {
          that.setParent(parent);
        }
      });
    },
    del(row) {
      if (row.children) {
        this.$message.warning("当前部门还有子部门，无法删除！");
        return false;
      }
      this.$refs.list.delete(row).then(() => {
        this.reload();
      });
    }
  }
};
</script>