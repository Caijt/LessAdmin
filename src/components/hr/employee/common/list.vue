<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageListInCommon"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="员工姓名">
            <el-input v-model.trim="queryParams.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="员工部门">
            <select-input
              :label="queryParamsLabel.depName"
              v-model="queryParams.depId"
              @click="openDepDialog"
            />
          </el-form-item>
        </div>
      </template>
      <template slot="table">       
        <el-table-column prop="name" label="员工姓名" sortable="custom" min-width="100">        
        </el-table-column>
        <el-table-column prop="depName" width="150" label="所属部门" show-overflow-tooltip />
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
import api from "@/api/hr/employee";
import depDialog from "@/components/hr/department/treeDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    depDialog
  },
  props: {
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        status: "",
        showDimission: this.isDelete,
        gender: "",
        depId: "",
        school: "",
        education: "",
        major: "",
        phone: "",
        mail: "",
        entryDateBegin: "",
        entryDateEnd: "",
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
    setDep(node) {
      this.queryParamsLabel.depName = node.name;
      this.queryParams.depId = node.id;
    },
    openDetails(row) {
      this.$refs.employeeDetails.openDetailsById(row.id);
    }
  }
};
</script>