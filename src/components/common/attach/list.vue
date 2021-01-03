<template>
  <div v-loading="loading">
    <el-popover v-for="(item,index) in data" :key="item.id" trigger="click">
      <div class="_attch-card" slot="reference" v-if="card">
        <!-- <attach-img v-if="isImage(item)" v-attach-src="item.id" /> -->
        <attach-img v-if="isImage(item)" :id="item.id" class="__img"/>
        <div v-else class="_attach-file">
          <i class="el-icon-document"></i>
        </div>
        <span class="_attch-name">{{item.name}}</span>
      </div>
      <el-button v-else slot="reference" icon="el-icon-document" type="text">{{item.name}}</el-button>
      <div style="font-size:12px">
        <div>
          <b>附件名称</b>
          ：{{ item.name}}
        </div>
        <div>
          <b>附件大小</b>
          ：{{ $commonJs.getFileSizeText(item.size)}}
        </div>
        <div>
          <b>上传时间</b>
          ：{{$commonJs.toShortDatetimeString(item.createTime)}}
        </div>
        <div class="_attach-action">
          <el-button type="text" size="mini" icon="el-icon-view" @click="open(item)">预览</el-button>
          <el-button type="text" size="mini" icon="el-icon-download" @click="download(item)">下载</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            v-show="showDelete"
            @click="del(item,index)"
          >删除</el-button>
        </div>
      </div>
    </el-popover>
    <span class="c-tips" v-if="data.length==0">（未上传附件）</span>
  </div>
</template>
<script>
import api from "@/api/common/attach";
import attachImg from "./image"
export default {
  components: {attachImg},
  props: {
    showDelete: {
      type: Boolean,
      default: false
    },
    getDataFunc: {
      type: Function,
      default: undefined
    },
    deleteFunc: {
      type: Function,
      default: undefined
    },
    card: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: undefined
    },
    guid: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      loading: false,
      data: [],
      total: 0,
      initParams: {},
      hasData: false,
      queryParams: {},
      tempQueryParams: {},
      initQueryParams: {}
    };
  },
  created() {},
  computed: {
    listTotal() {
      return this.data.length;
    }
  },
  methods: {
    isImage(file) {
      let reg = new RegExp(".+(\\.jpeg$|\\.png$|\\.jpg$)");
      return reg.test(file.name);
    },
    reload() {
      return this.getData();
    },
    count() {
      return this.listTotal;
    },
    getDataOnce(initParams = {}) {
      if (!this.hasGetData) {
        return this.getData(initParams);
      }
      return Promise.resolve({ list: this.data, total: this.listTotal });
    },
    getData(initParams = null) {
      // if (!this.guid) {
      //   alert("请在附件列表上指定guid值！");
      //   return false;
      // }
      if (initParams != null) {
        this.clear();
        this.initParams = { ...initParams };
        return this.resetQuery();
      }
      let params = {
        ...this.tempQueryParams,
        ...this.initParams,
        ...this.orderParams
      };
      if(this.guid){
         params.entityGuid = this.guid;
      }
      if (this.type) {
        params.type = this.type;
      }
      params = this.$commonJs.obj.removeNullKey(params);
      this.loading = true;
      let getDataFunc = null;
      if (!this.getDataFunc) {
        getDataFunc = api.getList;
      }
      return new Promise((resolve, reject) => {
        getDataFunc(params)
          .then(res => {
            if (res.data instanceof Array) {
              this.data = res.data;
              this.total = res.data.length;
            } else if (res.data["list"] instanceof Array) {
              this.data = res.data.list;
              this.total = res.data["total"];
            } else {
              alert("找不到数据列表，请在data字段或者data.list字段赋值！");
            }
            this.hasGetData = true;
            this.loading = false;
            resolve({ list: this.data, total: this.listTotal });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    query() {
      this.tempQueryParams = { ...this.queryParams };
      return this.getData();
    },
    //重置查询条件
    resetQuery() {
      for (let key in this.queryParams) {
        this.queryParams[key] = this.initQueryParams[key];
      }
      return this.query();
    },
    add(data) {
      this.data.push(data);
    },
    open(item) {
      api.open(item.id);
    },
    download(item) {
      api.download(item.id, item.name);
    },
    clear() {
      this.data = [];
      this.total = 0;
    },
    del(item, index) {
      let deleteFunc = null;
      if (!this.deleteFunc) {
        deleteFunc = api.deleteById;
      }
      return this.$confirm("您确定删除该附件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        deleteFunc(item.id).then(res => {
          this.data.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$emit("deleted");
          this.loading = false;
          return Promise.resolve();
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
._attch-card {
  overflow: hidden;
  background-color: #fbfdff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  margin: 8px 8px 0 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  ._attach-file {
    line-height: 140px;
    font-size: 50px;
    text-align: center;
  }
  .__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ._attch-name {
    position: absolute;
    height: 24px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 24px;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
._attach-action {
  float: right;
  margin-top: 5px;
}
</style>