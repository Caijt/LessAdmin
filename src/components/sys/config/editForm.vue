<template>
  <div>
    <common-form
      ref="form"
      :get-data-func="getDataFunc"
      :data="data"
      label-width="150px"
      :save-func="saveFunc"
      show-save-button
    >
      <el-divider>配置参数</el-divider>
      <el-form-item label="系统标题">
        <el-input placeholder="填写系统标题" v-model="data.SYSTEM_TITLE"></el-input>
      </el-form-item>
      <el-form-item label="菜单栏标题">
        <el-input placeholder="填写菜单栏顶部标题" v-model="data.MENU_BAR_TITLE"></el-input>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input placeholder="填写版本号" v-model="data.VERSION">
          <template #prepend>v</template>
        </el-input>
      </el-form-item>
      <el-form-item label="网站维护">
        <el-switch v-model="data.IS_REPAIR" active-value="ON" inactive-value="OFF"></el-switch>
        <span class="c-text-grey c-font-12p c-mg-l-10p">* 开启后，后台只允许superadmin用户登录</span>
      </el-form-item>
      <el-form-item label="登录需要验证码">
        <el-switch v-model="data.LOGIN_VCODE" active-value="ON" inactive-value="OFF"></el-switch>
      </el-form-item>
      <el-form-item label="使用多页面标签">
        <el-switch v-model="data.PAGE_TABS" active-value="ON" inactive-value="OFF"></el-switch>
      </el-form-item>
      <el-form-item label="列表默认页容量">
        <el-input-number v-model="data.LIST_DEFAULT_PAGE_SIZE" controls-position="right" />
      </el-form-item>
      <el-form-item label="显示菜单图标">
        <el-switch v-model="data.SHOW_MENU_ICON" active-value="ON" inactive-value="OFF"></el-switch>
      </el-form-item>
      <el-form-item label="菜单默认图标">
        <el-input placeholder="填写图标类名" v-model="data.MENU_DEFAULT_ICON">
          <template #prepend>
            <i :class="data.MENU_DEFAULT_ICON"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="后台布局">
        <el-radio-group v-model="data.LAYOUT" style="line-height:28px">
          <div>
            <el-radio label="leftRight">左右布局</el-radio>
            <span class="c-text-grey c-font-12p">* 左边显示菜单，右边显示内容</span>
          </div>
          <div>
            <el-radio label="topBottom">上下布局</el-radio>
            <span class="c-text-grey c-font-12p">* 顶部显示菜单，中间显示内容</span>
          </div>
          <div>
            <el-radio label="moduleLeftRight">模块分类左右布局</el-radio>
            <span class="c-text-grey c-font-12p">* 以一级菜单做为顶部模块进行菜单分类，中间以左右布局</span>
          </div>
          <div>
            <el-radio label="moduleTopBottom">模块分类上下布局</el-radio>
            <span class="c-text-grey c-font-12p">* 以一级菜单做为顶部模块进行菜单分类，中间以上下布局</span>
          </div>
        </el-radio-group>
      </el-form-item>
    </common-form>
  </div>
</template>
<script>
import commonForm from "@/components/common/form";
import api from "@/api/sys/config";
export default {
  components: { commonForm },
  data() {
    return {
      api,
      data: {
        SYSTEM_TITLE: "",
        MENU_BAR_TITLE: "",
        VERSION: "",
        IS_REPAIR: "OFF",
        LOGIN_VCODE: "OFF",
        LIST_DEFAULT_PAGE_SIZE: 10,
        SHOW_MENU_ICON: "",
        PAGE_TABS:"ON",
        MENU_DEFAULT_ICON: "",
        LAYOUT: "leftRight"
      }
    };
  },
  mounted() {
    this.$refs.form.getData();
  },
  methods: {
    getDataFunc() {
      return api.getList().then(res => {
        let data = {};
        res.data.forEach(item => {
          if (item.type == "NUMBER") {
            data[item.key] = Number(item.value);
          } else {
            data[item.key] = item.value;
          }
        });
        return { data };
      });
    },
    saveFunc() {
      let data = [];
      for (let key in this.data) {
        data.push({
          key,
          value: this.data[key]
        });
      }
      return api.save(data);
    }
  }
};
</script>