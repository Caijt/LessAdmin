<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="考勤组"
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
        <el-form-item label="名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="name" label="考勤组名称" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="type" width="120" label="考勤类型">        
          <template slot-scope="{row}">{{row.type==0?"固定班制":""}}</template>
        </el-table-column>
        <el-table-column prop="description" min-width="120" label="考勤时间" show-overflow-tooltip>
          <template slot-scope="{row}"><span v-html="getDescription(row.attendanceGroupWorkdays)"></span> </template>
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
import api from "@/api/hr/attendanceGroup";

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
  methods: {
    getDescription(workdays) {
      let temp = {};
      let weekNames = api.weekNames;
      let restWorkDays = [...weekNames];
      workdays.forEach(item => {
        delete restWorkDays[item.week];
        if (temp[item.attendanceShiftId] == undefined) {
          temp[item.attendanceShiftId] = [];
        }
        temp[item.attendanceShiftId].push(item);
      });      
      let temp2 = [restWorkDays.filter(item=>item!=undefined).join(",")+" (休息)"];
      for(let i in temp){
        temp2.push(temp[i].map(item=>weekNames[item.week]).join(",")+" ("+temp[i][0].shiftDescription+")");
      }
      return temp2.join("<br/>")
    }
  }
};
</script>