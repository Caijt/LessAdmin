<template>
  <div>
    <list
      id-key="accessToken"
      ref="list"
      unit="Token记录"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageList"
    >
      <template #toolbar-left>
        <slot name="toolbar-left"></slot>
      </template>
      <template #query>
        <el-form-item label="访问Token">
          <el-input v-model.trim="queryParams.accessToken" clearable></el-input>
        </el-form-item>
        <el-form-item label="刷新Token">
          <el-input v-model.trim="queryParams.refreshToken" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model.trim="queryParams.userLoginName" clearable></el-input>
        </el-form-item>
      </template>
      <template #column>
        <el-table-column prop="userLoginName" width="100" label="用户" sortable="custom"></el-table-column>
        <el-table-column prop="ip" width="100" label="Ip" sortable="custom"></el-table-column>
        <el-table-column prop="accessToken" label="访问Token" sortable="custom" min-width="150"></el-table-column>
        <el-table-column prop="accessExpire" width="140" label="访问过期时间" sortable="custom"></el-table-column>
        <el-table-column prop="refreshToken" label="刷新Token" min-width="150"></el-table-column>
        <el-table-column prop="refreshExpire" width="140" label="刷新过期时间" sortable="custom"></el-table-column>

        <el-table-column prop="createTime" width="130" label="创建时间" sortable="custom">
          <template v-slot="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" label="状态" align="center" sortable="custom">
          <template v-slot="{ row }">
            <el-tag type="danger" v-if="row.isDisabled">已禁用</el-tag>
            <el-tag type="danger" v-else-if="$moment(row.refreshExpire).isBefore()">刷新过期</el-tag>
            <el-tag type="danger" v-else-if="$moment(row.accessExpire).isBefore()">访问过期</el-tag>
            <el-tag type="success" v-else>生效中</el-tag>
          </template>
        </el-table-column>
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/sys/token";
export default {
  mixins: [listMixin],
  components: {
    list,
  },
  props: {},
  data() {
    return {
      unit: "Token记录",
      api,
      //查询条件字段
      queryParams: {
        accessToken: "",
        refreshToken: "",
        userLoginName: "",
      },
    };
  },
  methods: {
    test() {
      console.log("123");
    },
  },
};
</script>