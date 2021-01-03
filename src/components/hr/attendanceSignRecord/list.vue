<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="考勤打卡记录"
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
        <el-form-item label="员工姓名">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <dep-select ref="depSelect" v-model="queryParams.depIds" multiple collapse-tags/>
        </el-form-item>
        <el-form-item label="打卡地点">
          <el-input v-model.trim="queryParams.address" clearable></el-input>
        </el-form-item>
        <el-form-item label="打卡日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.signDateBegin"
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
                  v-model.trim="queryParams.signDateEnd"
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
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="depName" width="120" label="部门" show-overflow-tooltip />
        <el-table-column prop="signTime" label="打卡时间" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="address" label="打卡地点" sortable="custom" min-width="120">
          <template slot-scope="{row}">
            <span class="c-link" @click="openMapDialog(row)">{{row.address}}</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <map-dialog :in-dialog="inDialog" ref="mapDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/attendanceSignRecord";
import depSelect from "@/components/hr/department/treeSelect";
import mapDialog from "@/components/common/maps/qq/mapDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    depSelect,
    mapDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        depIds: [],
        signDateBegin: "",
        signDateEnd: "",
        address: ""
      },
      api
    };
  },
  methods: {
    openMapDialog(row) {
      this.$refs.mapDialog.open().then(that => {
        that.setLocation({ lat: row.lat, lng: row.lng });
      });
    }
  }
};
</script>