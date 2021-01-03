<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工离职记录"
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
        <el-form-item label="员工名称">
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="离职类型">
          <dimission-type-select v-model="queryParams.types" clearable multiple />
        </el-form-item>
        <el-form-item label="部门">
          <select-input
            :label="queryParamsLabel.depName"
            v-model="queryParams.depId"
            clearable
            @click="openDepDialog"
          />
        </el-form-item>
        <el-form-item label="离职日期">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.dimissionDateBegin"
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
                  v-model.trim="queryParams.dimissionDateEnd"
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
        <el-table-column prop="depName" width="120" label="所属部门" show-overflow-tooltip />
        <el-table-column prop="type" label="离职类型" sortable="custom" width="100">
          <template slot-scope="{row}">{{api.getTypeNameById(row.type)}}</template>
        </el-table-column>
        <el-table-column prop="dimissionDate" label="离职日期" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{row.dimissionDate|toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="离职原因" sortable="custom" min-width="100"></el-table-column>
        <el-table-column
          prop="handover"
          label="本部门交接情况"
          align="center"
          sortable="custom"
          width="130"
        >
          <template slot-scope="{row}">
            <el-tag v-if="row.handover" type="success">完成</el-tag>
            <el-tag v-else type="danger">未完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hrFormalities" label="人事部手续办理情况" sortable="custom" width="160">
          <template slot-scope="{row}">{{api.getHrFormalitiesText(row.hrFormalities)}}</template>
        </el-table-column>
        <el-table-column
          prop="administrationFormalities"
          label="行政部手续办理情况"
          sortable="custom"
          width="160"
        >
          <template
            slot-scope="{row}"
          >{{api.getAdministrationFormalitiesText(row.administrationFormalities)}}</template>
        </el-table-column>
        <el-table-column
          prop="financeFormalities"
          label="财务部手续办理情况"
          align="center"
          sortable="custom"
          width="160"
        >
          <template slot-scope="{row}">
            <el-tag v-if="row.financeFormalities" type="success">完成</el-tag>
            <el-tag v-else type="danger">未完成</el-tag>
          </template>
        </el-table-column>
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
    <dep-dialog ref="depDialog" select @select="setDep" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/dimissionRecord";
import depDialog from "@/components/hr/department/treeDialog";
import dimissionTypeSelect from "./dimissionTypeSelect";

export default {
  mixins: [listMixin],
  components: {
    list,
    depDialog,
    dimissionTypeSelect
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        depId: "",
        types: [],
        dimissionDateBegin:"",
        dimissionDateEnd:""
      },
      queryParamsLabel: {
        depName: ""
      },
      api
    };
  },
  methods: {
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    setDep(dep) {
      this.queryParams.depId = dep.id;
      this.queryParamsLabel.depName = dep.name;
    }
  }
};
</script>