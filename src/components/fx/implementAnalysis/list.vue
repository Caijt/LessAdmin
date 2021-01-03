<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="项目实施分析"
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
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="统计维度" prop="dimensions">
            <el-radio-group v-model="queryParams.dimensions" style="width:300px;">
              <el-radio :label="0">月份</el-radio>
              <el-radio :label="1">年份</el-radio>
              <el-radio :label="2">月份同比</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监督结果">
            <el-select v-model="queryParams.isQualified" clearable>
              <el-option label="合格" :value="true"></el-option>
              <el-option label="不合格" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
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
          <el-form-item label="回访结果">
            <el-select v-model="queryParams.satisfaction" clearable>
              <el-option label="满意" :value="0"></el-option>
              <el-option label="一般" :value="1"></el-option>
              <el-option label="不满意" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="客户类型">
            <el-select
              v-show="queryParams.dimensions != 2"
              v-model="queryParams.customerTypeIds"
              multiple
              placeholder="请选择客户类型"
              style="width:520px;"
              class="c-remove-max-width"
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
              style="width:520px;"
              class="c-remove-max-width"
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
        <el-table-column prop="isQualified" label="监督结果" align="center">
          <template slot-scope="{row}">
            <el-col v-if="row.isQualified == null">-</el-col>
            <el-col v-else>{{row.isQualified}}</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="satisfaction" label="回访结果" align="center">
          <template slot-scope="{row}">
            <el-col v-if="row.satisfaction == null">-</el-col>
            <el-col v-else>{{row.satisfaction}}</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="projectNumber" label="项目数量" />
        <el-table-column v-if="queryParams.dimensions == 2" prop="lastProjectNumber" label="同比项目数量">
          <template slot-scope="{row}">{{row.lastProjectNumber==null?"-":row.lastProjectNumber}}</template>
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
        customerTypeId: null,
        isQualified: null,
        satisfaction: null
      },
      customerTypes: [],
      api: require("@/api/fx/implementAnalysis").default
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