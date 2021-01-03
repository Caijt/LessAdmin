<template>
  <div>
    <el-alert
      title="警告"
      type="warning"
      show-icon
      description="此功能为开发人员配置菜单及接口权限，非开发人员请勿随便修改，否则会导致系统及相关权限出错！"
    ></el-alert>
    <div class="c-h-10p"></div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create()" type="primary" :disabled="!$permission.canWrite()">创建菜单</el-button>
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
          <el-button size="mini" type="text" icon="el-icon-plus" @click="create(row)" :disabled="row.isPage"/>
          <el-button size="mini" type="text" icon="el-icon-edit" @click="editById(row.id)" />
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/sys/menu/list";
import editDialog from "@/components/sys/menu/editDialog";
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
      if (row.parentId != null) {
        this.$refs.list.sourceData.forEach(item => {
          if (item.id == row.parentId) {
            row.parentId = item.id;
            row.parentName = item.name;
          }
        });
      }
      this.$refs.editDialog.openEdit(row);
    },
    del(row) {
      this.$refs.list.delete(row).then(() => {
        this.reload();
      });
    }
  }
};
</script>