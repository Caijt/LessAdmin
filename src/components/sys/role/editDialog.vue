<template>
  <div>
    <common-dialog
      ref="dialog"
      width="700px"
      unit="角色"
      id-key="id"
      show-save-button
      edit-title
      :inDialog="inDialog"
      :data="data"
      :form-rules="rules"
      :save-func="api.save"
      :get-data-func="api.getEditById"
      :before-save="onBeforeSave"
      :init-base-data-func="initBaseData"
      @close-saved="$emit('close-saved')"
      @closed="onClosed"
      @edit-opened="onEditOpened"
    >
      <template #form>
        <el-divider>角色信息</el-divider>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="data.name" placeholder="填写角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="remarks">
          <el-input v-model="data.remarks" placeholder="填写角色备注"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限">
          <edit-menu-list ref="editMenuList" />
        </el-form-item>
      </template>
    </common-dialog>
  </div>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/sys/role";
import editMenuList from "./editMenuList";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, editMenuList },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        remarks: "",
        isAllRange: false,
        roleMenus: null
      },
      api,
      unit: "角色",
      rules: {
        name: [{ required: true, message: "请填写角色名称" }]
      }
    };
  },
  methods: {
    initBaseData() {
      return this.$refs.editMenuList.getDataOnce();
    },
    onEditOpened(data) {
      this.$refs.editMenuList.setData(data.roleMenus);
    },
    onBeforeSave() {
      let roleMenus = this.$refs.editMenuList.getCheckedRows();
      this.data.roleMenus = roleMenus;
      return true;
    },
    onClosed() {
      this.$refs.editMenuList.reset();
    }
  }
};
</script>