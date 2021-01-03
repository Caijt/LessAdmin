<template>
  <common-dialog
    ref="dialog"
    width="600px"
    unit="接口"
    edit-title
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
  >
    <template #form>
      <el-divider>接口信息</el-divider>
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="data.name" placeholder="填写接口名称"></el-input>
      </el-form-item>
      <el-form-item label="接口路径" prop="path">
        <el-input v-model="data.path" placeholder="填写接口完整路径，不区分大小写"></el-input>
      </el-form-item>
      <el-form-item label="公共接口" prop="isCommon">
        <el-switch v-model="data.isCommon"></el-switch>
        <div
          class="c-text-grey c-text-xs"
        >* 公共接口可以属于多个菜单，只要用户有其中某个菜单的访问权就能访问，非公共接口只能属于某一个菜单，用户需有对应菜单的访问权且菜单的权限与接口权限类型一致才能访问。</div>
      </el-form-item>
      <el-form-item label="权限类型" prop="permissionType" v-show="!data.isCommon">
        <el-radio-group v-model="data.permissionType">
          <el-radio label="READ">读</el-radio>
          <el-radio label="WRITE">写</el-radio>
          <el-radio label="REVIEW">审核</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/sys/api";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        path: "",
        isCommon: false,
        permissionType: "READ"
      },
      api,
      unit: "接口",
      rules: {
        name: [
          { required: true, message: "请填写接口名称" },
          {
            validator: this.$commonJs.validateRules.createCheckExist(
              api.checkExistByName,
              this,
              "data.id",
              "名称已重复"
            ),
            trigger: "blur"
          }
        ],
        path: [
          { required: true, message: "请填写接口路径" },
          {
            validator: this.$commonJs.validateRules.createCheckExist(
              api.checkExistByPath,
              this,
              "data.id",
              "路径已重复"
            ),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onEditOpened() {}
  }
};
</script>