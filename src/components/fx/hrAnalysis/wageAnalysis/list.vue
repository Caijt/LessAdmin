<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="人力数据分析"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getWageAnalysisList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="统计维度" prop="dimensions">
            <el-radio-group v-model="queryParams.dimensions">
              <el-radio :label="0">月份</el-radio>
              <el-radio :label="1">月份同比</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计月份">
            <el-row style="width:300px">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.dateBegin"
                    type="month"
                    style="width: 100%"
                    :clearable="false"
                    :editable="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.dateEnd"
                    type="month"
                    style="width: 100%"
                    :clearable="false"
                    :editable="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="queryParams.isPay" clearable>
              <el-option label="应发" :value="true"></el-option>
              <el-option label="应扣" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="部门">
            <dep-select
              ref="depSelect"
              v-model="queryParams.depIds"
              multiple
              style="width:762px;"
              class="c-remove-max-width"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="工资类型">
            <el-select
              v-model="queryParams.wageTypeIds"
              multiple
              placeholder="请选择工资类型"
              style="width:762px;"
              class="c-remove-max-width"
              clearable
            >
              <el-option
                v-for="item in wageTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </template>
      <template slot="column">
        <el-table-column prop="year" label="日期" width="150">
          <template slot-scope="{row}">{{row.year}}-{{row.month}}</template>
        </el-table-column>
        <el-table-column prop="depName" label="部门" align="center">
          <template slot-scope="{row}">{{row.depName == '' ? "-" : row.depName}}</template>
        </el-table-column>
        <el-table-column prop="wageType" label="工资类型" align="center">
          <template slot-scope="{row}">{{row.wageType == '' ? "-" : row.wageType}}</template>
        </el-table-column>
        <el-table-column prop="isPay" label="类型" align="center">
          <template slot-scope="{row}">{{row.isPay == '' ? "实发" : row.isPay}}</template>
        </el-table-column>
        <el-table-column prop="newAmount" label="金额">
          <template slot-scope="{row}">{{row.newAmount}}</template>
        </el-table-column>
        <el-table-column v-if="queryParams.dimensions == 1" prop="lastAmount" label="同比金额">
          <template slot-scope="{row}">{{row.lastAmount == null ? "-" : row.lastAmount}}</template>
        </el-table-column>
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import baseDataApi from "@/api/sys/baseData";

import depSelect from "@/components/hr/department/treeSelect";

export default {
  mixins: [listMixin],
  components: {
    list,
    depSelect
  },
  data() {
    let initDate = this.$commonJs.getNowDateString();

    return {
      queryParams: {
        dimensions: 0,
        dateBegin: initDate,
        dateEnd: initDate,
        depIds: [],
        wageTypeIds: [],
        isPay: null
      },
      wageTypes: [],
      api: require("@/api/fx/hrAnalysis").default
    };
  },
  created() {
    baseDataApi.getWageTypeList().then(res => {
      this.wageTypes = res.data;
    });
  },
  methods: {}
};
</script>