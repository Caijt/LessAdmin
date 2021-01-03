<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="绩效考核"
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
          <el-form-item label="考核名称">
            <el-input v-model.trim="queryParams.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="考核状态">
            <el-select v-model="queryParams.status" clearable>
              <el-option label="未发布" :value="0"></el-option>
              <el-option label="考核中" :value="1"></el-option>
              <el-option label="考核完毕" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考核类型">
            <el-select v-model="queryParams.type" clearable>
              <el-option label="月度考核" :value="0"></el-option>
              <el-option label="季度考核" :value="1"></el-option>
              <el-option label="年度考核" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model.trim="queryParams.submitDateBegin"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model.trim="queryParams.submitDateEnd"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </template>
      <template slot="column">
        <el-table-column prop="name" label="考核名称" sortable="name" min-width="150"></el-table-column>
        <el-table-column prop="status" label="考核状态" sortable="name" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.status==0" type="info">未发布</el-tag>
            <el-tag v-if="row.status==1">考核中</el-tag>
            <el-tag v-if="row.status==2" type="success">考核完毕</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="考核类型" sortable="name" width="100">
          <template slot-scope="{row}">{{row.type==0?"月度":(row.type==1?"季度":"年度")}}考核</template>
        </el-table-column>
        <el-table-column prop="year" label="考核区间" sortable="name" width="120">
          <template
            slot-scope="{row}"
          >{{row.year}}年{{row.type==0?" / 第"+row.month+"月份":(row.type==1?" / 第"+row.quarter+"季度":"")}}</template>
        </el-table-column>
        <el-table-column
          prop="nodeTotal"
          label="考核节点数量"
          width="120"
          sortable="custom"
          align="center"
        >
          <template slot-scope="{row}">
            <span class="c-link" @click="openNodeDialog(row.id)">{{row.nodeTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemTotal"
          label="考核项目数量"
          width="120"
          sortable="custom"
          align="center"
        >
          <template slot-scope="{row}">
            <span class="c-link" @click="openItemDialog(row.id)">{{row.itemTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考核人数" width="100" align="center">
          <el-table-column label="目标" width="70" sortable="custom" align="center">
            <template slot-scope="{row}">
              <el-tag v-if="row.submitTime" type="info">{{getTotal(row.targetEmployeeIds)}}</el-tag>
              <span v-else type="info">-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已发"
            width="70"
            prop="successEmployeeIds"
            sortable="custom"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag v-if="row.submitTime" type="success">{{getTotal(row.successEmployeeIds)}}</el-tag>
              <span v-else type="info">-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="失败"
            width="70"
            prop="failEmployeeIds"
            sortable="custom"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag v-if="row.submitTime" type="danger">{{getTotal(row.failEmployeeIds)}}</el-tag>
              <span v-else type="info">-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="完成"
            width="70"
            prop="finishEmployeeTotal"
            sortable="custom"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag v-if="row.submitTime" type="success">{{row.finishEmployeeTotal}}</el-tag>
              <span v-else type="info">-</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="createTime" width="140" label="创建时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="140" label="最近更新时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.updateTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" width="140" label="发布时间" sortable="custom">
          <template
            slot-scope="{ row }"
          >{{ row.submitTime?$commonJs.toShortDatetimeString(row.submitTime):"未发布" }}</template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <item-dialog ref="itemDialog" :in-dialog="inDialog" />
    <node-dialog ref="nodeDialog" :in-dialog="inDialog" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/hr/kpiSetting";
import itemDialog from "./item/listDialog";
import nodeDialog from "./node/listDialog";
export default {
  mixins: [listMixin],
  components: {
    list,
    itemDialog,
    nodeDialog
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        name: "",
        type: "",
        submitDateBegin: "",
        submitDateEnd: ""
      },
      api
    };
  },
  methods: {
    openItemDialog(kpiSettingId) {
      this.$refs.itemDialog.open().then(that => {
        that.getData({ kpiSettingId });
      });
    },
    openNodeDialog(kpiSettingId) {
      this.$refs.nodeDialog.open().then(that => {
        that.getData({ kpiSettingId });
      });
    },
    getTotal(ids) {
      if (ids) {
        return ids.split(",").length;
      }
      return 0;
    }
  }
};
</script>