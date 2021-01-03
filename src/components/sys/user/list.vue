<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      id-key="id"
      ref="list"
      unit="用户"
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
        <el-form-item label="登录名">
          <el-input v-model.trim="queryParams.loginName" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-input v-model.trim="queryParams.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.isDisabled" clearable>
            <el-option label="启用" :value="false"></el-option>
            <el-option label="禁用" :value="true"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template #column>
        <el-table-column prop="loginName" min-width="180" label="登录名" show-overflow-tooltip />
        <el-table-column prop="roleName" width="180" label="所属角色" show-overflow-tooltip />
        <el-table-column width="100" label="菜单权限" align="center">
          <template v-slot="{row}">
            <span class="c-link" @click="openPermissionMenusDialog(row.roleId)">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="isDisabled" align="center" width="100" sortable="custom" label="状态">
          <template v-slot="{row}">
            <el-tag type="danger" v-if="row.isDisabled">禁用</el-tag>
            <el-tag type="success" v-else>启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="120" label="创建时间" sortable="custom">
          <template v-slot="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最近更新时间" width="120" sortable="custom">
          <template v-slot="{row}">
            <span>{{ row.updateTime | toShortDatetimeString }}</span>
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
import permissionMenusDialog from "@/components/sys/role/permissionMenusDialog";
import api from "@/api/sys/user";
export default {
  mixins: [listMixin],
  components: {
    list,
    permissionMenusDialog,
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        loginName: "",
        roleName: "",
      },
      api,
    };
  },
  methods: {
    openPermissionMenusDialog(roleId) {
      this.$refs.permissionMenusDialog.open(roleId);
    },
  },
};
</script>