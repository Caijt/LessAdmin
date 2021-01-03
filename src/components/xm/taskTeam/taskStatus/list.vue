<template>
  <div>
    <list
      row-key="id"
      ref="list"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="api.getTaskQueryPageList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        
        <el-form-item label="任务开始日期" label-width="100px">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.implementBeginDateBegin"
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
                  v-model.trim="queryParams.implementBeginDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="任务结束日期" label-width="100px">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.implementEndDateBegin"
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
                  v-model.trim="queryParams.implementEndDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="班组名称">
          <el-input v-model.trim="queryParams.teamName" clearable></el-input>
        </el-form-item>
      </template>
      <template slot="table">
        <el-table-column prop="customerName" label="任务日期" sortable="custom" width="160">
          <template slot-scope="{row}">
            开始：{{row.taskImplementBeginTime|toShortDatetimeString}}
            <br />
            结束：{{row.taskImplementBeginTime|toShortDatetimeString}}
          </template>
        </el-table-column>
        <el-table-column prop="teamName" label="班组名称" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="amount" label="实施人数" align="center" sortable="custom" width="120"></el-table-column>
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
import api from "@/api/xm/taskTeam";

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
        teamName:"",
        implementBeginDateBegin:"",
        implementBeginDateEnd:"",
        implementEndDateBegin:"",
        implementEndDateEnd:"",
      },
      api
    };
  },
  methods: {}
};
</script>