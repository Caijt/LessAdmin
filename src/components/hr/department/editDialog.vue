<template>
  <common-dialog
    ref="dialog"
    width="500px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="data.name" placeholder="填写菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="data.type">
          <el-radio :label="0">部门</el-radio>
          <el-radio :label="1">班组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="(data.type==0?'部门':'班组')+'领导'" prop="leaderId">
        <employee-select
          in-dialog
          ref="employeeSelect"
          v-model="data.leaderId"
          :params="{isLeader:true}"
        />
      </el-form-item>
      <el-form-item label="排序值" prop="order">
        <el-input-number v-model="data.order"></el-input-number>
        <span class="c-tips">填写排序值，值越小排得越前</span>
      </el-form-item>
      <el-form-item label="上级部门" prop="parentId">
        <select-input ref="parentSelectInput" v-model="data.parentId" @click="openDepDialog" />
      </el-form-item>
    </template>
    <dep-dialog inDialog ref="depDialog" select @select="setParent"></dep-dialog>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/department";
import depDialog from "./listDialog";
import employeeSelect from "@/components/hr/employee/select";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, depDialog, employeeSelect },
  data() {
    return {
      data: {
        id: 0,
        parentId: null,
        type: 0,
        leaderId: null,
        name: "",
        order: 99
      },
      unit: "部门",
      api,
      rules: {
        name: [{ required: true, message: "请填写部门名称" }],
        order: [{ required: true, message: "请填写部门排序值" }]
      }
    };
  },
  methods: {
    openDepDialog() {
      this.$refs.depDialog.open().then(that => {
        that.$refs.list.getData({ notId: this.data.id });
      });
    },
    setParent(row) {
      this.$refs.parentSelectInput.setName(row.name);
      this.data.parentId = row.id;
      this.$refs.depDialog.close();
    },
    onEditOpened(data) {
      if(data.leaderId){
        this.$refs.employeeSelect.getOptions();
      }      
    }
  }
};
</script>