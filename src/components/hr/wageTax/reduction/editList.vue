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
        <el-table-column label="减免类型" prop="type">
          <template slot-scope="{row}">
            <el-input v-model="row.type"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="减免金额" prop="money" align="center" width="150px">
          <template slot-scope="{row}">
            <el-input-number v-model="row.money" controls-position="right" width="100%"></el-input-number>
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
        money: 0,
        type: ""
      });
    }
  }
};
</script>