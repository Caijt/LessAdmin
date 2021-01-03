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
        <el-table-column label="工资项目" prop="wageItemId">
          <template slot-scope="{row}">
            <wage-select v-model="row.wageItemId"/>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" width="120px">
          <template slot-scope="{row}">
            <el-select v-model="row.isPay" style="width:100%">
              <el-option label="应发" :value="true"></el-option>
              <el-option label="应扣" :value="false"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </template>
    </list>
  </div>
</template>
<script>
import list from "@/components/common/list";
import listMixins from "@/mixins/list";
import wageSelect from "@/components/hr/wageItem/select"

export default {
  mixins: [listMixins],
  components: { list ,wageSelect},
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
        wageItemId: null,
        isPay: true
      });
    }
  }
};
</script>