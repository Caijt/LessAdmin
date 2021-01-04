<template>
  <div class="__common-list">
    <!-- 查询条件 -->
    <div class="c-flex c-mg-b-5p" v-show="showToolbar">
      <div class="c-flex-item-auto">
        <slot name="toolbar"></slot>
        <slot name="toolbar-left"></slot>
      </div>
      <div>
        <slot name="toolbar-right"></slot>
        <el-button
          :type="isExpandQuery ? undefined : 'primary'"
          v-show="showQuery"
          @click="isExpandQuery = !isExpandQuery"
          size="mini"
        >
          查询器
          <i
            class="el-icon--right"
            :class="{
              'el-icon-arrow-up': isExpandQuery,
              'el-icon-arrow-down': !isExpandQuery,
            }"
          ></i>
        </el-button>
      </div>
    </div>
    <div v-show="showQuery" class="c-mg-b-5p">
      <el-form
        class="__query-box c-query-form"
        inline
        :label-width="queryLabelWidth"
        v-show="isExpandQuery"
        @keyup.enter.native="query()"
      >
        <div style="display: flex; justify-content: center">
          <div>
            <slot name="query"></slot>
          </div>
        </div>
        <div style="text-align: center; margin-top: 10px">
          <el-button
            type="text"
            icon="el-icon-search"
            @click="query()"
            :disabled="disabled"
            >{{ queryButtonText }}</el-button
          >
          <el-button type="text" @click="resetQuery" :disabled="disabled"
            >重置</el-button
          >
        </div>
      </el-form>
    </div>
    <!--/ 查询条件 -->
    <!-- 数据表格 -->
    <el-table
      ref="table"
      stripe
      highlight-current-row
      :empty-text="disabled ? '列表已禁用' : undefined"
      :data="data"
      :select-on-indeterminate="false"
      :border="border"
      :row-key="idKey"
      :max-height="tableMaxHeight"
      :show-summary="showSummary"
      :default-expand-all="expandAllRow"
      :summary-method="getSummaryData"
      v-loading="isLoading"
      @selection-change="onCheckChange"
      @sort-change="onSortChange"
    >
      <el-table-column
        :fixed="checkboxFixed ? 'left' : undefined"
        v-if="showCheckbox"
        type="selection"
        width="35"
      />
      <el-table-column
        v-if="showIndex"
        type="index"
        :index="rowInitIndex"
        align="center"
        :width="indexColumnWidth"
        label="#"
      />
      <!-- slot[column] -->
      <slot name="column"></slot>
      <!--/ slot[column]-->
    </el-table>
    <!-- 数据表格 -->
    <!-- 分页 -->
    <el-pagination
      class="c-mg-t-5p"
      :layout="pageLayout"
      :page-size.sync="pageParams.pageSize"
      :current-page.sync="pageParams.pageIndex"
      :total="listTotal"
      v-if="page"
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
    idKey: {
      type: String,
      default: undefined,
    },
    checkboxFixed: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: "记录",
    },
    tableMaxHeight: {
      default: undefined,
    },
    showToolbar: {
      type: Boolean,
      default: true,
    },
    indexColumnWidth: {
      type: String,
      default: "35px",
    },
    showQuery: {
      type: Boolean,
      default: true,
    },
    queryButtonText: {
      type: String,
      default: "查询",
    },
    expandAllRow: {
      type: Boolean,
      default: false,
    },
    queryLabelWidth: {
      type: String,
      default: "70px",
    },
    expandQuery: {
      type: Boolean,
      default: true,
    },
    queryParams: {
      type: Object,
      defalut: () => ({}),
    },
    beforeQuery: {
      type: Function,
      default: undefined,
    },
    //本地排序，为true后，那点击列名排序时，不会发起远程排序
    localSort: {
      type: Boolean,
      defalut: false,
    },
    page: {
      type: Boolean,
      default: true,
    },
    pageLayout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    border: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    orderField: {
      type: String,
      default: "",
    },
    orderDesc: {
      type: Boolean,
      default: null,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    localDelete: {
      type: Boolean,
      default: false,
    },
    deleteConfirmText: {
      type: String,
      default: undefined,
    },
    confirmOnDelete: {
      type: Boolean,
      default: true,
    },
    deleteHelpMessage: {
      type: String,
      default: "",
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
      default: null,
    },

    /** getListFunc 属性介绍
     ** 接收一个查询条件的json对象，然后返回promise的函数，resolve的数据必须有一个字段为data的数组，如下
     ** 注：当page为false时，会使用此函数去获取数据
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
      default: null,
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
      default: null,
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
      default: null,
    },

    /** deleteFunc 属性介绍
     ** 接收一个id值，返回promise的函数，resolve的数据，reject最好有一个message字段，如下
     ** deleteFunc = (id) => {
     **   return new Promise((resolve, reject) => {
     **     //成功时
     **     resolve();
     **
     **     //失败时
     **     reject({
     **       message:"删除失败！"
     **     })
     **   });
     ** };
     */
    deleteFunc: {
      type: Function,
      default: null,
    },

    /** deleteBatchFunc 属性介绍
     ** 接收一个ids数组，返回promise的函数，resolve的数据，reject最好有一个message字段，如下
     ** deleteBatchFunc = (ids) => {
     **   return new Promise((resolve, reject) => {
     **     //成功时
     **     resolve();
     **
     **     //失败时
     **     reject({
     **       message:"删除失败！"
     **     })
     **   });
     ** };
     */
    deleteBatchFunc: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      hasGetData: false,
      data: [],
      total: 0,
      isLoading: false,
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
        orderDesc: this.orderDesc, //排序顺序
      },
      pageParams: {
        pageSize: this.$store.state.sys.config.LIST_DEFAULT_PAGE_SIZE || 10, //分页大小
        pageIndex: 1,
      },
    };
  },
  mounted() {
    this.initQueryParams = { ...this.queryParams };
    this.tempQueryParams = { ...this.queryParams };
  },
  computed: {
    listTotal() {
      if (this.page) {
        return this.total;
      }
      return this.data.length;
    },
    rowInitIndex() {
      if (this.page) {
        return this.pageParams.pageSize * (this.pageParams.pageIndex - 1) + 1;
      } else {
        return 1;
      }
    },
  },
  methods: {
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
    onCheckChange(valueArrary) {
      this.checkedRows = valueArrary;
      this.$emit("check-change", valueArrary);
    },
    onSortChange({ prop, order }) {
      if (this.localSort) {
        return;
      }
      if (order) {
        this.orderParams.orderDesc = order == "descending" ? true : false;
        this.orderParams.orderField = prop;
      } else {
        this.orderParams.orderDesc = this.orderDesc;
        this.orderParams.orderField = this.orderField;
      }
      this.getData();
    },
    getSummaryData({ columns, data }) {
      let sum = [];
      let labelIndex = 0;
      this.showCheckbox && labelIndex++;
      this.showIndex && labelIndex++;
      columns.forEach((column, i) => {
        if (i == labelIndex) {
          sum[i] = "合计";
        } else {
          sum[i] = this.summaryData[column.property];
        }
      });
      return sum;
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
      if (this.disabled) {
        return Promise.resolve();
      }
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
        ...this.orderParams,
      };
      params = this.$commonJs.obj.removeNullKey(params);
      this.isLoading = true;
      let getDataFunc = null;
      if (this.getDataFunc) {
        getDataFunc = this.getDataFunc;
      } else {
        if (!this.page) {
          if (!this.getListFunc) {
            alert("请指定list组件里get-list-func或get-data-func属性！");
            return false;
          }
          getDataFunc = this.getListFunc;
        } else if (!this.showSummary) {
          if (!this.getPageListFunc) {
            alert("请指定list组件里get-page-list-func或get-data-func属性！");
            return false;
          }
          getDataFunc = this.getPageListFunc;
        } else {
          if (!this.getPageListWidthSummaryFunc) {
            alert("请指定list组件里get-page-list-width-summary-func属性！");
            return false;
          }
          getDataFunc = this.getPageListWidthSummaryFunc;
        }
      }
      return new Promise((resolve, reject) => {
        getDataFunc(params)
          .then((res) => {
            this.isLoading = false;
            if (res.code != 0) {
              return;
            }
            if (res.data instanceof Array) {
              this.data = res.data;
              this.total = res.data.length;
              if (this.page) {
                alert(
                  "当前列表已启用分页，请返回{data:{list:total}}的数据结构！"
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
            this.hasGetData = true;
            resolve({ list: this.data, total: this.listTotal });
          })
          .catch((err) => {
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
    },
    getCheckedRows() {
      return this.checkedRows;
    },
    getCheckedRowsWithMessage() {
      return this.$commonJs.getRows(this.getCheckedRows(), this.unit);
    },
    getCheckedRowWithMessage() {
      return this.$commonJs.getOneRow(this.getCheckedRows(), this.unit);
    },
    _delete(func, data, rows, message) {
      return new Promise((resolve, reject) => {
        let promise;
        if (this.confirmOnDelete) {
          promise = this.$confirm(message, "删除确认", {
            type: "warning",
          });
        } else {
          promise = Promise.resolve();
        }
        return promise
          .then(() => {
            this.isLoading = true;
            func(data)
              .then((res) => {
                if (this.page) {
                  this.getData();
                } else {
                  if (!(rows instanceof Array)) {
                    rows = [rows];
                  }
                  rows.forEach((item) => {
                    let rowIndex = this.data.indexOf(item);
                    if (rowIndex > -1) {
                      this.data.splice(rowIndex, 1);
                    }
                  });
                  this.isLoading = false;
                }
                this.$emit("deleted");
                if (this.confirmOnDelete) {
                  this.$message.success("删除成功");
                }
                resolve(res);
              })
              .catch((err) => {
                this.isLoading = false;
                reject(err);
              });
          })
          .catch((res) => {});
      });
    },
    delete(row = null) {
      row = row || this.getCheckedRowWithMessage();
      if (!row) {
        return false;
      }
      let deleteFunc;
      if (this.localDelete) {
        deleteFunc = () => Promise.resolve();
      } else {
        if (!this.deleteFunc) {
          alert("请在list组件中指定delete-func属性");
          return false;
        } else {
          deleteFunc = this.deleteFunc;
        }
      }

      let text =
        "您确定要删除这个" + this.unit + "吗？" + this.deleteHelpMessage;
      if (this.deleteConfirmText) {
        text = this.deleteConfirmText;
      }
      return this._delete(deleteFunc, row[this.idKey], [row], text);
    },
    deleteBatch() {
      let rows = this.getCheckedRowsWithMessage();
      if (!rows) {
        return false;
      }
      let deleteFunc;
      if (this.localDelete) {
        deleteFunc = () => Promise.resolve();
      } else {
        if (!this.deleteBatchFunc) {
          alert("请在list组件中指定delete-func属性");
          return false;
        } else {
          deleteFunc = this.deleteBatchFunc;
        }
      }
      let text =
        "您确定要删除这 " +
        rows.length +
        " 个" +
        this.unit +
        "吗？" +
        this.deleteHelpMessage;
      if (this.deleteBatchConfirmText) {
        text = this.deleteBatchConfirmText;
      }
      return this._delete(
        deleteFunc,
        rows.map((row) => row[this.idKey]),
        rows,
        text
      );
    },
    add(row) {
      if (row instanceof Array) {
        row.forEach((item) => {
          this.data.push(item);
        });
      } else {
        this.data.push(row);
      }
    },
    loading(isLoading = true) {
      this.isLoading = isLoading;
    },
  },
};
</script>
<style lang="scss" scoped>
.__common-list {
  .__query-box {
    border: 1px solid #e4e7ed;
    border-radius: 2px;
    padding: 10px 5px 5px;
  }
  .__toolbar {
    display: flex;
  }
}
</style>
