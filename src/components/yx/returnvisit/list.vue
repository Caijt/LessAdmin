<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="客户回访"
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
        <el-form-item label="回返类型">
          <el-select v-model="queryParams.type" clearable>
            <el-option label="日常回访" :value="0"></el-option>
            <el-option label="项目回访" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访时间">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.beginReturnVisit"
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
                  v-model.trim="queryParams.endReturnVisit"
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
      </div>
      <template slot="column">
        <el-table-column prop="customerName" label="客户名称" min-width="150" />
        <el-table-column prop="type" label="回访类型" min-width="150">
          <template slot-scope="{row}">
            <el-col v-if="row.type == 0">日常回访</el-col>
            <el-col v-else>项目回访</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="satisfaction" label="满意度" min-width="150">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.satisfaction == 0">满意</el-tag>
            <el-tag v-else-if="row.satisfaction == 1">一般</el-tag>
            <el-tag type="danger" v-else>不满意</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="returnVisitTime" label="回访时间" min-width="150">
          <template slot-scope="{ row }">
            <span>{{ row.returnVisitTime | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="150" show-overflow-tooltip />
        <slot name="table"></slot>
        <slot name="column"></slot>
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";

export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      queryParams: {
        customerName: "",
        type: null,
        projectName: "",
        beginReturnVisit: null,
        endReturnVisit: null
      },
      api: require("@/api/yx/returnvisit").default
    };
  },
  methods: {}
};
</script>