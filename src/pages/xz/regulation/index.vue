<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button @click="create" type="primary" :disabled="!$permission.canWrite()">创建规章制度</el-button>
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
import list from "@/components/xz/regulation/list";
import editDialog from "@/components/xz/regulation/editDialog";
import curdMixins from "@/mixins/curd";
import api from "@/api/xz/regulation";

export default {
  components: {
    list,
    editDialog
  },
  mixins: [curdMixins],
  methods:{
    top(data) {
      let msg = data.isTop
        ? "您确定要取消此规章制度吗？"
        : "您确定要置顶此规章制度吗？";
      this.$confirm(msg, "提示", { type: "warning" }).then(res => {
        api.top(data.id).then(res => {
          data.isTop = !data.isTop;
        });
      });
    }
  }
};
</script>