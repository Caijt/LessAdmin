<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="维修记录"
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
          <el-form-item label="器械编号">
            <el-input v-model.trim="queryParams.apparatusNo" clearable></el-input>
          </el-form-item>
          <el-form-item label="器械名称">
            <el-input v-model.trim="queryParams.apparatusName" clearable></el-input>
          </el-form-item>
          <el-form-item label="维修情况">
            <el-input v-model.trim="queryParams.content" clearable></el-input>
          </el-form-item>
          <el-form-item label="维修结果">
            <el-select v-model="queryParams.result" clearable>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="报废" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="维修日期">
          <el-date-picker
            v-model.trim="queryParams.repairDateBegin"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model.trim="queryParams.repairDateEnd"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </div>
      <template slot="table">
        <el-table-column prop="apparatusNo" label="维修器械编号" width="150" show-overflow-tooltip />
        <el-table-column prop="apparatusName" label="器械名称" width="150" show-overflow-tooltip />
        <el-table-column prop="repairTime" width="140" label="维修时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.repairTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="apparatusStatusName" label="所处状态" width="150" show-overflow-tooltip />
        <el-table-column prop="useEmployeeName" label="领用人员" width="150" show-overflow-tooltip />
        <el-table-column prop="useDepName" label="领用部门" width="150" show-overflow-tooltip />
        <el-table-column prop="content" label="维修情况" min-width="120" show-overflow-tooltip />
        <el-table-column prop="result" label="维修结果" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.result==0">正常</el-tag>
            <el-tag type="danger" v-else>报废</el-tag>
          </template>
        </el-table-column>

        <!-- slot[column] -->
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/qx/repairRecord";
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
        apparatusNo: "",
        apparatusName: "",
        content: "",
        result: "",
        repairDateBegin: "",
        repairDateEnd: ""
      },
      api
    };
  },
  methods: {
    openItemListDialog(returnRecordId) {
      this.$refs.itemListDialog.open().then(that => {
        that.getData({ returnRecordId });
      });
    }
  }
};
</script>