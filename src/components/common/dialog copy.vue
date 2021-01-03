<template>
  <el-dialog
    :title="autoTitle"
    class="c-dialog-fixed"
    :class="{
        'c-right-fixed':fixedRight,
        'c-center':center,
        'c-hide-header':hideHeader
      }"
    :visible.sync="show"
    :append-to-body="inDialog"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
    :width="width"
    :before-close="handleBeforeClose"
  >
    <div v-loading="isLoading">
      <el-form
        :class="{'c-form-text':formText}"
        :model="data"
        :rules="formRules"
        ref="form"
        :label-width="formLabelWidth"
        status-icon
        @change.native="onFormChange"
        @keyup.enter.native="save"
      >
        <slot name="form"></slot>
      </el-form>
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer" :isLoading="isLoading" />
      <template v-if="showSaveButton">
        <el-button type="primary" @click="save" :loading="isLoading">{{saveButtonText}}</el-button>
        <el-button @click="close">关 闭</el-button>
      </template>
    </template>
  </el-dialog>
</template>
<script>
import api from "@/api/common/common";
export default {
  components: {},
  props: {
    //是否启用详情样式，默认是以编辑样式处理
    formText: {
      type: Boolean,
      default: false,
    },
    //是否嵌套Dialog
    inDialog: {
      type: Boolean,
      default: false,
    },
    showSaveButton: {
      type: Boolean,
      default: false,
    },
    idKey: {
      type: String,
      default: "id",
    },
    getGuidOnCreate: {
      type: Boolean,
      default: false,
    },
    //是否固定在右侧
    fixedRight: {
      type: Boolean,
      default: false,
    },
    //是否在中间
    center: {
      type: Boolean,
      default: false,
    },
    //是否隐藏对话框头部
    hideHeader: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    editTitle: {
      type: Boolean,
      default: false,
    },
    //记录单位
    unit: {
      type: String,
      default: "记录",
    },
    //宽度
    width: {
      type: String,
      default: undefined,
    },
    //是否在保存后关闭窗口
    closeOnSaved: {
      type: Boolean,
      default: false,
    },
    //会传入一个表单状态对象{ isChanged,isSaved,isEdit }跟一个done函数，前台根据情况进行判断，然后调用done()就会关闭窗口
    beforeClose: {
      type: Function,
      default: undefined,
    },
    formLabelWidth: {
      type: String,
      default: "85px",
    },
    //表单验证规则
    formRules: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    //获取数据函数
    getDataFunc: {
      type: Function,
      default: undefined,
    },
    //保存数据函数
    saveFunc: {
      type: Function,
      default: undefined,
    },
    saveButtonText: {
      type: String,
      default: "保存",
    },
    //是否在保存时弹出确认提示
    confirmOnSave: {
      type: Boolean,
      default: false,
    },
    //是否在改变数据关闭窗口时进行提示
    confirmOnCloseChange: {
      type: Boolean,
      default: false,
    },
    confirmCloseChangeText: {
      type: String,
      default: "数据已修改未保存，是否确定要关闭窗口？",
    },
    //保存确认提示文字
    confirmSaveText: {
      type: String,
      default: "您确定要保存吗？",
    },
    //保存之前，返回true进行保存，返回false不进行保存
    beforeSave: {
      type: Function,
      default: undefined,
    },
    //关闭窗口时是否重置表单
    resetOnClose: {
      type: Boolean,
      default: true,
    },
    //初始化对话框的基础数据的函数，返回一个Promiss，这函数只会调用一次，比如说表单内有一些下拉列表，需进行加载成功后才可以进行其它操作
    initBaseDataFunc: {
      type: Function,
      default: undefined,
    },
    //保存后提示消息
    savedMessage: {
      type: String,
      default: "保存成功",
    },
  },
  data() {
    return {
      show: false,
      resolve: null,
      initData: {},
      isLoading: false,
      isSaved: false,
      isEdit: false,
      isChange: false,
      isInitBaseData: false,
      openData: null,
    };
  },
  mounted() {
    this.initData = { ...this.data };
  },
  computed: {
    autoTitle() {
      if (this.title) {
        return this.title;
      }
      if (this.editTitle) {
        return (this.isEdit ? "修改" : "创建") + " " + this.unit;
      }
      return this.unit + " 详情";
    },
  },
  methods: {
    onOpen() {
      this.$nextTick(() => {
        this.$emit("opened", this.openData);
        if (this.resolve) {
          if (this.initBaseDataFunc && !this.isInitBaseData) {
            let p = this.initBaseDataFunc();
            if (!p instanceof Promise) {
              alert("init-base-data-fuc函数请返回Promise");
              return false;
            }
            p.then(() => {
              this.isInitBaseData = true;
              this.resolve(this);
            });
          } else {
            this.resolve(this);
          }
        }
      });
    },
    //打开对话框
    open(data = null) {
      this.show = true;
      this.openData = data;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
      });
    },
    //打开创建窗口，会触发create-opened事件
    openCreate(data = null) {
      this.isEdit = false;
      return this.open().then(() => {
        if (data) {
          this.setData(data);
          this.clearValidate();
        }
        if (this.getGuidOnCreate) {
          return this.getGuid().then((res) => {
            this.$emit("create-opened", data);
            return this;
          });
        }
        this.$emit("create-opened", data);
        return this;
      });
    },
    //打开编辑窗口，会触发edit-opened事件
    openEdit(data) {
      this.isEdit = true;
      return this.open().then(() => {
        this.setData(data);
        this.clearValidate();
        return this.$nextTick().then(() => {
          this.$emit("edit-opened", data);
          return this;
        });
      });
    },
    //根据Id打开编辑窗口，会触发edit-opened事件
    openEditById(id) {
      this.isEdit = true;
      return this.open().then(() => {
        return this.getData(id).then((res) => {
          this.$emit("edit-opened", res.data);
          return this;
        });
      });
    },
    //打开详情窗口，会触发details-opened事件
    openDetails(data) {
      return this.open().then(() => {
        this.setData(data);
        return this.$nextTick().then(() => {
          this.$emit("details-opened", data);
          return this;
        });
      });
    },
    //根据Id打开详情窗口，会触发details-opened事件
    openDetailsById(id) {
      return this.open().then(() => {
        return this.getData(id).then((res) => {
          this.$emit("details-opened", res.data);
          return this;
        });
      });
    },
    //在完全关闭对话框后，会触发closed事件
    onClosed() {
      if (this.resetOnClose) {
        this.reset();
      }
      this.$emit("closed");
    },
    //在关闭对话框时，会触发close事件
    onClose() {
      if (this.isSaved) {
        this.$emit("close-saved");
      }
      this.$emit("close");
    },
    //获取guid
    getGuid() {
      this.isLoading = true;
      return api.getGuid().then((res) => {
        this.data.guid = res.data;
        this.isLoading = false;
        return res;
      });
    },
    //关闭对话框前的处理方法
    handleBeforeClose(done) {
      if (this.isLoading && !this.formText) {
        this.$message.warning("正在加载中，请稍候");
        return;
      }
      let promise = null;
      if (this.confirmOnCloseChange && this.isChange) {
        promise = this.$msgbox({
          title: "提示",
          message: this.confirmCloseChangeText,
          type: "warning",
          showCancelButton: true,
        });
      } else {
        promise = Promise.resolve();
      }
      promise
        .then((res) => {
          if (this.beforeClose) {
            this.beforeClose(done, {
              isChanged: this.isChange,
              isSaved: this.isSaved,
              isEdit: this.isEdit,
            });
          } else {
            done();
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //关闭对话框（会经过handleBeforeClose处理是否可以关闭）
    close(isForce = false) {
      if (isForce == true) {
        this.show = false;
      } else {
        this.handleBeforeClose(() => {
          this.show = false;
        });
      }
    },
    loading(isLoading = true) {
      this.isLoading = isLoading;
    },
    //清除表单验证信息
    clearValidate() {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
      return this;
    },
    //重置对话框状态字段
    reset() {
      this.isEdit = false;
      this.isSaved = false;
      this.isChange = false;
      this.setData(this.initData);
      this.clearValidate();
      return this;
    },
    //赋值给data对象
    setData(data) {
      for (let key in data) {
        if (typeof this.data[key] != "undefined") {
          if (typeof data[key] == "function") {
            this.data[key] = data[key]();
          } else {
            this.data[key] = data[key];
          }
        }
      }
      return this;
    },
    reload() {
      return this.getData(this.data[this.idKey]);
    },
    //获取数据，会触发data-got
    getData(id) {
      if (!this.getDataFunc) {
        alert("请指定dialog组件上get-data-func属性对应的函数");
        return false;
      }
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        let funcRes = this.getDataFunc(id);
        if (funcRes instanceof Promise) {
          funcRes
            .then((res) => {
              this.setData(res.data);
              this.clearValidate();
              this.isLoading = false;
              resolve(res);
              this.$nextTick(() => {
                this.$emit("data-got", res.data);
              });
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }
      });
    },
    //在表单字段变更时
    onFormChange() {
      this.isChange = true;
    },
    formValidate() {
      return new Promise((resolve) => {
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
    //保存，会触发saved事件
    save(isForce = false) {
      return new Promise((resolve, reject) => {
        if (!this.saveFunc) {
          alert("请指定dialog公共组件上save-func属性对应的函数！");
          return false;
        }
        let formValidateFunc;
        if (isForce == true) {
          formValidateFunc = Promise.resolve(true);
        } else {
          formValidateFunc = this.formValidate();
        }
        formValidateFunc.then((valid) => {
          if (!valid) {
            return false;
          }
          let promise = Promise.resolve();
          if (this.beforeSave) {
            let bs = this.beforeSave();
            if (bs == false) {
              return false;
            } else if (bs instanceof Promise) {
              promise = bs;
            }
          }
          promise.then(() => {
            let _save = () => {
              this.isLoading = true;
              this.saveFunc(this.data)
                .then((res) => {
                  if (this.data[this.idKey] != undefined && !this.isEdit) {
                    this.data[this.idKey] = res.data;
                  }
                  this.isEdit = true;
                  this.isSaved = true;
                  this.isChange = false;
                  this.$message.success(this.savedMessage);
                  this.$emit("saved");
                  resolve(res);
                  this.isLoading = false;
                  if (this.closeOnSaved) {
                    this.show = false;
                  }
                })
                .catch((res) => {
                  this.isLoading = false;
                  console.log(res);
                });
            };
            if (this.confirmOnSave) {
              this.$msgbox({
                title: "确认",
                message: this.confirmSaveText,
                type: "warning",
                showCancelButton: true,
              })
                .then(() => {
                  _save();
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              _save();
            }
          });
        });
      });
    },
  },
};
</script>