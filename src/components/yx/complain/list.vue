<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="客户投诉"
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
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="客户名称">
          <el-input v-model.trim="queryParams.customerName" clearable placeholder="填写客户名称"></el-input>
        </el-form-item>
        <el-form-item label="投诉类型">
          <complain-type v-model="queryParams.typeId"></complain-type>
        </el-form-item>
        <el-form-item label="投诉时间">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.complainTimeBegin"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">至</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.complainTimeEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="queryParams.projectName" clearable placeholder="填写项目名称"></el-input>
        </el-form-item>
        <el-form-item label="处理结果">
          <el-select v-model="queryParams.result" clearable>
            <el-option label="未处理" :value="0"></el-option>
            <el-option label="已处理" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="customerName" label="客户名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="typeName" label="投诉类型" min-width="150" show-overflow-tooltip />
        <el-table-column prop="complainTime" label="投诉时间" min-width="150" show-overflow-tooltip />
        <el-table-column prop="projectName" label="项目名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="result" label="处理结果" min-width="150" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-col v-if="row.result == 0">未处理</el-col>
            <el-col v-else>已处理</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="disposeTime" label="处理时间" min-width="150" show-overflow-tooltip />
        <slot name="table"></slot>
        <slot name="column"></slot>
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";

import complainType from "@/components/sys/baseData/complainType/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    complainType
  },
  props: {},
  data() {
    return {
      queryParams: {
        customerName: "",
        typeId: null,
        projectName: "",
        complainTimeBegin: null,
        complainTimeEnd: null,
        result: null
      },
      api: require("@/api/yx/complain").default
    };
  },
  methods: {}
};
</script>