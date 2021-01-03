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
            v-if="$permission.canReview()"
            v-show="row.status == 2"
            size="mini"
            type="text"
            @click="edit(row)"
          >审核</el-button>
          <el-button
            v-show="row.status != 2"
            size="mini"
            type="text"
            :icon="row.status!=3&&row.status!=4?'el-icon-edit':'el-icon-document'"
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
import list from "@/components/yx/programDeploy/list";
import editDialog from "@/components/yx/programDeploy/editDialog";
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