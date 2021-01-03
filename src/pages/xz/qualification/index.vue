<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建资质</el-button>
      </template>
      <template slot="column">
        <el-table-column label="借用记录" align="center" width="80">
          <template slot-scope="{row}">
            <el-button size="mini" type="text" @click="useRecord(row)">管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
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
      </template>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
    <borrow-record-dialog ref="borrowRecordDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xz/qualification/list";
import editDialog from "@/components/xz/qualification/editDialog";
import borrowRecordDialog from "@/components/xz/qualification/borrowRecordDialog";
import curdMixins from "@/mixins/curd";
export default {
  components: {
    list,
    editDialog,
    borrowRecordDialog
  },
  mixins: [curdMixins],
  methods: {
    useRecord(row) {
      this.$refs.borrowRecordDialog.openDetailsById(row.id);
    }
  }
};
</script>