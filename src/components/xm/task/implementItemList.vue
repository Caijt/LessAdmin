<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
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
      :get-data-func="api.getImplementItemPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="客户名称" label-width="110px">
            <el-input v-model.trim="queryParams.customerName" clearable></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <customer-type-select v-model.trim="queryParams.customerTypeId" />
          </el-form-item>
          <el-form-item label="灭害种类" label-width="110px">
            <metacil-type-select v-model.trim="queryParams.metacilTypeId" />
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="queryParams.businessType" clearable>
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="服务地址" label-width="110px">
            <el-input v-model.trim="queryParams.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model.trim="queryParams.contact" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="110px">
            <el-input v-model.trim="queryParams.contactPhone" clearable></el-input>
          </el-form-item>
          <el-form-item label="实施频率">
            <el-select v-model="queryParams.frequency" clearable>
              <el-option label="单次" :value="true"></el-option>
              <el-option label="多次" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="任务状态" label-width="110px">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="未分派" :value="0"></el-option>
              <el-option label="已分派" :value="1"></el-option>
              <el-option label="实施中" :value="2"></el-option>
              <el-option label="已完成" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实施内容">
            <el-input v-model.trim="queryParams.content" clearable></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="预计实施开始日期" label-width="110px">
            <el-date-picker
              v-model.trim="queryParams.expectImplementBeginDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.expectImplementBeginDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="预计实施结束日期" label-width="110px">
            <el-date-picker
              v-model.trim="queryParams.expectImplementEndDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.expectImplementEndDateEnd"
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
        <el-table-column
          prop="address"
          label="服务地址"
          sortable="custom"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          sortable="custom"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="status" label="状态" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <el-tag type="info" v-if="row.status==0">未分派</el-tag>
            <el-tag v-else-if="row.status==1">已分派</el-tag>
            <el-tag type="warning" v-else-if="row.status==2">实施中</el-tag>
            <el-tag type="success" v-else-if="row.status==3">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="implementContent"
          label="实施内容"
          sortable="custom"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="expectImplementBeginTime"
          label="预计实施时间"
          sortable="custom"
          width="160"
        >
          <template slot-scope="{row}">
            开始：{{row.expectDateBegin|toDateString}}
            <br />
            结束：{{row.expectDateEnd|toDateString}}
          </template>
        </el-table-column>
        <el-table-column
          prop="expectPeopleNumber"
          label="预计实施人数"
          align="center"
          sortable="custom"
          width="120"
        ></el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <item-details ref="itemDetails" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xm/task";
import itemDetails from "@/components/xm/contractImplementItem/details";
import customerTypeSelect from "@/components/sys/baseData/customerType/select";
import metacilTypeSelect from "@/components/sys/baseData/metacilType/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    itemDetails,
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
        address: "",
        contact: "",
        contactPhone: "",
        status: "",
        content: "",
        customerTypeId: "",
        businessType: "",
        frequency: "",
        expectImplementBeginDateBegin: "",
        expectImplementBeginDateEnd: "",
        expectImplementEndDateBegin: "",
        expectImplementEndDateEnd: ""
      },
      api
    };
  },
  methods: {
    openDetails(id) {
      this.$refs.itemDetails.openDetailsById(id);
    }
  }
};
</script>