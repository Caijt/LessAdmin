<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      index-column-width="50px"
      row-key="id"
      ref="list"
      unit="考勤统计"
      :disabled="disabled"
      query-button-text="统计"
      local-sort
      :before-query="beforeQuery"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="api.getList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query" style="min-width:700px">
        <el-form-item label="统计范围">
          <el-select v-model="queryParams.range" @change="onChange">
            <el-option label="全部" value></el-option>
            <el-option label="部门" value="dep"></el-option>
            <el-option label="人员" value="emp"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="queryParams.hideIgnore">隐藏无需考勤人员</el-checkbox>
          <el-checkbox v-model="queryParams.hideNoGroup">隐藏未加入考勤组人员</el-checkbox>
        </el-form-item>
        <div>
          <el-form-item label="统计部门" v-show="queryParams.range=='dep'">
            <dep-select
              v-model="queryParams.depIds"
              multiple
              style="width:600px"
              class="_remove-max-width"
            />
          </el-form-item>
          <el-form-item label="统计人员" v-show="queryParams.range=='emp'">
            <employee-select
              v-model="queryParams.employeeIds"
              multiple
              style="width:600px"
              class="_remove-max-width"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="统计日期">
            <el-row style="width:300px">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    :clearable="false"
                    v-model.trim="queryParams.statisticDateBegin"
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
                    :clearable="false"
                    v-model.trim="queryParams.statisticDateEnd"
                    placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </div>
      <template slot="table">
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="depName" width="100" label="部门" show-overflow-tooltip />
        <el-table-column
          prop="groupName"
          width="100"
          label="考勤组"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">{{row.isIgnore?"（无需考勤）":(row.groupName||"（未加入）")}}</template>
        </el-table-column>
        <el-table-column width="100" label="考勤明细" align="center">
          <template slot-scope="{row}">
            <span class="c-link" @click="openDetails(row)">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="restDays" sortable width="100" label="休息天数" align="center">
          <template slot-scope="{row}">{{row.restDays||"-"}}</template>
        </el-table-column>
        <el-table-column prop="workDays" sortable width="100" label="工作天数" align="center">
          <template slot-scope="{row}">{{row.workDays||"-"}}</template>
        </el-table-column>
        <el-table-column prop="absenteeismDays" sortable width="100" label="旷工天数" align="center">
          <template slot-scope="{row}">{{row.absenteeismDays||"-"}}</template>
        </el-table-column>
        <el-table-column prop="signInLackTotal" width="125" sortable label="上班缺卡次数" align="center">
          <template slot-scope="{row}">{{row.signInLackTotal||"-"}}</template>
        </el-table-column>
        <el-table-column prop="signOutLackTotal" width="125" sortable label="下班缺卡次数" align="center">
          <template slot-scope="{row}">{{row.signOutLackTotal||"-"}}</template>
        </el-table-column>
        <el-table-column prop="lateMinutes" min-width="110" align="center" label="迟到时长">
          <template slot-scope="{row}">{{getDurationText(row.lateDuration)}}</template>
        </el-table-column>
        <el-table-column prop="earlyMinutes" min-width="110" align="center" label="早退时长">
          <template slot-scope="{row}">{{getDurationText(row.earlyDuration)}}</template>
        </el-table-column>
        <el-table-column prop="leaveMinutes" sortable min-width="110" align="center" label="请假时长">
          <template slot-scope="{row}">{{getDurationText(row.leaveDuration)}}</template>
        </el-table-column>
        <el-table-column
          prop="overtimeMinutes"
          sortable
          min-width="110"
          align="center"
          label="加班时长"
        >
          <template slot-scope="{row}">{{getDurationText(row.overtimeDuration)}}</template>
        </el-table-column>
        <el-table-column prop="travelMinutes" sortable min-width="110" align="center" label="出差时长">
          <template slot-scope="{row}">{{getDurationText(row.travelDuration)}}</template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <day-list-dialog ref="dayListDialog" title="员工考勤明细" :show-toolbar="false"/>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/attendanceStatistic";
import depSelect from "@/components/hr/department/treeSelect";
import employeeSelect from "@/components/hr/employee/select";
import api2 from "@/api/hr/attendanceGroup";
import dayListDialog from "./dayListDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    depSelect,
    employeeSelect,
    dayListDialog
  },
  props: {},
  data() {
    let endDate = this.$commonJs.getNowDateString();
    let beginDate = this.$moment()
      .date(1)
      .format("YYYY-MM-DD");
    return {
      //查询条件字段
      queryParams: {
        range: "",
        depIds: [],
        employeeIds: [],
        statisticDateBegin: beginDate,
        statisticDateEnd: endDate,
        hideIgnore: false,
        hideNoGroup: false
      },
      api
    };
  },
  methods: {
    beforeQuery() {
      if (
        !this.queryParams.statisticDateBegin ||
        !this.queryParams.statisticDateEnd
      ) {
        this.$message.warning("请指定统计日期");
        return false;
      }
      return true;
    },
    onChange(e) {
      this.queryParams.depIds = [];
      this.queryParams.employeeIds = [];
    },
    getDurationText(duration) {
      let d = this.$moment.duration(duration);
      let a2 = [];
      if (d.days() > 0) {
        a2.push(d.days() + "天");
      }
      if (d.hours() > 0) {
        a2.push(d.hours() + "小时");
      }
      if (d.minutes() > 0) {
        a2.push(d.minutes() + "分钟");
      }
      return a2.join("") || "-";
    },
    openDetails(row) {
      this.$refs.dayListDialog.open().then(that => {
        that.getData({
          employeeIds: [row.employeeId],
          statisticDateBegin: this.queryParams.statisticDateBegin,
          statisticDateEnd: this.queryParams.statisticDateEnd,
        });
      });
    }
  }
};
</script>
<style>
._remove-max-width .el-input {
  max-width: none !important;
}
</style>