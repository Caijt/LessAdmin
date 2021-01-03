<template>
  <div>
    <list
      show-checkbox
      show-index
      ref="list"
      local-delete
      :confirm-on-delete="false"
      :page="false"
      :border="false"
      :show-query="false"
    >
      <template slot="toolbar-left">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="deleteBatch">删除</el-button>
      </template>
      <template slot="column">
        <el-table-column label="所得额下限（包含）" align="center">
          <template slot-scope="{row}">
            <el-input-number controls-position="right" v-model="row.scoreBegin" style="width:100%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="所得额上限" align="center">
          <template slot-scope="{row}">
            <el-input-number controls-position="right" v-model="row.scoreEnd" style="width:100%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="预扣率" prop="baseValue" align="center">
          <template slot-scope="{row}">
            <el-input-number controls-position="right" v-model="row.baseValue" style="width:100%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="速算扣除数" align="center" width="120px">
          <template slot-scope="{row}">
            <el-input-number
              v-model="row.coefficient"
              controls-position="right"
              :precision="2"
              style="width:100%"
            ></el-input-number>
          </template>
        </el-table-column>
      </template>
    </list>
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";

export default {
  mixins: [listMixins],
  components: { list },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    add() {
      this.$refs.list.add({
        scoreBegin: 0,
        scoreEnd: 0,
        baseValue: 0,
        coefficient: 0
      });
    }
  }
};
</script>