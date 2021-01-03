<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">用车申请</el-button>
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
          <el-button size="mini" type="text" @click="del(row)" :disabled="row.status!=0">撤销</el-button>
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xz/carApplication/list";
import editDialog from "@/components/xz/carApplication/editDialog";
import curdMixins from "@/mixins/curd";
export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins]
};
</script>