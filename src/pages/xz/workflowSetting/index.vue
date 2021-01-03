<template>
  <div>
    <i class="el-icon-loading" v-show="isLoading" style="font-size:36px"></i>
    <el-tabs @tab-click="onTabClick">
      <el-tab-pane v-for="item in workflows" :key="item.id" :label="item.name" v-data:item="item"></el-tab-pane>
    </el-tabs>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button
          @click="create"
          type="primary"
          :disabled="!$permission.canWrite()"
        >创建{{currentWorkflowType?currentWorkflowType.name:""}}</el-button>
      </template>
      <el-table-column
        slot="column"
        label="操作"
        fixed="right"
        align="center"
        width="80"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
          <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xz/workflowSetting/list";
import editDialog from "@/components/xz/workflowSetting/editDialog";
import api from "@/api/xz/workflowSetting";
export default {
  components: {
    list,
    editDialog
  },
  mounted() {
    this.isLoading = true;
    api.getWorkflowTypeList().then(res => {
      this.workflows = res.data;
      this.currentWorkflowType = this.workflows[0];
      this.reload();
      this.isLoading = false;
    });
  },
  data() {
    return {
      currentWorkflowType: null,
      workflows: [],
      isLoading: false
    };
  },
  methods: {
    reload() {
      this.$refs.list.getData({
        workflowTypeId: this.currentWorkflowType.id
      });
    },
    onTabClick(e) {
      this.currentWorkflowType = e.$el.vData.item;
      this.reload();
    },
    create() {
      this.$refs.editDialog.openCreate({
        workflowTypeId: this.currentWorkflowType.id
      });
    },
    edit(row) {
      this.$refs.editDialog.openEdit(row);
    }
  }
};
</script>