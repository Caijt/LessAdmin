<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="绩效考核"
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
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template slot="query">
        <el-form-item label="员工姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="员工部门">
          <select-input
            :label="queryParamsLabel.depName"
            v-model="queryParams.depId"
            @click="openDepDialog"
          />
        </el-form-item>
        <el-form-item label="考核类型">
          <el-select v-model="queryParams.kpiType">
            <el-option label="月度考核" :value="0"></el-option>
            <el-option label="季度考核" :value="1"></el-option>
            <el-option label="年度考核" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核年份" prop="year">
          <el-date-picker
            v-model.trim="queryParams.kpiYear"
            type="year"
            value-format="yyyy"
            clearable
          ></el-date-picker>
        </el-form-item>
      </template>
      <template slot="table">
        <el-table-column prop="kpiName" label="考核名称" sortable="custom" min-width="100">
          <template slot-scope="{row}">
            <span class="c-link" @click="openWorkflowDetails(row)">{{row.kpiName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="kpiType" label="考核类型" sortable="name" width="100">
          <template slot-scope="{row}">{{row.kpiType==0?"月度":(row.kpiType==1?"季度":"年度")}}考核</template>
        </el-table-column>
        <el-table-column prop="kpiYear" label="考核区间" sortable="name" width="120">
          <template
            slot-scope="{row}"
          >{{row.kpiYear}}年{{row.kpiType==0?" / 第"+row.kpiMonth+"月份":(row.kpiType==1?" / 第"+row.kpiQuarter+"季度":"")}}</template>
        </el-table-column>
        <el-table-column prop="employeeName" label="考核员工" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="depName" label="员工部门" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="kpiScoreTotal" label="考核满分" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="scoreTotal" label="考核打分" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="handleEmployeeName" label="接收人" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="receiveTime" width="140" label="接收时间" sortable="custom">
          <template slot-scope="{ row }">{{ row.receiveTime | toShortDatetimeString }}</template>
        </el-table-column>
        <el-table-column prop="handleTime" width="140" label="考核时间" sortable="custom">
          <template
            slot-scope="{ row }"
          >{{ row.handleTime?$commonJs.toShortDatetimeString(row.handleTime):"未考核" }}</template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <dep-dialog ref="depDialog" :in-dialog="inDialog" select @select="setDep" />
    <workflow-details ref="workflowDetails" :in-dialog="inDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/kpiManage";
import depDialog from "@/components/hr/department/treeDialog";
import workflowDetails from "./details";

export default {
  mixins: [listMixin],
  components: {
    list,
    depDialog,
    workflowDetails
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        depId: "",
        kpiType: "",
        kpiYear: ""
      },
      queryParamsLabel: {
        depName: ""
      },
      api
    };
  },
  methods: {
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setDep(node) {
      this.queryParamsLabel.depName = node.name;
      this.queryParams.depId = node.id;
    },
    openWorkflowDetails(row) {
      this.$refs.workflowDetails.openDetails(row);
    }
  }
};
</script>