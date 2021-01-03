<template>
  <div>
    <list
      ref="list"
      :show-query="false"
      :border="false"
      :checkbox-fixed="false"
      show-checkbox
      :page="false"
      local-delete
      :confirm-on-delete="false"
    >
      <template #toolbar-left>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button @click="removeBath">删除</el-button>
      </template>
      <template #column>
        <el-table-column label="接口名称" prop="apiName" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="接口路径" prop="apiPath" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="公共接口" width="90" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.apiIsCommon">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限类型" width="100" align="center">
          <template v-slot="{row}">
            <span v-if="row.apiIsCommon">-</span>
            <el-tag
              v-else
            >{{row.apiPermissionType=="READ"?"读":row.apiPermissionType=="WRITE"?"写":"审核"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60" align="center">
          <template v-slot="{row}">
            <el-button type="text" icon="el-icon-delete" @click="del(row)" />
          </template>
        </el-table-column>
      </template>
    </list>
    <div class="c-text-grey c-text-xs">* 非公共接口只能属于一个菜单，所以只会属于最后一次保存的菜单。</div>
    <api-dialog ref="apiDialog" in-dialog multiple selectable @select-multiple="onSelect" />
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixin from "@/mixins/list";
import apiDialog from "@/components/sys/api/common/listDialog";
export default {
  components: { list, apiDialog },
  mixins: [listMixin],
  data() {
    return {};
  },
  methods: {
    del(row) {
      this.$refs.list.delete(row);
    },
    add() {
      let notIds = this.$refs.list.data.map(item => item.apiId);
      this.$refs.apiDialog.open().then(that => {
        that.getData({ notIds });
      });
    },
    removeBath() {
      this.$refs.list.deleteBatch();
    },
    onSelect(rows) {
      this.$refs.list.add(
        rows.map(item => {
          return {
            apiId: item.id,
            apiName: item.name,
            apiPath: item.path,
            apiIsCommon: item.isCommon,
            apiPermissionType: item.permissionType
          };
        })
      );
    }
  }
};
</script>