<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="考核类型" width="100" prop="type"></el-table-column>
      <el-table-column label="考核描述" min-width="200" prop="description"></el-table-column>
      <el-table-column label="考核分数" width="100" prop="score"></el-table-column>
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
import api from "@/api/hr/kpiSetting";
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
    getData(params) {
      this.loading = true;
      api.getItemList(params).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    copy(params){
      this.loading = true;
      api.getItemList(params).then(res => {
        res.data.forEach(item=>{
          item.id = 0;
          item.kpiSettingId = null;
        });
        this.data = res.data;
        this.loading = false;
      });
    },
    onSaved(data) {
      if (this.editItem != null) {
        this.editItem.type = data.type;
        this.editItem.description = data.description;
        this.editItem.score = data.score;
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
      this.$refs.editDialog.openEdit({ id: -1, ...row });
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