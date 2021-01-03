<template>
  <common-dialog
    ref="dialog"
    width="600px"
    title="登录日志"
    :inDialog="inDialog"
    :save-func="api.changePassword"
    @opened="onOpened"
    @close-saved="$emit('close-saved')"
  >
    <list ref="list" :get-data-func="api.getLoginLog">
      <template #column>
        <el-table-column width="140" label="登录时间" sortable="custom">
          <template v-slot="{ row }">
            <span>{{ row.createTime | toShortDatetimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column label="登录Ip" prop="ipAddress"></el-table-column>
      </template>
    </list>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import list from "@/components/common/list";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/common/auth";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, list },
  data() {
    return {
      data: {
        oldPassword: "",
        newPassword: "",
      },
      api,
    };
  },
  methods: {
    onOpened() {
      this.$refs.list.getData();
    },
  },
};
</script>