<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="实施记录"
      :border="false"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :show-toolbar="showToolbar"
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-list-func="api.getList"
      :delete-func="api.deleteById"
      @deleted="$emit('deleted')"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="toolbar-right">
        <slot name="toolbar-right"></slot>
      </template>
      <template slot="query">
        <el-form-item label="客户名称">
          <el-input v-model.trim="queryParams.customerName" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="queryParams.projectName" clearable></el-input>
        </el-form-item>
        <el-form-item label="款项类别">
          <el-select v-model="queryParams.isQualified" clearable>
            <el-option label="合格" :value="true"></el-option>
            <el-option label="不合格" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column label="实施日期" width="100" prop="implementDate">
          <template slot-scope="{row}">{{row.implementDate|toDateString}}</template>
        </el-table-column>
        <el-table-column label="实施结果" width="100" align="center" prop="isFinish">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.isFinish">已完成</el-tag>
            <el-tag type="warning" v-else>实施中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实施情况" min-width="100" prop="content"></el-table-column>
        <el-table-column label="现场图片" width="150" align="center">
          <template slot-scope="{row}">
            <attach-img class="__img" v-if="row.firstAttachId" :id="row.firstAttachId" @click="openAttachDialog(row)"/>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <slot name="column" />
      </template>
    </list>
    <attach-dialog :in-dialog="inDialog" ref="attachDialog"/>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xm/taskImplement";
import attachImg from "@/components/common/attach/image";
import attachDialog from "@/components/common/attach/listDialog";

export default {
  mixins: [listMixin],
  components: {
    list,
    attachImg,
    attachDialog
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
        status: ""
      },
      queryParamsLabel: {
        depName: ""
      },
      api
    };
  },
  methods: {
    openDetails(row) {
      this.$refs.employeeDetails.openDetailsById(row.id);
    },
    openAttachDialog(row){
      this.$refs.attachDialog.open().then(that=>{
        that.getData({entityGuid:row.guid});
      })
    }
  }
};
</script>
<style scoped>
.__img {
  object-fit: cover;
  width:100px;
  height:80px;
  cursor: pointer;
  border-radius: 4px;
}
</style>