<template>
  <div>
    <list
      id-key="id"
      ref="list"
      unit="角色"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template #toolbar-left>
        <slot name="toolbar-left"></slot>
      </template>
      <template #query>
        <el-form-item label="角色名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
      </template>
      <template #column>
        <el-table-column prop="name" label="角色名称" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="remarks" label="角色备注" min-width="150"></el-table-column>
        <el-table-column prop="createTime" width="130" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最近更新时间" width="130" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.updateTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="菜单权限" align="center">
          <template slot-scope="{row}">
            <span class="c-link" @click="openPermissionMenusDialog(row.id)">查看</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <permissionMenusDialog ref="permissionMenusDialog" :in-dialog="inDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import permissionMenusDialog from "./permissionMenusDialog";
import api from "@/api/sys/role";

export default {
  mixins: [listMixin],
  components: {
    list,
    permissionMenusDialog,
  },
  props: {},
  data() {
    return {
      api,
      //查询条件字段
      queryParams: {
        name: "",
      },
    };
  },
  methods: {
    openPermissionMenusDialog(id) {
      this.$refs.permissionMenusDialog.open(id);
    },
  },
};
</script>