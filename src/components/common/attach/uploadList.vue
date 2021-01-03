<template>
  <div>
    <upload
      ref="upload"
      v-if="showUpload"
      :url="url"
      :data="data"
      :disabled="disabled"
      :guid="guid"
      :type="type"
      :auto-upload="autoUpload"
      :name="name"
      :button-text="buttonText"
      :img-compress="imgCompress"
      :limit="limit"
      :limit-size="limitSize"
      :limit-type="limitType"
      :multiple="multiple"
      :is-public="isPublic"
      @uploaded="uploaded"
    />
    <list
      ref="list"
      :get-data-func="getDataFunc"
      :card="card"
      :delete-func="deleteFunc"
      :guid="guid"
      :type="type"
      :show-delete="showDelete"
      @deleted="$emit('deleted')"
    />
  </div>
</template>
<script>
import upload from "./upload";
import list from "./list";
export default {
  components: {
    upload,
    list,
  },
  props: {
    showUpload: {
      type: Boolean,
      default: true,
    },
    deleteFunc: {
      type: Function,
      default: undefined,
    },
    getDataFunc: {
      type: Function,
      default: undefined,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    //上传url
    url: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "file",
    },
    buttonText: {
      type: String,
      default: "选择文件",
    },
    //最大允许上传数量
    limit: {
      type: Number,
    },
    //多选
    multiple: {
      type: Boolean,
      default: false,
    },
    //禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //附件大小限制，默认10mb
    limitSize: {
      type: Number,
      default: 10 * 1024 * 1024,
    },
    data: {
      type: Object,
    },
    //图片压缩
    imgCompress: {
      type: Boolean,
      default: false,
    },
    guid: {
      type: String,
      default: undefined,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    //限制类型，用文件的type进行匹配，用正则的表达式
    limitType: {
      type: String,
      default: undefined,
    },
    card: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    uploaded(res) {
      this.updated = true;
      this.$refs.list.add(res);
    },
    count() {
      return this.$refs.list.count();
    },
    upload() {
      return this.$refs.upload.upload();
    },
    clear() {
      this.$refs.upload.clear();
      this.$refs.list.clear();
    },
    getData(params) {
      return this.$refs.list.getData(params);
    },
  },
};
</script>

