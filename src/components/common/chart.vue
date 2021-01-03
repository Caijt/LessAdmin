<template>
  <div>
    <!-- 统计条件 -->
    <div v-show="showToolbar">
      <div class="__toolbar">
        <div style="flex:1">
          <slot name="toolbar"></slot>
          <slot name="toolbar-left"></slot>
        </div>
        <div style="flex-shrink:0">
          <slot name="toolbar-right"></slot>
          <el-button
            :type="isExpandQuery?undefined:'primary'"
            v-show="showQuery"
            @click="isExpandQuery=!isExpandQuery;"
            size="mini"
          >
            统计器
            <i
              class="el-icon--right"
              :class="{'el-icon-arrow-up':isExpandQuery,'el-icon-arrow-down':!isExpandQuery}"
            ></i>
          </el-button>
        </div>
      </div>
      <el-form
        class="__query-box c-query-form"
        inline
        :label-width="queryLabelWidth"
        v-show="isExpandQuery&&showQuery"
        @keyup.enter.native="query()"
      >
        <div style="display:flex;justify-content:center">
          <div>
            <slot name="query"></slot>
          </div>
        </div>
        <div style="text-align:center;margin-top:10px">
          <el-button type="text" icon="el-icon-search" @click="query()">{{queryButtonText}}</el-button>
          <el-button type="text" @click="resetQuery">重置</el-button>
        </div>
      </el-form>
    </div>
    <!--/ 查询条件 -->
    <!-- 数据图表 -->
    <div ref="chartContainer" :style="{width:'100%',height:chartHeight}"></div>
    <!-- 数据图表 -->
    <!-- 分页 -->
    <el-pagination
      v-if="page"
      background
      style="margin-top: 5px;"
      :page-size.sync="pageParams.pageSize"
      :current-page.sync="pageParams.pageIndex"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listTotal"
      @size-change="onPageSizeChange"
      @current-change="onPageIndexChange"
    />
    <div class="el-pagination el-pagination__total" v-else>
      <!-- <span>总共 {{data.length}} 条记录</span> -->
    </div>
    <!--/ 分页 -->
  </div>
</template>
<script>
export default {
  props: {
    chartHeight: {
      type: String,
      default: "350px"
    },
    unit: {
      type: String,
      default: "记录"
    },
    tableMaxHeight: {
      default: 0
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    indexColumnWidth: {
      type: String,
      default: "35px"
    },
    showQuery: {
      type: Boolean,
      default: false
    },
    queryButtonText: {
      type: String,
      default: "查询"
    },
    expandAllRow: {
      type: Boolean,
      default: false
    },
    queryLabelWidth: {
      type: String,
      default: "70px"
    },
    expandQuery: {
      type: Boolean,
      default: false
    },
    queryParams: {
      type: Object,
      defalut: () => ({})
    },
    beforeQuery: {
      type: Function,
      default: undefined
    },
    //本地排序，为true后，那点击列名排序时，不会发起远程排序
    localSort: {
      type: Boolean,
      defalut: false
    },
    page: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    orderField: {
      type: String,
      default: ""
    },
    orderDesc: {
      type: Boolean,
      default: null
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    localDelete: {
      type: Boolean,
      default: false
    },
    deleteConfirmText: {
      type: String,
      default: undefined
    },
    confirmOnDelete: {
      type: Boolean,
      default: true
    },
    deleteBatchFunc: {
      type: String,
      default: undefined
    },
    deleteHelpMessage: {
      type: String,
      default: ""
    },
    /** getDataFunc 属性介绍
     ** 接收一个查询条件的json对象，然后返回promise的函数，resolve的数据必须有一个字段为data的数组，如下
     ** 注：此属性如果有设置，则getListFunc、getPageListFunc、getPageListWithSummaryFunc函数都不起效
     ** getDataFunc = (params) => {
     **   return new Promise((resolve, reject) => {
     **     //无分页时
     **     resolve({
     **       data: []
     **     });
     **      //有分页时
     **     resolve({
     **       data: {list:[],total:0}
     **     });
     **   });
     ** };
     **/
    getDataFunc: {
      type: Function,
      default: null
    },

    /** getListFunc 属性介绍
     ** 接收一个查询条件的json对象，然后返回promise的函数，resolve的数据必须有一个字段为data的数组，如下
     ** 注：当page为true时，会使用此函数去获取数据
     ** listApiFunc = (params) => {
     **   return new Promise((resolve, reject) => {
     **     resolve({
     **       data: []
     **     });
     **   });
     ** };
     **/
    getListFunc: {
      type: Function,
      default: null
    },

    /** getPageListFunc 属性介绍
     ** 接收一个查询条件的json对象，然后返回promise的函数，resolve的数据必须有一个字段为data的对象，里面有一个list的数组跟一个total字段，如下
     ** 注：当page为false、showSummary为false时，会使用此函数去获取数据
     ** getPageListFunc = (params) => {
     **   return new Promise((resolve, reject) => {
     **     resolve({
     **       data: {
     **         list:[],
     **         total
     **       }
     **     });
     **   });
     ** };
     **/
    getPageListFunc: {
      type: Function,
      default: null
    },

    /** getPageListWidthSummaryFunc 属性介绍
     ** 接收一个查询条件的json对象，然后返回promise的函数，resolve的数据必须有一个字段为data的对象，里面有一个list的数组、一个total字段跟一个summary对象，如下
     **  getPageListWidthSummaryFunc = (params) => {
     **    return new Promise((resolve, reject) => {
     **     resolve({
     **       data: {
     **         list:[],
     **         total,
     **         summary:{}
     **       }
     **     });
     **   });
     ** };
     **/
    getPageListWidthSummaryFunc: {
      type: Function,
      default: null
    },
    option: {
      type: Object,
      defalut: () => ({})
    }
  },
  data() {
    return {
      chart: null,
      hasGetData: false,
      data: [],
      total: 0,
      loading: false,
      checkedRows: [],
      summaryData: {},
      isExpandQuery: this.expandQuery,
      initParams: {},
      //查询参数
      tempQueryParams: {},
      initQueryParams: {},
      //数据请求的参数
      orderParams: {
        orderField: this.orderField, //排序字段
        orderDesc: this.orderDesc //排序顺序
      },
      pageParams: {
        pageSize: this.$store.state.sys.pageSize, //分页大小
        pageIndex: 1
      }
    };
  },
  mounted() {
    this.initQueryParams = { ...this.queryParams };
    this.tempQueryParams = { ...this.queryParams };
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return false;
    }
    if (!this.chart.isDisposed()) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  computed: {
    listTotal() {
      if (this.page) {
        return this.total;
      }
      return this.data.length;
    }
  },
  methods: {
    initChart() {
      let echarts = require("echarts");
      this.chart = echarts.init(this.$refs.chartContainer);
      this.chart.setOption(this.option);
      // this.chart.setOption({
      //   legend: {},
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   xAxis: [
      //     {
      //       type: "category"
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       name: "金额",
      //       gridIndex: 0
      //     },
      //     {
      //       type: "value",
      //       name: "数量",
      //       gridIndex: 0,
      //       splitLine: {
      //         show: false
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "资产金额",
      //       type: "bar"
      //     },
      //     {
      //       name: "资产数量",
      //       type: "line",
      //       yAxisIndex: 1
      //     }
      //   ]
      // });
    },
    //分页容量大小发生变化时
    onPageSizeChange(value) {
      // this.pageParams.pageSize = value;
      this.getData();
    },
    //
    onPageIndexChange(pageIndex) {
      // this.pageParams.currentPage = pageIndex;
      this.getData();
    },
    initData(params = {}) {
      this.initParams = { ...params };
      this.resetQuery();
    },
    getDataOnce(initParams = {}) {
      if (!this.hasGetData) {
        return this.getData(initParams);
      }
      return Promise.resolve({ list: this.data, total: this.listTotal });
    },
    getData(initParams = null) {
      if (initParams != null) {
        this.clear();
        this.initParams = { ...initParams };
        return this.resetQuery();
      }
      let params = {};
      if (this.page) {
        params = { ...this.pageParams };
      }
      params = {
        ...params,
        ...this.tempQueryParams,
        ...this.initParams,
        ...this.orderParams
      };
      params = this.$commonJs.obj.removeNullKey(params);
      // this.loading = true;
      this.echarts.showLoading();
      let getDataFunc = null;
      if (this.getDataFunc) {
        getDataFunc = this.getDataFunc;
      } else {
        if (!this.page) {
          if (!this.getListFunc) {
            alert("请指定chart组件里get-list-func或get-data-func属性！");
            return false;
          }
          getDataFunc = this.getListFunc;
        } else if (!this.showSummary) {
          if (!this.getPageListFunc) {
            alert("请指定chart组件里get-page-list-func或get-data-func属性！");
            return false;
          }
          getDataFunc = this.getPageListFunc;
        } else {
          if (!this.getPageListWidthSummaryFunc) {
            alert("请指定chart组件里get-page-list-width-summary-func属性！");
            return false;
          }
          getDataFunc = this.getPageListWidthSummaryFunc;
        }
      }
      return new Promise((resolve, reject) => {
        getDataFunc(params)
          .then(res => {
            if (res.data instanceof Array) {
              this.data = res.data;
              this.total = res.data.length;
              if (this.page) {
                alert(
                  "当前图表已启用分页，请返回{data:{list:total}}的数据结构！"
                );
              }
            } else if (res.data["list"] instanceof Array) {
              this.data = res.data.list;
              this.total = res.data["total"];
              if (this.showSummary && res.data["summary"]) {
                this.summaryData = res.data.summary;
              }
            } else {
              alert("找不到数据列表，请在data字段或者data.list字段赋值！");
            }
            this.echarts.setOption({
              dataset: {
                source: this.data
              }
            });
            this.hasGetData = true;
            // this.loading = false;
            this.echarts.hideLoading();
            resolve({ list: this.data, total: this.listTotal });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    reload() {
      return this.getData();
    },
    setData(data) {
      this.data = data;
    },
    setInitParams(initParams) {
      this.initParams = { ...initParams };
    },
    //查询方法
    query(params = null) {
      if (this.beforeQuery && !this.beforeQuery()) {
        return false;
      }
      if (params != null) {
        for (let key in params) {
          this.queryParams[key] = params[key];
        }
      }
      this.tempQueryParams = { ...this.queryParams };
      this.pageParams.pageIndex = 1;
      return this.getData();
    },
    //重置查询条件
    resetQuery() {
      for (let key in this.queryParams) {
        this.queryParams[key] = this.initQueryParams[key];
      }
      return this.query();
    },
    clear() {
      this.total = 0;
      this.data = [];
      this.chart.clear();
      this.chart.setOption(this.option);
    },
    add(row) {
      if (row instanceof Array) {
        row.forEach(item => {
          this.data.push(item);
        });
      } else {
        this.data.push(row);
      }
    },
    setOption(option) {
      this.chart.setOption(option);
    }    
  }
};
</script>
<style lang="scss" scoped>
.__query-box {
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  padding: 10px 5px 5px;
  margin-bottom: 5px;
}
.__toolbar {
  display: flex;
  margin-bottom: 5px;
}
</style>
