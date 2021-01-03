<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create()" type="primary" :disabled="!$permission.canWrite()">登记投诉信息</el-button>
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
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/yx/complain/list";
import editDialog from "@/components/yx/complain/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  mixins: [curdMixins],
  components: {
    list,
    editDialog
  },
  created() {}
};
</script>