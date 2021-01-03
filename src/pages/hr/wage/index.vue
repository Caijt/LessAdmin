<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建工资单</el-button>
      </template>
      <el-table-column
        slot="column"
        label="操作"
        fixed="right"
        align="center"
        width="80"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="editById(row.id)" />
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <create-dialog ref="createDialog" @close-saved="reload" />
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/hr/wage/list";
import createDialog from "@/components/hr/wage/createDialog";
import editDialog from "@/components/hr/wage/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    editDialog,
    createDialog
  },
  mixins: [curdMixins],
  methods: {
    editById(id) {
      this.$refs.editDialog.openEditById(id);
    },
    create() {
      this.$refs.createDialog.openCreate();
    }
  }
};
</script>