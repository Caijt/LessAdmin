<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="节假日"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-data-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <div slot="query">
        <el-form-item label="节假日">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.dateBegin"
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
                  v-model.trim="queryParams.dateEnd"
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
        <el-table-column prop="name" label="节假日名称" sortable="custom" width="200"></el-table-column>
        <el-table-column prop="date" label="日期" sortable="custom" min-width="200">
          <template slot-scope="{ row }">{{ row.date | toDateString }}</template>
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
import api from "@/api/hr/attendanceHoliday";
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
        depId: "",
        checkInDateBegin: "",
        checkInDateEnd: "",
        stage: "",
        onlyShowAbnormal: false
      },
      api
    };
  },
  methods: {}
};
</script>