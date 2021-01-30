<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      id-key="id"
      ref="list"
      unit="菜单"
      :disabled="disabled"
      expand-all-row
      show-index
      :show-query="false"
      :show-checkbox="showCheckbox"
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="false"
      :get-data-func="getDataFunc"
      :delete-func="api.deleteById"
    >
      <template #toolbar-left>
        <slot name="toolbar-left"></slot>
      </template>
      <template #query>
        <el-form-item label="菜单名称">
          <el-input v-model.trim="queryParams.name" clearable></el-input>
        </el-form-item>
      </template>
      <template #column>
        <el-table-column prop="name" label="菜单名称" min-width="150">
          <template v-slot="{row}">
            {{row.name}}
            <span class="c-text-grey" v-show="row.isPage">（子页面）</span>
          </template>
        </el-table-column>
        <el-table-column prop="order" width="80" label="排序值" align="center" />
        <el-table-column prop="icon" width="80" label="图标" align="center">
          <template v-slot="{row}">
            <i :class="row.icon||$store.state.sys.config.MENU_DEFAULT_ICON"></i>
          </template>
        </el-table-column>
        <el-table-column prop="path" width="120" label="路径值" show-overflow-tooltip />
        <el-table-column width="120" label="菜单权限">
          <template v-slot="{row}">
            <el-tag v-if="row.hasRead">读</el-tag>
            <el-tag v-if="row.hasWrite">写</el-tag>
            <el-tag v-if="row.hasReview">审核</el-tag>
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
import api from "@/api/sys/menu";
export default {
  mixins: [listMixin],
  components: {
    list
  },
  props: {},
  data() {
    return {
      api,
      //查询条件字段
      queryParams: {
        name: ""
      },
      sourceData: null
    };
  },
  methods: {
    getDataFunc(params) {
      return new Promise((resolve, reject) => {
        this.api.getList(params).then(res => {
          this.sourceData = res.data;
          let data = this.$commonJs.toTreeData(res.data);
          resolve({
            data,
            code:0
          });
        });
      });
    }
  }
};
</script>