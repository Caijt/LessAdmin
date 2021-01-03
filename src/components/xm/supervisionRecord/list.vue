<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="质量监督记录"
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
        <el-form-item label="客户名称">
          <el-input v-model.trim="queryParams.customerName" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="queryParams.projectName" clearable></el-input>
        </el-form-item>
        <el-form-item label="监督结果">
          <el-select v-model="queryParams.isQualified" clearable>
            <el-option label="合格" :value="true"></el-option>
            <el-option label="不合格" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监督时间">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.supervisionDateBegin"
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
                  v-model.trim="queryParams.supervisionDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
      <template slot="table">
        <el-table-column prop="customerName" label="客户名称" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="projectName" width="150" label="项目名称" show-overflow-tooltip />
        <el-table-column prop="content" min-width="100" label="监督情况" show-overflow-tooltip />
        <el-table-column prop="isQualified" width="100" label="监督结果" align="center">
          <template slot-scope="{row}">
            <el-tag type="success" v-if="row.isQualified">合格</el-tag>
            <el-tag type="danger" v-else>不合格</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="supervisionTime" width="140" label="监督时间">
          <template slot-scope="{row}">{{row.supervisionTime|toShortDatetimeString}}</template>
        </el-table-column>
        <el-table-column prop="entryDate" label="现场图片" width="150" align="center">
          <template slot-scope="{row}">
            <attach-img
              class="__img"
              v-if="row.firstAttachId"
              :id="row.firstAttachId"
              @click="openAttachDialog(row)"
            />
            <span v-else>无</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <slot name="table"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <attach-dialog title="现场图片" :in-dialog="inDialog" ref="attachDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xm/supervisionRecord";
import attachImg from "@/components/common/attach/image";
import attachDialog from "@/components/common/attach/listDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    attachImg,
    attachDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        customerName: "",
        isQualified: "",
        supervisionDateBegin: "",
        supervisionDateEnd: ""
      },
      api
    };
  },
  methods: {
    openDetails(row) {
      this.$refs.employeeDetails.openDetailsById(row.id);
    },
    openAttachDialog(row) {
      this.$refs.attachDialog.open().then(that => {
        that.getData({ entityGuid: row.guid });
      });
    }
  }
};
</script>
<style scoped>
.__img {
  object-fit: cover;
  width: 100px;
  height: 80px;
  cursor: pointer;
  border-radius: 4px;
}
</style>