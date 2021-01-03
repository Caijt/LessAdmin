<template>
  <common-dialog
    ref="dialog"
    :title="title"
    width="1200px"
    @opened="onOpened"
    :in-dialog="inDialog"
  >
    <el-alert type="warning" title="提示"  show-icon>
      <div>以下是系统中已禁用且访问时间还未过期的Token（包含手动禁用、已进行刷新过的Token），会存放在后台缓存中，用于禁用对应的Token访问。</div>
      <div>如果系统用的是MemoryCache等非持久化缓存，请在系统启动或缓存清空后再点击重载禁用Token按钮。</div>
    </el-alert>
    <div class="c-h-10p"></div>
    <list ref="list" :show-checkbox="multiple">
      <template #toolbar-left>
        <el-tooltip content="重新加载已禁用的且访问时间未过期的Token到后台缓存中">
          <el-button type="primary" @click="reloadDisabledToken">重载禁用Token</el-button>
        </el-tooltip>        
      </template>
      <template slot="column">
        <slot name="table" />
        <slot name="column" />
        <el-table-column
          label="操作"
          align="center"
          width="60"
          fixed="right"
          v-if="select&&!multiple"
        >
          <template slot-scope="{row}">
            <el-button
              @click="onSelect(row)"
              type="text"
              :disabled="selectLeaf&&row.children!=null"
            >选择</el-button>
          </template>
        </el-table-column>
      </template>
    </list>
    <template slot="footer">
      <slot name="footer">
        <el-button type="primary" @click="selectMultiple" v-if="select&&multiple">选择</el-button>
      </slot>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import list from "./list";
import listDialogMixins from "@/mixins/listDialog";
import api from "@/api/sys/token"
export default {
  components: { commonDialog, list },
  mixins: [listDialogMixins],
  props: {
    title: {
      type: String,
      default: "缓存已禁用Token列表",
    },
    selectLeaf: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    reloadDisabledToken() {
      this.$refs.list.loading();
      api.reloadDisabledToken().then(res=>{
        this.$refs.list.reload();
      })
    },
    onOpened() {
      this.$refs.list.getData({
        inCacheDisabled: true,
      });
    },
  },
};
</script>