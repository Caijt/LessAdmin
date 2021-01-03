<template>
  <div>
    <common-dialog
      ref="dialog"
      width="750px"
      unit="菜单"
      edit-title
      show-save-button
      :inDialog="inDialog"
      :data="data"
      :form-rules="rules"
      :save-func="api.save"
      :get-data-func="api.getEditById"
      :before-save="onBeforeSave"
      @closed="onClosed"
      @edit-opened="onEditOpened"
      @close-saved="$emit('close-saved')"
    >
      <template #form>
        <el-divider>菜单信息</el-divider>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="data.name" placeholder="填写菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="路径值" prop="path">
          <el-input v-model="data.path" placeholder="填写路径值" style="width:200px"></el-input>
          <span class="c-text-grey c-text-xs c-mg-l-5p">* 会与该菜单的所有上级菜单的路径值拼接成完整路径</span>
        </el-form-item>
        <el-form-item label="排序值" prop="order">
          <el-input-number v-model="data.order" controls-position="right"></el-input-number>
          <span class="c-text-grey c-text-xs c-mg-l-5p">* 值越小排得越前</span>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <input-select
            :options="parentMenuOptions"
            v-model="data.parentId"
            @click="openMenuDialog"
          />
        </el-form-item>
        <el-form-item label="多开页面" prop="canMultipleOpen">
          <el-switch v-model="data.canMultipleOpen"></el-switch>
          <span class="c-text-grey c-text-xs c-mg-l-5p">* 在页面标签模式下，页面是否会根据参数的不同打开多个页面</span>
        </el-form-item>
        <el-form-item label="子页面" prop="isPage">
          <el-switch v-model="data.isPage"></el-switch>
          <span class="c-text-grey c-text-xs c-mg-l-5p">* 是否为子页面，不显示在菜单列表中，仅能在底层菜单下级创建，权限验证由上级菜单决定</span>
        </el-form-item>
        <div v-show="!data.isPage">
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="data.icon" style="width:200px" placeholder="填写图标类名"></el-input>

            <span class="c-text-grey c-text-xs c-mg-l-5p">
              * 图标预览：
              <i :class="data.icon||$store.state.sys.config.MENU_DEFAULT_ICON "></i>
            </span>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-checkbox v-model="data.hasRead">读</el-checkbox>
            <el-checkbox v-model="data.hasWrite">写</el-checkbox>
            <el-checkbox v-model="data.hasReview">审核</el-checkbox>
            <div class="c-text-grey c-text-xs">* 仅对最底级菜单有效，对于分类菜单权限设置无效</div>
          </el-form-item>
          <el-form-item label="菜单接口">
            <api-edit-list ref="apiEditList"></api-edit-list>
          </el-form-item>
        </div>
      </template>
    </common-dialog>
    <menu-dialog ref="menuDialog" :select-leaf="data.isPage" title="选择上级菜单" select @select="setParent" />
  </div>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/sys/menu";
import menuDialog from "./listDialog";
import apiEditList from "./apiEditList";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, menuDialog, apiEditList },
  data() {
    return {
      data: {
        id: 0,
        parentId: null,
        name: "",
        path: "",
        icon: "",
        canMultipleOpen: false,
        isPage: false,
        order: 99,
        hasRead: false,
        hasWrite: false,
        hasReview: false,
        menuApis: null
      },
      unit: "菜单",
      api,
      parentMenuOptions: [],
      rules: {
        name: [{ required: true, message: "请填写菜单名称" }],
        path: [{ required: true, message: "请填写菜单路径值" }],
        order: [{ required: true, message: "请填写菜单排序值" }]
      }
    };
  },
  methods: {
    onEditOpened(data) {
      this.parentMenuOptions = [{ id: data.parentId, name: data.parentName }];
      this.$refs.apiEditList.setData(data.menuApis);
    },
    openMenuDialog() {
      this.$refs.menuDialog.open().then(that => {
        that.$refs.list.getData({ notId: this.data.id, isPage: false });
      });
    },
    setParent(row) {
      this.data.parentId = row.id;
      this.parentMenuOptions = [{ id: row.id, name: row.name }];
    },
    onBeforeSave() {
      let apis = this.$refs.apiEditList.listData.map(item => {
        return {
          apiId: item.apiId,
          menuId: this.data.id
        };
      });
      this.data.menuApis = apis;
      return true;
    },
    onClosed() {
      this.$refs.apiEditList.clear();
    }
  }
};
</script>