<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工调动记录"
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
        <el-form-item label="员工名称">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="调动类型">
          <el-select v-model="queryParams.type" clearable>
            <el-option label="晋升" :value="0"></el-option>
            <el-option label="降职" :value="1"></el-option>
            <el-option label="换岗" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调动日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.mobilizeDateBegin"
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
                  v-model.trim="queryParams.mobilizeDateEnd"
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
        <el-table-column prop="oldDepName" width="100" label="调动前部门" show-overflow-tooltip />
        <el-table-column prop="oldPostName" label="调动前职务" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="oldJobName" label="调动前岗位" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="mobilizeDate" label="调动日期" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{row.mobilizeDate|toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newDepName" width="100" label="调动后部门" show-overflow-tooltip />
        <el-table-column prop="newPostName" label="调动后职务" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="newJobName" label="调动后岗位" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="type" label="调动类型" sortable="custom" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.type==0">晋升</el-tag>
            <el-tag type="danger" v-if="row.type==1">降职</el-tag>
            <el-tag type="warning" v-if="row.type==2">换岗</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="调动原因" sortable="custom" min-width="120"></el-table-column>
        <el-table-column prop="createTime" width="140" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
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
import api from "@/api/hr/mobilizeRecord";

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
        type: "",
        mobilizeDateBegin:"",
        mobilizeDateEnd:""
      },
      api
    };
  },
  methods: {}
};
</script>