<template>
  <div>
    <el-alert type="warning" title="提示"  show-icon>
      <div>以下是用户登录后产生的访问Token跟刷新Token，可以通过禁用操作使对应的登录信息失效。</div>
    </el-alert>
    <div class="c-h-10p"></div>
    <list ref="list" :disabled="!$permission.canRead()">
      <template #toolbar-left>
        <el-button @click="openCacheDisabledToken" type="primary" :disabled="!$permission.canRead()">查看缓存禁用Token</el-button>
      </template>
      <template #column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="60"
          v-if="$permission.canWrite()"
        >
          <template v-slot="{row}">
            <el-button size="mini" type="text" @click="disable(row)" :disabled="row.isDisabled">禁用</el-button>
          </template>
        </el-table-column>
      </template>
    </list>
    <cache-disabled-token-dialog ref="cacheDisabledTokenDialog" />
  </div>
</template>
<script>
import list from "@/components/sys/token/list";
import cacheDisabledTokenDialog from "@/components/sys/token/cacheDisabledTokenDialog";
import curdMixins from "@/mixins/curd";
import api from "@/api/sys/token";
export default {
  components: {
    list,
    cacheDisabledTokenDialog
  },
  mixins: [curdMixins],
  data() {
    return {};
  },
  methods: {
    openCacheDisabledToken() {
      this.$refs.cacheDisabledTokenDialog.open()
    },
    disable(row) {
      this.$confirm(
        "你确定要禁用此Token吗，这将导致对应的登录信息失效",
        "提示",
        {
          type: "warning",
        }
      ).then(() => {
        this.$refs.list.loading();
        api.disableToken(row.accessToken).then((res) => {
          this.$refs.list.reload();
        });
      });
    },
  },
};
</script>