<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="领用记录"
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
        <div>
          <el-form-item label="流水号">
            <el-input v-model.trim="queryParams.no" clearable></el-input>
          </el-form-item>
          <el-form-item label="领用人">
            <el-input v-model.trim="queryParams.useEmployeeName" clearable></el-input>
          </el-form-item>
          <el-form-item label="领用部门">
            <el-input v-model.trim="queryParams.useDepName" clearable></el-input>
          </el-form-item>
          <el-form-item label="领用原因">
            <el-input v-model.trim="queryParams.reason" clearable></el-input>
          </el-form-item>
        </div>
        <el-form-item label="领用日期">
          <el-date-picker
            v-model.trim="queryParams.useDateBegin"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model.trim="queryParams.useDateEnd"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="no" label="流水号" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="useEmployeeName" label="领用人" min-width="180" show-overflow-tooltip />
        <el-table-column prop="useDepName" label="领用部门" width="180" show-overflow-tooltip />
        <el-table-column prop="reason" label="领用原因" width="180" show-overflow-tooltip />
        <el-table-column prop="useTime" width="140" label="领用时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.useTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="领用数量" width="100" sortable="custom" align="center">
          <template slot-scope="{row}">
            <span class="c-link" @click="openItemListDialog(row.id)">{{row.amount}}</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <item-list-dialog ref="itemListDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import itemListDialog from "./itemListDialog";
import api from "@/api/qx/useRecord";
export default {
  mixins: [listMixin],
  components: {
    list,
    itemListDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        no: "",
        useEmployeeName: "",
        useDepName: "",
        useDateBegin: "",
        reason: "",
        useDateEnd: ""
      },
      api
    };
  },
  methods: {
    openItemListDialog(useRecordId) {
      this.$refs.itemListDialog.open().then(that => {
        that.getData({ useRecordId });
      });
    }
  }
};
</script>