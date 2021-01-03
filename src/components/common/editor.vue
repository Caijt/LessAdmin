<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :key="tinymceFlag" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/fullscreen"; // 全屏插件
import "tinymce/plugins/code"; // 全屏插件
export default {
  components: {
    Editor
  },
  // name: "tinymce",
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "code fullscreen lists media table image wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "fullscreen | undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat code"
    }
  },
  data() {
    return {
      tinymceFlag:1,
      init: {
        content_css:"/tinymce/skins/content/default/content.css",
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,//隐藏技术支持字样
        // contextmenu: "bold copy ",//右键菜单 
        // contextmenu_never_use_native:true, //禁用浏览器右键
        draggable_modal:false, //可拖动大小
        // elementpath:false,//显示底部元素路径
        menubar: false, //顶部菜单
        // resize:false, //可拖动大小
        // statusbar:false,//底部状态栏
        toolbar_drawer:"sliding",
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    // alert("123")
    tinymce.init({});
  },
  activated(){
     //解决多页面缓存下富文本框失效的问题
    this.tinymceFlag++;
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style>
.tox.tox-silver-sink.tox-tinymce-aux {
  z-index: 3001;
}
</style>