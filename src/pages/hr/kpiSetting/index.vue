<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建绩效考核</el-button>
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
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
          <el-tooltip content="复制">
            <el-button size="mini" type="text" icon="el-icon-document-copy" @click="copy(row)" />
          </el-tooltip>          
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/hr/kpiSetting/list";
import editDialog from "@/components/hr/kpiSetting/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  methods:{
    copy(row){
      this.$refs.editDialog.openCopy(row);
    }
  }
};
</script>