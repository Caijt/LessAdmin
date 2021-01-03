<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="员工档案"
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
          <el-form-item label="状态">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="试用员工" :value="0"></el-option>
              <el-option label="正式员工" :value="1"></el-option>
              <el-option label="离职员工" :value="2" v-if="queryParams.showDimission"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="queryParams.gender" clearable>
              <el-option label="男" :value="false"></el-option>
              <el-option label="女" :value="true"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="岗位">
            <job-select v-model="queryParams.jobId" />
          </el-form-item>
          <el-form-item label="职务">
            <post-select v-model="queryParams.postId" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model.trim="queryParams.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model.trim="queryParams.school" clearable></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学历">
            <el-input v-model.trim="queryParams.education" clearable></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model.trim="queryParams.major" clearable></el-input>
          </el-form-item>
          <el-form-item label="入职日期">
            <el-date-picker
              v-model.trim="queryParams.entryDateBegin"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model.trim="queryParams.entryDateEnd"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <template v-if="isDelete">
            <el-form-item label="删除日期">
              <el-date-picker
                v-model.trim="queryParams.deleteDateBegin"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="至">
              <el-date-picker
                v-model.trim="queryParams.deleteDateEnd"
                placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </template>
          <el-form-item label="显示离职">
            <el-switch v-model="queryParams.showDimission"></el-switch>
          </el-form-item>
        </div>
      </template>
      <template slot="table">
        <el-table-column
          prop="deleteTime"
          label="删除时间"
          width="140"
          sortable="custom"
          v-if="isDelete"
        >
          <template slot-scope="{row}">
            <span>{{ row.deleteTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="员工姓名" sortable="custom" min-width="100">
          <template slot-scope="{row}">
            <span class="c-link" @click="openDetails(row)">{{row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" sortable="custom" width="80" align="center">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.gender">女</el-tag>
            <el-tag type="primary" v-else>男</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isLeader" label="级别" sortable="custom" min-width="100">
          <template slot-scope="{row}">{{row.isLeader?"领导":"普通员工"}}</template>
        </el-table-column>
        <el-table-column prop="depName" width="100" label="所属部门" show-overflow-tooltip />
        <el-table-column prop="postName" label="职务" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="jobName" label="岗位" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" sortable="custom" align="center" width="70"></el-table-column>
        <el-table-column prop="major" label="专业" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" sortable="custom" width="80" align="center">
          <template slot-scope="{row}">
            <el-tag type="warning" v-if="row.status==0">试用员工</el-tag>
            <el-tag type="success" v-else-if="row.status==1">正式员工</el-tag>
            <el-tag type="danger" v-else-if="row.status==2">离职员工</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{row.entryDate|toDateString}}</span>
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
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <dep-dialog ref="depDialog" :in-dialog="inDialog" select @select="setDep" />
    <employee-details ref="employeeDetails" :in-dialog="inDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/employee";
import depDialog from "@/components/hr/department/treeDialog";
import employeeDetails from "./details";
import jobSelect from "@/components/sys/baseData/job/select";
import postSelect from "@/components/sys/baseData/post/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    depDialog,
    employeeDetails,
    jobSelect,
    postSelect
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
        isDelete: this.isDelete
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