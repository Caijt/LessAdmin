<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建通知公告</el-button>
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
          <el-button
            size="mini"
            v-if="row.submitTime"
            type="text"
            icon="el-icon-upload2"
            @click="top(row)"
          />
          <el-button size="mini" v-else type="text" icon="el-icon-edit" @click="editById(row.id)" />
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
   
  </div>
</template>
<script>
import list from "@/components/xz/notice/list";
import editDialog from "@/components/xz/notice/editDialog";
import curdMixins from "@/mixins/curd";
import api from "@/api/xz/notice";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  methods: {
    top(data) {
      let msg = data.isTop
        ? "您确定要取消此公告置顶吗？"
        : "您确定要置顶此公告吗？";
      this.$confirm(msg, "提示", { type: "warning" }).then(res => {
        api.top(data.id).then(res => {
          data.isTop = !data.isTop;
        });
      });
    }
  }
};
</script>