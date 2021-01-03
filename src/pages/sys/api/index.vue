<template>
  <div>
    <el-alert
      title="警告"
      type="warning"
      show-icon
      description="此功能为开发人员配置接口，非开发人员请勿随便修改，否则会导致系统权限出错！"
    ></el-alert>
    <div class="c-h-10p"></div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template #toolbar-left>
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建接口</el-button>
      </template>
      <template #column>
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
  </div>
</template>
<script>
import list from "@/components/sys/api/list";
import editDialog from "@/components/sys/api/editDialog";
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