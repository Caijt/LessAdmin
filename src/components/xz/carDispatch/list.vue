<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="用车申请单"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getApplicationPageList"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="申请单号">
          <el-input v-model.trim="queryParams.no" clearable></el-input>
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-input v-model.trim="queryParams.carLicensePlate" clearable></el-input>
        </el-form-item>        
        <el-form-item label="用车日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.useDateBegin"
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
                  v-model.trim="queryParams.useDateEnd"
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
        <el-table-column prop="no" label="申请单号" sortable="custom" width="110">
          <template slot-scope="{row}">
            <span class="c-link" @click="openDetails(row.id)">{{row.no}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" sortable="custom" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag type="info" v-if="row.status==0">未审批</el-tag>
            <el-tooltip v-else :content="row.approvalRemark" :disabled="!row.approvalRemark">
              <el-tag type="danger" v-if="row.status==1">审批不通过</el-tag>
              <el-tag type="success" v-else>审批通过</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="beginUseTime" label="用车时间" sortable="custom" width="180">
          <template slot-scope="{row}">
            开始：{{row.beginUseTime| toShortDatetimeString}}
            <br />
            结束：{{row.endUseTime| toShortDatetimeString}}
          </template>
        </el-table-column>
        <el-table-column prop="startLocation" label="发车地点" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="targetLocation" label="目标地点" sortable="custom" width="100"></el-table-column>
        <el-table-column
          prop="reason"
          label="用车原因"
          sortable="custom"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="passengerAmount"
          label="用车人数"
          sortable="custom"
          width="100"
          align="center"
        >
          <template slot-scope="{row}">
            <el-popover>
              <div v-for="(item,index) in row.useEmployeeNames" :key="index">
                <el-button type="text" icon="el-icon-user-solid">{{item}}</el-button>
              </div>
              <el-button slot="reference" type="text">{{row.passengerAmount}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" sortable="custom" width="140">
          <template slot-scope="{row}">{{row.createTime|toShortDatetimeString}}</template>
        </el-table-column>
        <el-table-column prop="createUserName" label="申请人" sortable="custom" width="100"></el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <application-details :in-dialog="inDialog" ref="applicationDetails"/>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xz/carDispatch";
import applicationDetails from "@/components/xz/carApplication/details";

export default {
  mixins: [listMixin],
  components: {
    list,
    applicationDetails
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        no: "",
        carLicensePlate:""
      },
      api
    };
  },
  methods: {
    openDetails(id){
      this.$refs.applicationDetails.openDetailsById(id);
    }
  }
};
</script>