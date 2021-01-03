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
          <el-button
            v-if="row.status != 2 && row.status != 3"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="edit(row)"
          />
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" /> -->
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @close-saved="reload" />
  </div>
</template>
<script>
import list from "@/components/yx/program/list";
import editDialog from "@/components/yx/program/editDialog";
import curdMixins from "@/mixins/curd";

export default {
  mixins: [curdMixins],
  components: {
    list,
    editDialog
  },
  methods: {}
};
</script>