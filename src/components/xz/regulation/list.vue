<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="规章制度"
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
          <el-input v-model.trim="queryParams.employeeName" clearable></el-input>
        </el-form-item>
      </div>
      <template slot="column">
        <el-table-column prop="title" label="标题" sortable="custom" min-width="100">
          <template slot-scope="{row}">
            <span class="c-link" @click="openDetails(row.id)">{{row.title}}</span>
            <el-tag v-if="row.isTop" class="c-mg-l-5p" type="danger">置顶</el-tag>
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
        <el-table-column prop="submitTime" width="140" label="发布时间" sortable="custom">
          <template slot-scope="{ row }">
            <span>{{ row.submitTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
    <read-employee :in-dialog="inDialog" ref="readEmployee" />
    <unread-employee :in-dialog="inDialog" ref="unreadEmployee" />
    <notice-details :in-dialog="inDialog" ref="noticeDetails" />
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import readEmployee from "./readEmployee";
import unreadEmployee from "./unreadEmployee";
import api from "@/api/xz/regulation";
import noticeDetails from "./details";

export default {
  mixins: [listMixin],
  components: {
    list,
    readEmployee,
    unreadEmployee,
    noticeDetails
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        title: ""
      },
      api
    };
  },
  methods: {
    openReadEmployee(regulationId) {
      this.$refs.readEmployee.open({ regulationId });
    },
    openUnreadEmployee(regulationId) {
      this.$refs.unreadEmployee.open({ regulationId });
    },
    openDetails(id) {
      this.$refs.noticeDetails.openDetailsById(id);
    }
  }
};
</script>