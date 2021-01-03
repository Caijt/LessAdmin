<template>
  <div>
    <list
      id-key="id"
      ref="list"
      unit="接口"
      show-index
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      :checkbox-fixed="checkboxFixed"
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="dataFunc"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template #query>
        <el-form-item label="接口名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="接口路径">
          <el-input v-model.trim="queryParams.path" clearable></el-input>
        </el-form-item>
      </template>
      <template #column>
        <el-table-column prop="name" min-width="180" label="接口名称" show-overflow-tooltip />
        <el-table-column prop="path" min-width="150" label="接口路径" show-overflow-tooltip />
        <el-table-column prop="isCommon" align="center" width="90" label="公共接口">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.isCommon">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permissionType" width="100" label="权限类型" align="center">
          <template v-slot="{row}">
            <span v-if="row.isCommon">-</span>
            <el-tag v-else>{{row.permissionType=="READ"?"读":row.permissionType=="WRITE"?"写":"审核"}}</el-tag>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/sys/api";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {
    common:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        path: ""
      },
      api,
      dataFunc:this.common?api.getCommonPageList:api.getPageList
    };
  },
  methods: {}
};
</script>