<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工转正记录"
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
      <template slot="query">
        <div>
          <el-form-item label="员工姓名">
            <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <select-input
              :label="queryParamsLabel.depName"
              v-model="queryParams.depId"
              clearable
              @click="openDepDialog"
            ></select-input>
          </el-form-item>
          <el-form-item label="转正日期">
            <el-date-picker
              v-model.trim="queryParams.regularDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.regularDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="社保日期">
            <el-date-picker
              v-model.trim="queryParams.socialSecurityDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.socialSecurityDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="医保日期">
            <el-date-picker
              v-model.trim="queryParams.healthInsuranceDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.healthInsuranceDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
      </template>
      <template slot="table">
        <el-table-column prop="employeeName" label="员工姓名" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="depName" width="150" label="转正所属部门" show-overflow-tooltip />
        <el-table-column prop="regularPostName" label="转正职务" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="regularJobName" label="转正岗位" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="regularDate" label="转正日期" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{row.regularDate|toDateString}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="passSafetyTest"
          label="通过安全考试"
          sortable="custom"
          width="120"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.passSafetyTest">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="combinedScore"
          label="综合评估得分"
          align="right"
          sortable="custom"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="socialSecurityDate"
          label="办理社保日期"
          sortable="custom"
          width="120"
          align="center"
        >
          <template slot-scope="{row}">
            <span v-if="row.hasSocialSecurity">{{row.socialSecurityDate | toDateString}}</span>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="healthInsuranceDate"
          label="办理医保日期"
          sortable="custom"
          width="120"
          align="center"
        >
          <template slot-scope="{row}">
            <span v-if="row.hasHealthInsurance">{{row.healthInsuranceDate | toDateString}}</span>
            <el-tag type="danger" v-else>否</el-tag>
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
    <dep-dialog ref="depDialog" :in-dialog="inDialog" select @select="setDep" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/regularRecord";
import depDialog from "@/components/hr/department/treeDialog";

export default {
  mixins: [listMixin],
  components: {
    list,
    depDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        employeeName: "",
        depId: "",
        regularDateBegin: "",
        regularDateEnd: "",
        socialSecurityDateBegin: "",
        socialSecurityDateEnd: "",
        healthInsuranceDateBegin: "",
        healthInsuranceDateEnd: ""
      },
      queryParamsLabel: {
        depName: ""
      },
      api
    };
  },
  methods: {
    setDep(dep) {
      this.queryParams.depId = dep.id;
      this.queryParamsLabel.depName = dep.name;
    },
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.getDataOnce();
      });
    }
  }
};
</script>