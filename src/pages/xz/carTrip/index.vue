<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="reload">
      <el-tab-pane label="执行中" name="todo"></el-tab-pane>
      <el-tab-pane label="已回车" name="done"></el-tab-pane>
    </el-tabs>
    <list ref="list" :disabled="!$permission.canRead()">
      <el-table-column
        slot="column"
        label="操作"
        fixed="right"
        align="center"
        width="150"
        v-show="tabName=='todo'"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            @click="changeDriver(row)"
            :disabled="row.departTime!=null"
          >变更</el-button>
          <el-button
            size="mini"
            type="text"
            @click="departCar(row)"
            :disabled="row.departTime!=null"
          >发车</el-button>
          <el-button
            size="mini"
            type="text"
            @click="returnCar(row)"
            :disabled="row.returnTime!=null || row.departTime==null"
          >回车</el-button>
          <el-button
            size="mini"
            type="text"
            @click="cancelCar(row)"
            :disabled="row.returnTime!=null || row.departTime==null"
          >取消</el-button>
        </template>
      </el-table-column>
    </list>
    <return-dialog ref="returnDialog" @close-saved="reload" />
    <change-dialog ref="changeDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/xz/carTrip/list";
import curdMixins from "@/mixins/curd";
import returnDialog from "@/components/xz/carTrip/returnEditDialog";
import changeDialog from "@/components/xz/carTrip/changeEditDialog";
import api from "@/api/xz/carTrip";
export default {
  components: {
    list,
    returnDialog,
    changeDialog
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
        isReturn: this.tabName == "todo" ? false : true
      });
    },
    returnCar(row) {
      this.$refs.returnDialog.openEdit(row);
    },
    changeDriver(row) {
      this.$refs.changeDialog.openEdit(row);
    },
    departCar(row) {
      this.$msgbox({
        title: "提示",
        message: "您确定要发车吗？",
        type: "warning",
        showCancelButton: true
      }).then(() => {
        api.departCar(row.id).then(res => {
          this.reload();
        });
      });
    },
    cancelCar(row) {
      this.$msgbox({
        title: "提示",
        message: "您确定取消该车辆的调度吗？可在调度管理中重新进行车辆调度",
        type: "warning",
        showCancelButton: true
      }).then(() => {
        api.cancelCar(row.id).then(res => {
          this.reload();
        });
      });
    }
  }
};
</script>