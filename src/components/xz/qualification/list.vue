<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="资质"
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
        <el-form-item label="标题">
          <el-input v-model.trim="queryParams.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model.trim="queryParams.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-row style="width:300px">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model.trim="queryParams.validDateBegin"
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
                  v-model.trim="queryParams.validDateEnd"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" clearable>
            <el-option label="在档" :value="0"></el-option>
            <el-option label="外借" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="title" label="标题" sortable="custom" min-width="100"></el-table-column>
        <el-table-column prop="type" label="类型" sortable="custom" width="150"></el-table-column>
        <el-table-column prop="validTime" width="140" label="有效时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.validTime | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" sortable="custom" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.status==0" type="success">在档</el-tag>
            <el-tag v-else type="danger">外借</el-tag>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/xz/qualification";

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
        title: "",
        type: "",
        status: "",
        validDateBegin: "",
        validDateEnd: ""
      },
      api
    };
  },
  methods: {
    openReadEmployee() {
      this.$refs.readEmployee.open();
    },
    openUnreadEmployee() {
      this.$refs.unreadEmployee.open();
    }
  }
};
</script>