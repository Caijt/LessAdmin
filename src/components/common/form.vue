<template>
  <el-form
    :class="{ 'c-form-text': textMode }"
    :model="data"
    :rules="rules"
    ref="form"
    :label-width="labelWidth"
    :label-position="labelPosition"
    status-icon
    @change.native="onFormChange"
    @keyup.enter.native="save"
    v-loading="showLoading && isLoading"
  >
    <slot></slot>
    <el-form-item v-if="showSaveButton">
      <el-button type="primary" @click="save()">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from "@/api/common/common";
export default {
  props: {
    idKey: {
      type: String,
      default: "id",
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "85px",
    },
    labelPosition: {
      type: String,
      default: undefined,
    },
    showSaveButton: {
      type: Boolean,
      default: false,
    },
    textMode: {
      type: Boolean,
      default: false,
    },
    //表单验证规则
    rules: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    saveFunc: {
      type: Function,
      default: undefined,
    },
    confirmOnSave: {
      type: Boolean,
      default: false,
    },
    //保存之前，返回true进行保存，返回false不进行保存
    beforeSave: {
      type: Function,
      default: undefined,
    },
    confirmSaveText: {
      type: String,
      default: "您确定要保存吗？",
    },
    //获取数据函数
    getDataFunc: {
      type: Function,
      default: undefined,
    },
    getGuidOnCreate: {
      type: Boolean,
      default: false,
    },
    savedMessage: {
      type: String,
      default: "保存成功",
    },
  },
  data() {
    return {
      isChange: false,
      initData: {},
      isLoading: false,
      isSaved: false,
      isEdit: false,
    };
  },
  mounted() {
    this.initData = { ...this.data };
  },
  methods: {
    //在表单字段变更时
    onFormChange() {
      this.isChange = true;
    },
    reset() {
      this.isSaved = false;
      this.isChange = false;
      this.setData(this.initData);
      this.clearValidate();
      return this;
    },
    async getGuid() {
      this.isLoading = true;
      let res = await api.getGuid();
      this.data.guid = res.data;
      this.isLoading = false;
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
      return this;
    },
    setData(data) {
      for (let key in data) {
        if (typeof this.data[key] != "undefined") {
          this.data[key] = data[key];
        }
      }
      return this;
    },
    reload() {
      return this.getData(this.data[this.idKey]);
    },
    async getData(id) {
      if (!this.getDataFunc) {
        alert("请指定form组件上get-data-func属性对应的函数");
        return false;
      }
      this.isLoading = true;
      try {
        let res = await this.getDataFunc(id);
        this.setData(res.data);
        this.clearValidate();
        this.isLoading = false;
        this.$nextTick(() => {
          this.$emit("data-got", res.data);
        });
        return res;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        return false;
      }
    },
    change(isChange = true) {
      this.isChange = isChange;
    },
    async validate() {
      return await new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.$notify({
              title: "提示",
              message: "请检查相关字段（红色）填写是否规范",
              type: "warning",
              position: "top-left",
            });
          }
          resolve(valid);
        });
      });
    },
    async save(isForce = false) {
      if (!this.saveFunc) {
        alert("请指定form公共组件上save-func属性对应的函数！");
        return false;
      }
      if (isForce != true && !(await this.validate())) {
        return false;
      }

      if (this.beforeSave) {
        this.isLoading = true;
        if (!(await this.beforeSave())) {
          this.isLoading = false;
          return false;
        }
        this.isLoading = false;
      }
      if (this.confirmOnSave) {
        try {
          await this.$msgbox({
            title: "确认",
            message: this.confirmSaveText,
            type: "warning",
            showCancelButton: true,
          });
        } catch (error) {
          return false;
        }
      }
      this.isLoading = true;
      try {
        let res = await this.saveFunc(this.data);
        if (this.data[this.idKey] != undefined && !this.isEdit) {
          this.data[this.idKey] = res.data;
        }
        this.isEdit = true;
        this.isSaved = true;
        this.isChange = false;
        this.$message.success(this.savedMessage);
        this.$emit("saved");
        this.isLoading = false;
        return res;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        return false;
      }
    },
    async create(data = null) {
      this.isEdit = false;
      if (data) {
        this.setData(data);
        this.clearValidate();
      }
      if (this.getGuidOnCreate) {
        await this.getGuid();
      }
      this.$emit("created", data);
      return this;
    },
    //编辑表单，会触发edit-opened事件
    async edit(data) {
      this.isEdit = true;
      this.setData(data);
      this.clearValidate();
      // await this.$nextTick();
      this.$emit("edited", data);
      return this;
    },
    //根据Id打开编辑表单，会触发edited事件
    async editById(id) {
      this.isEdit = true;
      let res = await this.getData(id);
      this.$emit("edited", res.data);
      return this;
    },
    //打开详情窗口，会触发detailed事件
    async detail(data) {
      this.setData(data);
      await this.$nextTick();
      this.$emit("detailed", data);
      return this;
    },
    //根据Id打开详情窗口，会触发detailed事件
    async detailById(id) {
      await this.getData(id);
      this.$emit("detailed", res.data);
      return this;
    },
    loading(isLoading = true) {
      this.isLoading = isLoading;
    },
  },
};
</script>