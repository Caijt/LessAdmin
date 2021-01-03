<template>
  <div>
    <div style="margin-bottom:5px">
      <el-button type="primary" @click="add()">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="收款时间" prop="receiptDate">
        <template slot-scope="{row}">{{row.receiptDate|toDateString}}</template>
      </el-table-column>
      <el-table-column label="收款类型" prop="receiptTypeName" />
      <el-table-column label="收款金额" prop="receiptAmount" />
      <el-table-column label="收款方式" prop="receiptMethodName" />
      <el-table-column label="操作" width="60px">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-Dialog :in-dialog="inDialog" ref="editDialog" @saved="onSaved" />
  </div>
</template>
<script>
import editDialog from "./editDialog";
export default {
  components: {
    editDialog
  },
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
      editItem: null
    };
  },
  methods: {
    onSaved(data) {
      if (this.editItem != null) {
        this.editItem.receiptDate = data.receiptDate;
        this.editItem.receiptTypeId = data.receiptTypeId;
        this.editItem.receiptTypeName = data.receiptTypeName;
        this.editItem.receiptAmount = data.receiptAmount;
        this.editItem.receiptMethodId = data.receiptMethodId;
        this.editItem.receiptMethodName = data.receiptMethodName;
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
    del(row) {},
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
    },
    clear() {
      this.data = [];
    },
    setData(data) {
      this.data = data;
    }
  }
};
</script>