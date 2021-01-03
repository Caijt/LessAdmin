<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建领用记录</el-button>
      </template>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/qx/useRecord/list";
import editDialog from "@/components/qx/useRecord/editDialog";
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