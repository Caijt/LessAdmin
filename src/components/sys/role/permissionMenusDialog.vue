<template>
  <div>
    <common-dialog
      ref="dialog"
      width="700px"
      title="菜单权限"
      id-key="id"
      :inDialog="inDialog"
      :save-func="api.save"
      :get-data-func="api.getEditById"
      @opened="onOpened"
      @closed="onClosed"
      @close-saved="$emit('close-saved')"
    >
      <list
        id-key="id"
        ref="list"
        unit="菜单"
        :disabled="disabled"
        expand-all-row
        show-index
        :show-query="false"
        :page="false"
      >
        <template #toolbar-left>
          <slot name="toolbar-left"></slot>
        </template>
        <template #column>
          <el-table-column prop="name" label="菜单名称" min-width="150">
            <template v-slot="{row}">
              {{row.name}}
              <span class="c-text-grey" v-show="row.isPage">（子页面）</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="菜单权限">
            <template v-slot="{row}">
              <el-tag v-if="row.canRead">读</el-tag>
              <el-tag v-if="row.canWrite">写</el-tag>
              <el-tag v-if="row.canReview">审核</el-tag>
            </template>
          </el-table-column>
          <!-- slot[column] -->
          <slot name="column"></slot>
          <!--/ slot[column]-->
        </template>
      </list>
    </common-dialog>
  </div>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/sys/role";
import list from "@/components/common/list";
import listMixin from "@/mixins/list";

export default {
  mixins: [listMixin, editDialogMixin],
  components: { list, commonDialog },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        remarks: "",
        isAllRange: false,
        roleMenus: null,
      },
      api,
      unit: "角色",
      rules: {
        name: [{ required: true, message: "请填写角色名称" }],
      },
    };
  },
  methods: {
    onClosed() {
      this.$refs.list.clear();
    },
    onOpened(roleId) {
      this.loading();
      api.getRoleMenus(roleId).then((res) => {
        let data = this.$commonJs.toTreeData(res.data);
        this.$refs.list.setData(data);
        this.loading(false);
      });
    },
  },
};
</script>