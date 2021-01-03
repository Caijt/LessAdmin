<template>
  <div>
    <list ref="list" :disabled="!$permission.canRead()">
      <el-table-column
        slot="table"
        label="操作"
        fixed="right"
        align="center"
        width="80"
        v-if="$permission.canWrite()"
      >
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-document" @click="openLog(row)" />
        </template>
      </el-table-column>
    </list>
    <detail-dialog ref="detailDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/yx/businessLog/list";
import detailDialog from "@/components/yx/businessLog/detailDialog";
import curdMixins from "@/mixins/curd";

export default {
  mixins: [curdMixins],
  components: {
    list,
    detailDialog
  },
  created() {},
  methods: {
    openLog(row) {
      this.$refs.detailDialog.openDetailsById(row.id);
    }
  }
};
</script>