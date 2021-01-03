<template>
  <div>
    <list
      row-key="id"
      ref="list"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="api.getTaskPageList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="客户名称" label-width="90px">
            <el-input v-model.trim="queryParams.customerName" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <customer-type-select v-model.trim="queryParams.customerTypeId" clearable />
          </el-form-item>
          <el-form-item label="灭害种类" label-width="90px">
            <metacil-type-select v-model.trim="queryParams.metacilTypeId" clearable />
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="queryParams.businessType" clearable>
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="项目名称" label-width="90px">
            <el-input v-model.trim="queryParams.projectName" clearable></el-input>
          </el-form-item>
          <el-form-item label="服务地址">
            <el-input v-model.trim="queryParams.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系人" label-width="90px">
            <el-input v-model.trim="queryParams.contact" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model.trim="queryParams.phone" clearable></el-input>
          </el-form-item>
        </div>
        <!-- <el-form-item label="客户类型">
          <el-input v-model.trim="queryParams.contact" clearable></el-input>
        </el-form-item>
        <el-form-item label="灭害种类">
          <el-input v-model.trim="queryParams.contact" clearable></el-input>
        </el-form-item> 
        <el-form-item label="业务类型">
          <el-input v-model.trim="queryParams.contact" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="queryParams.contact" clearable></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="实施频率">
          <el-select v-model="queryParams.a" clearable>
            <el-option label="单次" :value="0"></el-option>
            <el-option label="多次" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="queryParams.a" clearable>
            <el-option label="单次" :value="0"></el-option>
            <el-option label="多次" :value="1"></el-option>
          </el-select>
        </el-form-item>-->
        <div>
          <el-form-item label="实施开始时间" label-width="90px">
            <el-date-picker
              v-model="queryParams.implementBeginDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model="queryParams.implementBeginDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="实施结束时间" label-width="90px">
            <el-date-picker
              v-model="queryParams.implementEndDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model="queryParams.implementEndDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
      </template>
      <template slot="table">
        <el-table-column prop="customerName" label="客户名称" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="customerType" label="客户类型" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="contact" label="联系人" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="address" label="服务地址" sortable="custom" min-width="100"></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          sortable="custom"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="metacilTypeNames"
          label="灭害种类"
          sortable="custom"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="implementBeginTime" label="实施时间" sortable="custom" width="160">
          <template slot-scope="{row}">
            开始：{{row.implementBeginTime|toShortDatetimeString}}
            <br />
            结束：{{row.implementEndTime|toShortDatetimeString}}
          </template>
        </el-table-column>
        <el-table-column
          prop="implementAmount"
          label="实施人数"
          align="center"
          sortable="custom"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="implementStatus"
          label="实施情况"
          align="center"
          sortable="custom"
          width="100"
        >
          <template slot-scope="{row}">
            <el-tag v-if="row.implementStatus==0" type="info">未实施</el-tag>
            <el-tag v-else-if="row.implementStatus==1" type="warning">实施中</el-tag>
            <el-tag v-else-if="row.implementStatus==2" type="success">已完成</el-tag>
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
import customerTypeSelect from "@/components/sys/baseData/customerType/select";
import metacilTypeSelect from "@/components/sys/baseData/metacilType/select";
export default {
  mixins: [listMixin],
  components: {
    list,
    customerTypeSelect,
    metacilTypeSelect
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        customerName: "",
        customerType: "",
        contact: "",
        contactPhone: "",
        implementBeginDateBegin: "",
        implementBeginDateEnd: "",
        implementEndDateBegin: "",
        implementEndDateEnd: ""
      },
      api
    };
  },
  methods: {}
};
</script>