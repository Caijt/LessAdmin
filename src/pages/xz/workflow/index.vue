<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="initData">
      <el-tab-pane label="我的申请" name="myApplication">
        <application-list ref="myApplicationList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建申请单</el-button>
          </template>
          <el-table-column
            slot="column"
            label="操作"
            fixed="right"
            align="center"
            width="60"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="delApplication(row)"
                :disabled="row.isEnd"
              ></el-button>
            </template>
          </el-table-column>
        </application-list>
      </el-tab-pane>
      <el-tab-pane label="我的审批" name="myApproval">
        <approval-list ref="myApprovalList" :disabled="!$permission.canRead()">
          <el-table-column
            slot="column"
            label="操作"
            fixed="right"
            align="center"
            width="60"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button
                size="mini"
                type="text"
                @click="approval(row)"
                :disabled="row.handleTime!=null"
              >审批</el-button>
            </template>
          </el-table-column>
        </approval-list>
      </el-tab-pane>
    </el-tabs>
    <application-dialog ref="applicationDialog" @close-saved="reload" />
    <approval-dialog ref="approvalDialog" @close-saved="reload" />
  </div>
</template>
<script>
import applicationList from "@/components/xz/workflow/myApplicationList";
import approvalList from "@/components/xz/workflow/myApprovalList";
import applicationDialog from "@/components/xz/workflow/applicationDialog";
import approvalDialog from "@/components/xz/workflow/approvalDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    applicationList,
    approvalList,
    applicationDialog,
    approvalDialog
  },
  mixins: [curdMixins],
  data() {
    return {
      tabName: "myApplication"
    };
  },
  methods: {
    initData() {
      this.$refs[this.tabName + "List"].getDataOnce();
    },
    reload() {
      this.$refs[this.tabName + "List"].getData();
    },
    create() {
      this.$refs.applicationDialog.openCreate();
    },
    delApplication(row) {
      this.$refs.myApplicationList.delete(row);
    },
    approval(row) {
      this.$refs.approvalDialog.openEdit(row);
    }
  }
};
</script>