<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="日期" width="100" prop="date">
        <template slot-scope="{row}">{{row.date|toDateString}}</template>
      </el-table-column>
      <el-table-column label="考勤班次时间" min-width="100" prop="type">
        <template slot-scope="{row}">{{row.isWork?row.shiftDescription:"不用打卡"}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog :in-dialog="inDialog" ref="editDialog" @saved="onSaved" />
  </div>
</template>
<script>
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
      editItem: null
    };
  },
  methods: {
    onSaved(data) {
      if (this.editItem != null) {
        this.editItem.date = data.date;
        this.editItem.shiftDescription = data.shiftDescription;
        this.editItem.isWork = data.isWork;
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
    },
    setData(data) {
      this.data = data;
    }
  }
};
</script>