<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="reload">
      <el-tab-pane label="待调度申请" name="todo"></el-tab-pane>
      <el-tab-pane label="已调度" name="done"></el-tab-pane>
    </el-tabs>
    <list ref="list" :disabled="!$permission.canRead()">
      <template slot="toolbar-left">
        <el-button
          type="primary"
          v-show="tabName=='todo'"
          @click="dispatch"
          :disabled="!$permission.canWrite()"
        >车辆调度</el-button>
      </template>
      <template slot="column">
        <el-table-column
          type="selection"
          :selectable="(row)=>row.status==2"
          fixed
          align="center"
          width="40"
          v-if="tabName=='todo'"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="60"
          v-if="$permission.canReview()"
        >
          <template slot-scope="{row}">
            <el-button size="mini" type="text" @click="review(row)" :disabled="row.status!=0">审核</el-button>
          </template>
        </el-table-column>
      </template>
    </list>
    <review-dialog ref="reviewDialog" @close-saved="reload" />
    <dispatch-dialog ref="dispatchDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xz/carDispatch/list";
import reviewDialog from "@/components/xz/carDispatch/reviewDialog";
import dispatchDialog from "@/components/xz/carDispatch/dispatchDialog";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    reviewDialog,
    dispatchDialog
  },
  mixins: [curdMixins],
  data() {
    return {
      tabName: "todo"
    };
  },
  methods: {
    reload() {
      this.$refs.list.getData({
        isTodo: this.tabName == "todo" ? true : false
      });
    },
    dispatch() {
      let rows = this.$refs.list.getCheckedRowsWithMessage();
      if (!rows) {
        return false;
      }
      this.$refs.dispatchDialog.openEdit({
        applications: rows
      });
    },
    review(row) {
      this.$refs.reviewDialog.openEdit(row);
    }
  }
};
</script>