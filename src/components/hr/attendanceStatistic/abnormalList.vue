<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="考勤记录"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <el-form-item label="员工姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <dep-select ref="depSelect" v-model="queryParams.depId" />
        </el-form-item>
        <el-form-item label="考勤地点">
          <el-input v-model.trim="queryParams.checkInPlace" clearable></el-input>
        </el-form-item>
        <el-form-item label="考勤日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.checkInDateBegin"
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
                  v-model.trim="queryParams.checkInDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="异常类型">
          <el-radio-group v-model="queryParams.type">
            <el-radio :label="0">缺勤</el-radio>
            <el-radio :label="1">超时</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" min-width="150"></el-table-column>
        <el-table-column prop="depName" width="120" label="部门" show-overflow-tooltip />
        <el-table-column prop="checkInDate" label="考勤日期" sortable="custom" width="150">
          <template slot-scope="{ row }">{{ row.checkInDate | toDateString }}</template>
        </el-table-column>
        <el-table-column label="异常时长" sortable="custom" width="150"></el-table-column>
        <el-table-column label="打卡明细" sortable="custom" width="150"></el-table-column>
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
import api from "@/api/hr/attendanceSignRecord";
import depSelect from "@/components/hr/department/treeSelect";
export default {
  mixins: [listMixin],
  components: {
    list,
    depSelect
  },
  props: {},
  mounted() {
    this.$refs.depSelect.getData();
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        depId: "",
        checkInDateBegin: "",
        checkInDateEnd: "",
        stage: "",
        onlyShowAbnormal: false
      },
      api
    };
  },
  methods: {}
};
</script>