<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工合同"
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
        <el-form-item label="员工姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="合同开始日期" label-width="85px">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.beginDateBegin"
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
                  v-model.trim="queryParams.beginDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="合同结束日期" label-width="85px">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.endDateBegin"
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
                  v-model.trim="queryParams.endDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="depName" width="120" label="所属部门" show-overflow-tooltip />
        <el-table-column prop="beginDate" label="合同开始日期" sortable="custom" width="120">
          <template slot-scope="{ row }">
            <span>{{ row.beginDate | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="合同结束日期" sortable="custom" width="120">
          <template slot-scope="{ row }">
            <span>{{ row.endDate | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="合同时长" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{row.duration}} 个月</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="140" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最近更新时间" width="140" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.updateTime | toShortDatetimeString }}</span>
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
import api from "@/api/hr/contract";

export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        beginDateBegin: "",
        beginDateEnd: "",
        endDateBegin: "",
        endDateEnd: ""
      },
      api
    };
  },
  methods: {}
};
</script>