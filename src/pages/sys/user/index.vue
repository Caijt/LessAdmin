<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template #toolbar-left>
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建用户</el-button>
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
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="edit(row)"
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
import list from "@/components/sys/user/list";
import editDialog from "@/components/sys/user/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  name: "sys.user",
  components: {
    list,
    editDialog,
  },
  mixins: [curdMixins],
  created() {},
  methods: {},
};
</script>