<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="审批单"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="api.getMyApprovalPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="申请标题">
          <el-input v-model.trim="queryParams.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.isApproval" clearable>
            <el-option label="待审批" :value="false"></el-option>
            <el-option label="已审批" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.receiveDateBegin"
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
                  v-model.trim="queryParams.receiveDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="审批日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.handleDateBegin"
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
                  v-model.trim="queryParams.handleDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="title" label="申请标题" sortable="custom" min-width="100">
          <template slot-scope="{row}">
            <span class="c-link no-line" @click="openDetails(row.workflowProcessId)">{{row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workflowType" label="申请类别" sortable="custom" width="140"></el-table-column>
        <el-table-column
          prop="receiveTime"
          label="接收时间"
          align="center"
          sortable="custom"
          width="140"
        >
          <template slot-scope="{row}">{{row.receiveTime | toShortDatetimeString}}</template>
        </el-table-column>
        <el-table-column
          prop="handleTime"
          label="审批时间"
          align="center"
          sortable="custom"
          width="140"
        >
          <template slot-scope="{row}">
            <span v-if="row.handleTime">{{row.handleTime | toShortDatetimeString}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" sortable="custom" width="80" align="center">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.handleTime">已审批</el-tag>
            <el-tag type="warning" v-else>待审批</el-tag>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <workflow-details :in-dialog="inDialog" ref="workflowDetails"/>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xz/workflow";
import workflowDetails from "./details";

export default {
  mixins: [listMixin],
  components: {
    list,
    workflowDetails
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        status: "",
        workflowTypeId: null,
        createDateBegin: "",
        createDateEnd: ""
      },
      api
    };
  },
  methods: {
    openDetails(id) {
      this.$refs.workflowDetails.openDetailsById(id);
    }
  }
};
</script>