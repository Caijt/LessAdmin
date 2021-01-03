<template>
  <el-upload
    ref="upload"
    :name="name"
    :headers="header"
    :data="uploadData"
    :action="uploadUrl"
    :auto-upload="autoUpload"
    :limit="limit"
    :multiple="multiple"
    :on-change="onFileChange"
    :before-upload="onBeforeUpload"
    :disabled="disabled"
  >
    <el-button slot="trigger" size="mini" type="text" :disabled="disabled">{{buttonText}}</el-button>
    <el-button
      size="mini"
      style="margin-left:5px"
      type="text"
      @click="upload"
      :disabled="disabled"
      v-if="!autoUpload"
    >上传</el-button>
    <span slot="tip" class="c-tips">（请先修改好文件名再上传，大小不超过{{sizeText}}）</span>
  </el-upload>
</template>
<script>
import api from "@/api/common/attach";
import lrz from "lrz";
export default {
  props: {
    autoUpload: {
      type: Boolean,
      default: false
    },
    //上传url
    url: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "file"
    },
    buttonText: {
      type: String,
      default: "选择文件"
    },
    //最大允许上传数量
    limit: {
      type: Number
    },
    //多选
    multiple: {
      type: Boolean,
      default: false
    },
    //禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //附件大小限制，默认10mb
    limitSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    data: {
      type: Object
    },
    //图片压缩
    imgCompress: {
      type: Boolean,
      default: false
    },
    guid: {
      type: String,
      default: undefined
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    },
    //限制类型，用文件的type进行匹配，用正则的表达式
    limitType: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      resolve: null
    };
  },
  computed: {
    uploadUrl() {
      if (this.url) {
        return this.url;
      } else {
        return api.uploadUrl;
      }
    },
    uploadData() {
      return {
        ...this.data,
        entityGuid: this.guid,
        isPublic: this.isPublic,
        type: this.type
      };
    },
    header() {
      let token = sessionStorage.getItem("token");
      if (token) {
        return { Authorization: "Bearer " + token };
      }
      return {};
    },
    sizeText() {
      return this.$commonJs.getFileSizeText(this.limitSize);
    }
  },
  methods: {
    //检测是否超出限制附件大小
    checkSize(size) {
      if (size > this.limitSize) {
        return false;
      }
      return true;
    },
    //检测附件类型是否符合
    checkType(type) {
      if (!this.limitType) {
        return true;
      }
      var reg = new RegExp(this.limitType);
      return reg.test(type);
    },
    isImage(type) {
      var reg = new RegExp("^image/");
      return reg.test(type);
    },
    getUploadFiles() {
      return this.$refs.upload.uploadFiles;
    },
    upload() {
      if (!this.uploadUrl) {
        alert("请在upload组件上指定url属性！");
        return false;
      }
      return new Promise((resolve, reject) => {
        if (this.getUploadFiles().length > 0) {
          this.$refs.upload.submit();
          this.resolve = resolve;
        } else {
          resolve();
        }
      });
    },
    clear() {
      this.$refs.upload.clearFiles();
    },
    //
    onBeforeUpload(file) {
      if (!this.guid) {
        alert("请在upload组件上指定guid属性！");
        return false;
      }
      if (!this.checkSize(file.size) || !this.checkType(file.type)) {
        return false;
      }
      //判断附件是否是图片跟是否启了图片压缩功能
      if (this.imgCompress && this.isImage(file.type)) {
        return new Promise((resolve, reject) => {
          lrz(file).then(res => {
            resolve(res.file);
          });
        });
      } else {
        return true;
      }
    },
    //文件添加、上传成功、上传失败
    onFileChange(file, fileList) {
      if (file.status == "ready") {
        if (!this.checkSize(file.raw.size)) {
          let index = fileList.indexOf(file);
          fileList.splice(index, 1);
          this.$message.error(
            "文件[" + file.name + "]大小已超过" + this.sizeText
          );
        }
        if (!this.checkType(file.raw.type)) {
          let index = fileList.indexOf(file);
          fileList.splice(index, 1);
          this.$message.error("文件[" + file.name + "]不符合上传类型");
        }
      } else if (file.status) {
        let index = fileList.indexOf(file);
        fileList.splice(index, 1);
        if (file.status == "fail" || file.response.code != 0) {
          this.$notify.error({
            title: "上传失败",
            dangerouslyUseHTMLString: true,
            message:
              "文件[" +
                file.name +
                "]上传失败，请稍候重新上传！<br/>" +
                file.response.message || "",
            duration: 0,
            position: "top-left"
          });
        } else {
          this.$emit("uploaded", file.response.data);
        }
        if (fileList.length == 0) {
          if (this.resolve) {
            this.resolve(file.response.data);
            this.resolve = null;
          }
          this.$emit("all-uploaded");
        }
      }
    }
  }
};
</script>