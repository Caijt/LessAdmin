<template>
  <div>
    <div>
      <el-button @click="add" type="primary">添加</el-button>
      <el-button @click="removeBatch">删除</el-button>
    </div>
    <el-table
      style="margin:5px 0px"
      v-loading="loading"
      ref="table"
      :data="data"
      @selection-change="onCheckedChange"
    >
      <el-table-column type="selection" width="40" label="#" align="center"></el-table-column>
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column label="任务描述" min-width="100" prop="description"></el-table-column>
      <el-table-column label="实施时间" width="165">
        <template slot-scope="{row}">
          开始：{{row.implementBeginTime | toShortDatetimeString}}
          <br />
          结束：{{row.implementEndTime | toShortDatetimeString}}
        </template>
      </el-table-column>
      <el-table-column label="分派班组" width="150">
        <template slot-scope="{row}">
          <div
            v-for="team in  row.taskTeams"
            :key="team.teamId"
          >{{team.teamName}}{{team.isLead?"（负责）":""}}</div>
        </template>
      </el-table-column>
      <el-table-column label="实施人数" width="100" align="center">
        <template slot-scope="{row}">
          <div v-for="team in  row.taskTeams" :key="team.teamId">{{team.amount}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row,$index)"></el-button>
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
    },
    address:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      data: [],
      checkedRows: [],
      loading: false,
      editIndex: null
    };
  },
  methods: {
    onSaved(data) {
      this.$emit("change");
      if (this.editIndex != null) {
        this.$set(this.data, this.editIndex, data);
      } else {
        this.data.push(data);
      }
    },
    add() {
      this.editIndex = null;
      this.$refs.editDialog.openCreate(this.address);
    },
    edit(row, index) {
      this.editIndex = index;
      this.$refs.editDialog.openEdit({ ...row });
    },
    clear() {
      this.data = [];
    },
    remove(index) {
      this.data.splice(index, 1);
      this.$emit("change")
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