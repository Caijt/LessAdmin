<template>
  <div>
    <div style="display:flex;">
      <div style="flex:1">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="removeBatch">删除</el-button>
      </div>
      <div style="flex:0">
        <el-button type="text" icon="el-icon-warning-outline" @click="showTips=true"></el-button>
      </div>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column type="index" label="#" width="35" align="center"></el-table-column>
      <el-table-column label="节点选人类型" width="200" prop="isFixedType">
        <template slot-scope="{row}">
          <span v-if="row.nodePickType==0">匹配发起人领导</span>
          <span v-else-if="row.nodePickType==1">匹配处理人领导</span>
          <span v-else>指定领导</span>
        </template>
      </el-table-column>
      <el-table-column label="领导级别 / 领导名字">
        <template slot-scope="{row}">
          <span v-if="row.nodePickType==2">{{row.employeeName}}</span>
          <span v-else>{{row.leaderLevel==0?"本":"上"+row.leaderLevel}}级部门领导</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog :in-dialog="inDialog" ref="editDialog" @saved="onSaved" />
    <el-dialog
      class="c-dialog-fixed"
      title="考核流程说明"
      append-to-body
      :visible.sync="showTips"
      width="500px"
    >
      <div style="line-height:1.5;">
        <div style="margin-bottom:10px">绩效考核发布后会根据设置的考核流程节点依次执行审批考核。</div>
        <div style="margin-bottom:10px">
          <b>节点类型说明</b>
        </div>
        <div style="text-indent:2em;margin-bottom:10px">
          <b>被考核人领导</b>：是按被考核人的部门领导进行选人，第N级领导，代表被考核人的第N次上级部门领导，流程节点会根据不同情况选择最适合的人员进行审批，如果对应的部门领导为空，就会继续往上级部门领导寻找，如果审批人与上一个审批人或跟考核人是同一个，还会继续往上级领导寻找，直到找不到就会跳到下一个节点，执行下一个节点的审批；
        </div>
        <div style="text-indent:2em;">
          <b>指定领导</b>：就是直接指定固定的人员，这个不会自动进行情况筛选，所以就算审批人与考核人为同一个人，也不会省略。
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/xz/workflowSetting";
import editDialog from "./editDialog";
export default {
  components: { editDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      checkedRows: [],
      loading: false,
      editItem: null,
      showTips: false
    };
  },
  methods: {
    getData(params) {
      this.loading = true;
      api.getNodeList(params).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    onSaved(data) {
      if (this.editItem != null) {
        this.editItem.nodePickType = data.nodePickType;
        this.editItem.leaderLevel = data.leaderLevel;
        this.editItem.employeeId = data.employeeId;
        this.editItem.employeeName = data.employeeName;
      } else {
        this.data.push(data);
      }
    },
    add() {
      this.editItem = null;
      this.$refs.editDialog.openCreate();
    },
    edit(row) {
      this.editItem = row;
      this.$refs.editDialog.openEdit({ ...row, id: -1 });
    },
    clear() {
      this.data = [];
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    removeBatch() {
      this.checkedRows.forEach(item => {
        let index = this.data.indexOf(item);
        this.remove(index);
      });
    },
    onCheckedChange(rows) {
      this.checkedRows = rows;
    }
  }
};
</script>