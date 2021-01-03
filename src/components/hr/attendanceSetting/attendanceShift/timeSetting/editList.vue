<template>
  <div>
    <div style="display:flex;">
      <div style="flex:1">
        <el-button @click="add" type="primary">添加上下班</el-button>
        <el-button @click="removeBatch">删除</el-button>
      </div>
      <div style="flex:0">
        <el-button type="text" icon="el-icon-warning-outline" @click="showTips=true"></el-button>
      </div>
    </div>
    <el-table
      stripe
      v-loading="loading"
      ref="table"
      :data="data"
      @selection-change="onCheckedChange"
    >
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="#" type="index" width="30"></el-table-column>
      <el-table-column label="上下班时间" min-width="170" align="center">
        <template slot-scope="{row}">
          <div style="margin-bottom:5px">
            上班：
            <el-time-select
              :clearable="false"
              style="width:110px"
              v-model="row.signInTime"
              :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45'
                  }"
              placeholder="选择时间"
            ></el-time-select>
          </div>
          <div>
            下班：
            <el-time-select
              :clearable="false"
              style="width:110px"
              v-model="row.signOutTime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="选择时间"
            ></el-time-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="打卡时间范围" width="265" align="center">
        <template slot-scope="{row}">
          <div style="margin-bottom:5px">
            <el-time-select
              style="width:110px"
              v-model="row.signInBeginTime"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              placeholder="选择时间"
            ></el-time-select>
            <span style="padding:0px 5px">至</span>
            <el-time-select
              style="width:110px"
              v-model="row.signInEndTime"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              placeholder="选择时间"
            ></el-time-select>
          </div>
          <div>
            <el-time-select
              style="width:110px"
              v-model="row.signOutBeginTime"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              placeholder="选择时间"
            ></el-time-select>
            <span style="padding:0px 5px">至</span>
            <el-time-select
              style="width:110px"
              v-model="row.signOutEndTime"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:45'
                }"
              placeholder="选择时间"
            ></el-time-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="休息时间" width="150" align="center">
        <template slot-scope="{row}">
          <div class="_rest-cell">
            <el-checkbox v-model="row.hasRest"></el-checkbox>
            <div>
              <div style="margin-bottom:5px">
                <el-time-select
                  :disabled="!row.hasRest"
                  style="width:110px"
                  v-model="row.restBeginTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45'
                  }"
                  placeholder="选择时间"
                ></el-time-select>
              </div>
              <div>
                <el-time-select
                  :disabled="!row.hasRest"
                  style="width:110px"
                  v-model="row.restEndTime"
                  :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
                  placeholder="选择时间"
                ></el-time-select>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="45" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-dialog
      class="c-dialog-fixed"
      title="上下班说明"
      append-to-body
      :visible.sync="showTips"
      width="500px"
    >
      <div style="line-height:1.5;">
        <div style="margin-bottom:10px">1</div>
        <div style="margin-bottom:10px">
          <b>1</b>
        </div>
        <div style="text-indent:2em;margin-bottom:10px">
          <b>1</b>：2；
        </div>
        <div style="text-indent:2em;">
          <b>2</b>：2。
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/hr/kpiSetting";
export default {
  components: {},
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
      data: [],
      checkedRows: [],
      loading: false,
      editItem: null,
      showTips: false
    };
  },
  methods: {
    add() {
      this.data.push({
        signInTime: "",
        signInBeginTime: "",
        signInEndTime: "",
        signOutTime: "",
        signOutBeginTime: "",
        signOutEndTime: "",
        hasRest: false,
        restBeginTime: "",
        restEndTime: ""
      });
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
      this.data = data.map(item => {
        return {
          signInTime: item.signInTime.substring(0, 5),
          signOutTime: item.signOutTime.substring(0, 5),
          signInBeginTime: item.signInBeginTime.substring(0, 5),
          signInEndTime: item.signInEndTime.substring(0, 5),
          signOutBeginTime: item.signOutBeginTime.substring(0, 5),
          signOutEndTime: item.signOutEndTime.substring(0, 5),
          hasRest: item.hasRest,
          restBeginTime: item.restBeginTime
            ? item.restBeginTime.substring(0, 5)
            : null,
          restEndTime: item.restEndTime
            ? item.restEndTime.substring(0, 5)
            : null
        };
      });
    }
  }
};
</script>
<style scoped>
._rest-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>