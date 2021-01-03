<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="项目人员考勤"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getTaskAttendanceRecordPageList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template #query>
        <el-form-item label="员工姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>

        <el-form-item label="打卡日期">
          <el-date-picker
            v-model.trim="queryParams.dateBegin"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model.trim="queryParams.dateEnd"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" min-width="150"></el-table-column>
        <el-table-column prop="date" width="150" label="打卡日期">
          <template v-slot="{row}">{{$commonJs.toDateString(row.date)}}</template>
        </el-table-column>
        <el-table-column width="200" sortable="custom" label="打卡时间">
          <template v-slot="{row}">
            <div>到场时间：{{ $commonJs.toTimeString(row.signInTime)}}</div>
            <div>离场时间：{{row.signOutTime != row.signInTime?$commonJs.toTimeString(row.signOutTime):"缺卡"}}</div>
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
import api from "@/api/xm/taskImplement";
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
        dateBegin: "",
        dateEnd: "",
        employeeName: ""
      },
      api
    };
  },
  methods: {}
};
</script>