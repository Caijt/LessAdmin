<template>
  <div>
    <el-tabs v-model="tabName">
      <el-tab-pane label="汇总统计" name="all">
        <list ref="list">
          <el-table-column slot="column" label="操作" fixed="right" align="center" width="80">
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </list>
      </el-tab-pane >
      <el-tab-pane label="异常统计" name="abnormal">
        <abnormal-list ref="list">
          <el-table-column slot="column" label="操作" fixed="right" align="center" width="80">
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </abnormal-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import list from "@/components/hr/attendanceStatistic/list";
// import abnormalList from "@/components/hr/attendanceStatistic/abnormalList";
import curdMixins from "@/mixins/curd";

export default {
  components: {
    list,
    abnormalList
  },
  mixins: [curdMixins],
  data(){
    return {
      tabName:"all"
    }
  }
};
</script>