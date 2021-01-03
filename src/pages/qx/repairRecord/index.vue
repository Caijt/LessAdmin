<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建维修记录</el-button>
      </template>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/qx/repairRecord/list";
import editDialog from "@/components/qx/repairRecord/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  created() {}
};
</script>