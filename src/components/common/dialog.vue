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
      <c-form
        ref="form"
        :show-loading="false"
        :save-func="saveFunc"
        :get-data-func="getDataFunc"
        :text-mode="formTextMode"
        :data="data"
        :label-width="formLabelWidth"
        :confirm-on-save="confirmOnSave"
        :rules="formRules"
        :label-position="formLabelPosition"
        :id-key="idKey"
        :before-save="beforeSave"
        :get-guid-on-create="getGuidOnCreate"
        :saved-message="savedMessage"
        @data-got="$emit('data-got')"
        @saved="$emit('saved')"
      >
        <slot name="form"></slot>
      </c-form>
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
import cForm from "./form";
export default {
  components: { cForm },
  props: {
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
    //是否启用详情样式，默认是以编辑样式处理
    formTextMode: {
      type: Boolean,
      default: false,
    },
    formLabelWidth: {
      type: String,
      default: undefined,
    },
    formLabelPosition: {
      type: String,
      default: undefined,
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
      isInitBaseData: false,
      openData: null,
      isEdit: false,
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
    async onOpen() {
      await this.$nextTick();
      this.$emit("opened", this.openData);
      if (this.resolve) {
        if (this.initBaseDataFunc && !this.isInitBaseData) {
          await this.initBaseDataFunc();
          this.isInitBaseData = true;
        }
        this.resolve(this);
      }
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
    async openCreate(data = null) {
      this.isLoading = true;
      await this.open();
      await this.$refs.form.create(data);
      this.isEdit = this.$refs.form.isEdit;
      this.$emit("create-opened", data);
      this.isLoading = false;
      return this;
    },
    //打开编辑窗口，会触发edit-opened事件
    async openEdit(data) {
      this.isLoading = true;
      await this.open();
      await this.$refs.form.edit(data);
      this.isEdit = this.$refs.form.isEdit;
      this.isLoading = false;
      this.$emit("edit-opened", data);
    },
    //根据Id打开编辑窗口，会触发edit-opened事件
    async openEditById(id) {
      this.isLoading = true;
      await this.open();
      let res = await this.$refs.form.editById(id);
      this.isEdit = this.$refs.form.isEdit;
      this.$emit("edit-opened", res.data);
      this.isLoading = false;
      return this;
    },
    //打开详情窗口，会触发details-opened事件
    async openDetail(data) {
      this.isLoading = true;
      await this.open();
      await this.$refs.form.detail(id);
      this.$emit("detail-opened", data);
      this.isLoading = false;
      return this;
    },
    //根据Id打开详情窗口，会触发details-opened事件
    async openDetailById(id) {
      this.isLoading = true;
      await this.open();
      let res = await this.$refs.form.detailById(id);
      this.$emit("detail-opened", res.data);
      this.isLoading = false;
      return this;
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
      if (this.$refs.form.isSaved) {
        this.$emit("close-saved");
      }
      this.$emit("close");
    },
    //关闭对话框前的处理方法
    handleBeforeClose(done) {
      if (this.isLoading && !this.formText) {
        this.$message.warning("正在加载中，请稍候");
        return;
      }
      let promise = null;
      if (this.confirmOnCloseChange && this.$refs.form.isChange) {
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
              isChanged: this.$refs.form.isChange,
              isSaved: this.$refs.form.isSaved,
              isEdit: this.$refs.form.isEdit,
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
    change(isChange = true) {
      this.$refs.form.change(isChange);
    },
    //清除表单验证信息
    clearValidate() {
      this.$refs.form.clearValidate();
      return this;
    },
    //重置对话框状态字段
    reset() {
      this.isEdit = false;
      this.$refs.form.reset();
      return this;
    },
    //赋值给data对象
    setData(data) {
      this.$refs.form.setData(data);
      return this;
    },
    reload() {
      return this.$refs.form.reload();
    },
    //获取数据，会触发data-got
    async getData(id) {
      this.isLoading = true;
      await this.$refs.form.getData(id);
      this.isLoading = false;
    },
    formValidate() {
      return this.$refs.form.validate();
    },
    //保存，会触发saved事件
    async save(isForce = false) {
      this.isLoading = true;
      let res = await this.$refs.form.save(isForce);
      if (res != false && this.closeOnSaved) {
        this.show = false;
      }
      this.isLoading = false;
    },
  },
};
</script>