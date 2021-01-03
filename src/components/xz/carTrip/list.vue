<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="车辆行程"
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
      delete-confirm-text="您确定要撤销此申请单吗？撤销后将删除此单数据"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="车牌号码">
          <el-input v-model.trim="queryParams.carLicensePlate" clearable></el-input>
        </el-form-item>
        <el-form-item label="出行司机">
          <el-input v-model.trim="queryParams.driverName" clearable></el-input>
        </el-form-item>
        <el-form-item label="出行日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.travelDateBegin"
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
                  v-model.trim="queryParams.travelDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="申请单号">
          <el-input v-model.trim="queryParams.applicationNo" clearable></el-input>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="carLicensePlate" label="车牌号码" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="driverName" label="出行司机" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="driverPhone" label="联系电话" sortable="custom" width="120"></el-table-column>
        <el-table-column prop="departTime" label="出发时间" sortable="custom" width="150">
          <template slot-scope="{row}">
            <span v-if="row.departTime">{{row.departTime}}</span>
            <el-tag v-else type="warning">未发车</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="returnTime" label="回车时间" sortable="custom" width="150">
          <template slot-scope="{row}">
            <span v-if="row.returnTime">{{row.returnTime}}</span>
            <el-tag v-else type="warning">未回车</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mileage" label="回车公里数" align="center" sortable="custom"  width="120">
          <template slot-scope="{row}">
            <span v-if="row.mileage">{{row.mileage}}公里</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="dispatchStartTime" label="调度发车时间" sortable="custom" width="150">
          <template slot-scope="{row}">{{row.dispatchStartTime| toShortDatetimeString}}</template>
        </el-table-column>
        <el-table-column prop="applicationAmount" label="对应申请单" width="100" align="center">
          <template slot-scope="{row}">
            <span class="c-link" @click="openApplicationDialog(row.carDispatchId)">{{row.applicationAmount}}</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <application-dialog :in-dialog="inDialog" ref="applicationDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xz/carTrip";
import applicationDialog from "@/components/xz/carDispatch/listDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    applicationDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        carLicensePlate: "",
        driverName: "",
        travelDateBegin:"",
        travelDateEnd:"",
        applicationNo:""
      },
      api
    };
  },
  methods: {
    openApplicationDialog(carDispatchId) {
      this.$refs.applicationDialog.open().then(that => {
        that.getData({ carDispatchId });
      });
    }
  }
};
</script>