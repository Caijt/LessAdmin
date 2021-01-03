<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-tooltip content="提取原领用人全部领用器械到调配明细中">
        <el-button @click="pull">提取</el-button>
      </el-tooltip>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table v-loading="loading" ref="table" :data="list" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="器械编号" width="200">
        <template slot-scope="{row}">
          <el-input v-model="row.apparatusNo" @keyup.enter.native="search(row)">
            <el-button slot="append" @click="openApparatusDialog(row)">选择</el-button>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="器械类型" prop="apparatusType"></el-table-column>
      <el-table-column label="器械名称" prop="apparatusName"></el-table-column>
      <el-table-column label="操作" width="60" align="center">
        <template slot-scope="{$index}">
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <apparatus-dialog :in-dialog="inDialog" ref="apparatusDialog" select @select="setApparatus">  </apparatus-dialog>
  </div>
</template>
<script>
import apparatusApi from "@/api/qx/apparatus";
import apparatusDialog from "@/components/qx/apparatus/listDialog";
import api from "@/api/qx/returnRecord";
export default {
  components: { apparatusDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    sourceEmployeeId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      list: [],
      checkedRows: [],
      row: null,
      loading: false
    };
  },
  methods: {
    getData(params) {
      this.loading = true;
      api.getItemList(params).then(res => {
        this.list = res.data;
        this.loading = false;
      });
    },
    getItems() {
      return this.list.map(item => {
        return {
          apparatusId: item.apparatusId
        };
      });
    },
    add() {
      if (!this.sourceEmployeeId) {
        this.$message.warning("请先选择原领用人");
        return;
      }
      this.list.push({
        apparatusId: null,
        apparatusType: "",
        apparatusName: "",
        apparatusNo: ""
      });
    },
    pull() {
      if (!this.sourceEmployeeId) {
        this.$message.warning("请先选择原领用人");
        return;
      }
      this.loading = true;
      apparatusApi
        .getList({ useEmployeeId: this.sourceEmployeeId })
        .then(res => {
          this.list = res.data.map(item => {
            return {
              apparatusId: item.id,
              apparatusType: item.type,
              apparatusName: item.name,
              apparatusNo: item.no
            };
          });
          this.$message.success("已提取原领用人全部领用器械");
          this.loading = false;
        });
    },
    reset() {
      this.list = [];
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    removeBatch() {
      this.checkedRows.forEach(item => {
        let index = this.list.indexOf(item);
        this.remove(index);
      });
    },
    onCheckedChange(rows) {
      this.checkedRows = rows;
    },
    search(row) {
      if (row.useEmployeeId != this.sourceEmployeeId) {
        this.$message.warning("该编号器械不属于原领用人领用的器械");
        return;
      }
      apparatusApi.getByNo(row.apparatusNo).then(res => {
        if (res.data) {
          row.apparatusName = res.data.name;
          row.apparatusType = res.data.type;
          row.apparatusId = res.data.id;
        }
      });
    },
    openApparatusDialog(row) {
      this.row = row;
      let ids = [];
      this.list.forEach(item => {
        if (item.apparatusId != null) {
          ids.push(item.apparatusId);
        }
      });
      this.$refs.apparatusDialog.open().then(that => {
        that.getData({
          notIds: ids,
          useEmployeeId: this.sourceEmployeeId
        });
      });
    },
    setApparatus(row) {
      this.row.apparatusId = row.id;
      this.row.apparatusType = row.type;
      this.row.apparatusName = row.name;
      this.row.apparatusNo = row.no;
      this.$refs.apparatusDialog.close();
    }
  }
};
</script>