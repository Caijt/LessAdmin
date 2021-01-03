<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="车辆档案"
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
        <el-form-item label="车牌号码">
          <el-input v-model.trim="queryParams.licensePlate" clearable></el-input>
        </el-form-item>
        <el-form-item label="车辆类型">
          <el-input v-model.trim="queryParams.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" clearable>
            <el-option label="空闲" :value="0"></el-option>
            <el-option label="外出" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="licensePlate" label="车牌号码" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="type" label="车辆类型" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="ratedPassengers" label="乘坐人数" sortable="custom" width="100" align="center"></el-table-column>
        <el-table-column prop="buyDate" label="购入日期" sortable="custom" width="100">
          <template slot-scope="{row}">{{row.buyDate|toDateString}}</template>
        </el-table-column>
        <el-table-column
          prop="mileage"
          label="当前公里数"
          sortable="custom"
          width="120"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="driverName"
          label="常备司机"
          sortable="custom"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="driverPhone"
          label="联系电话"
          sortable="custom"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="状态" sortable="custom" width="80" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.status==0">空闲</el-tag>
            <el-tag type="danger" v-else>外出</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="140" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最近更新时间" width="140" sortable="custom">
          <template slot-scope="{row}">
            <span>{{ row.updateTime | toShortDatetimeString }}</span>
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
import api from "@/api/xz/car";

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
        licensePlate: "",
        type:"",
        status:""
      },
      api
    };
  },
  methods: {}
};
</script>