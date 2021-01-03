<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="商机数据分析"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getBusinessAnalysisList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="统计维度" prop="dimensions">
            <el-radio-group v-model="queryParams.dimensions">
              <el-radio :label="0">月份</el-radio>
              <el-radio :label="1">年份</el-radio>
              <el-radio :label="2">月份同比</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计时段">
            <el-row style="width:300px">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.dateBegin"
                    :type="queryParams.dimensions!=1?'month':'year'"
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
                    :type="queryParams.dimensions!=1?'month':'year'"
                    style="width: 100%"
                    :clearable="false"
                    :editable="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="客户类型">
            <el-select
              v-show="queryParams.dimensions != 2"
              v-model="queryParams.customerTypeIds"
              multiple
              placeholder="请选择客户类型"
              style="width:615px;"
              class="c-remove-max-width"
              clearable
            >
              <el-option
                v-for="item in customerTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-show="queryParams.dimensions == 2"
              v-model="queryParams.customerTypeId"
              :multiple="false"
              placeholder="请选择客户类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in customerTypes"
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
          <template slot-scope="{row}">{{row.year}}{{row.month==0?'':'-'+row.month}}</template>
        </el-table-column>
        <el-table-column prop="customerTypeName" label="客户类型" align="center">
          <template slot-scope="{row}">{{row.customerTypeName == '' ? "-" : row.customerTypeName}}</template>
        </el-table-column>
        <el-table-column prop="newNumber" label="登记数量" />
        <el-table-column v-if="queryParams.dimensions == 2" prop="lastNumber" label="同期登记数量">
          <template slot-scope="{row}">{{row.lastNumber == null ? "-" : row.lastNumber}}</template>
        </el-table-column>
        <el-table-column prop="newSuccess" label="成功数量" />
        <el-table-column v-if="queryParams.dimensions == 2" prop="lastSuccess" label="同期成功数量">
          <template slot-scope="{row}">{{row.lastSuccess == null ? "-" : row.lastSuccess}}</template>
        </el-table-column>
        <el-table-column prop="newFail" label="失败数量" />
        <el-table-column v-if="queryParams.dimensions == 2" prop="lastFail" label="同期失败数量">
          <template slot-scope="{row}">{{row.lastFail == null ? "-" : row.lastFail}}</template>
        </el-table-column>
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import baseDataApi from "@/api/sys/baseData";

export default {
  mixins: [listMixin],
  components: {
    list
  },
  data() {
    let initDate = this.$commonJs.getNowDateString();

    return {
      queryParams: {
        dimensions: 0,
        dateBegin: initDate,
        dateEnd: initDate,
        customerTypeIds: [],
        customerTypeId: null
      },
      customerTypes: [],
      api: require("@/api/fx/businessAnalysis").default
    };
  },
  created() {
    baseDataApi.getCustomerTypeList().then(res => {
      this.customerTypes = res.data;
    });
  },
  computed: {
    dimensions() {
      return this.queryParams.dimensions;
    }
  },
  watch: {
    dimensions(val) {
      if (val == 2) {
        this.queryParams.customerTypeIds = [];
      } else {
        this.queryParams.customerTypeId = null;
      }
    }
  },
  methods: {}
};
</script>