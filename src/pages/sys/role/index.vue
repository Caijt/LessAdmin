<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template #toolbar-left>
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建角色</el-button>
      </template>
      <template #column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="80"
          v-if="$permission.canWrite()"
        >
          <template v-slot="{row}">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="editById(row.id)"
              :disabled="row.id<0"
            />
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="del(row)"
              :disabled="row.id<0"
            />
          </template>
        </el-table-column>
      </template>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/sys/role/list";
import editDialog from "@/components/sys/role/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  name: "sys.role",
  components: {
    list,
    editDialog,
  },
  mixins: [curdMixins],
  data() {
    return {};
  },
  methods: {},
};
</script>