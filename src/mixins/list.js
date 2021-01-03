export default {
  props: {
    showSummary: {
      type: Boolean,
      default: false
    },
    inDialog: {
      type: Boolean,
      default: false
    },
    checkboxFixed: {
      type: Boolean,
      default: true
    },
    showQuery: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    expandQuery: {
      type: Boolean,
      default: true
    },
    page: {
      type: Boolean,
      default: true
    },
    orderField: {
      type: String,
      default: ""
    },
    orderDesc: {
      default: null
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    refList() {
      if (!this.$refs.list) {
        alert("请在List公共组件上指定ref=\"list\"");
      }
      return this.$refs.list;
    },
    listData() {
      return this.refList.data;
    }
  },
  methods: {
    getDataOnce(params) {
      return this.refList.getDataOnce(params);
    },
    getData(params) {
      return this.refList.getData(params);
    },
    setData(data) {
      this.refList.setData(data);
    },
    reload() {
      return this.refList.getData();
    },
    query(params) {
      return this.refList.query(params);
    },
    getCheckedRows() {
      return this.refList.getCheckedRows();
    },
    getCheckedRowsWithMessage() {
      return this.refList.getCheckedRowsWithMessage();
    },
    getCheckedRowWithMessage() {
      return this.refList.getCheckedRowWithMessage();
    },
    clear() {
      this.refList.clear();
    },
    delete(row = null) {
      return this.refList.delete(row);
    },
    deleteBatch() {
      return this.refList.deleteBatch();
    },
    loading(isLoading = true) {
      return this.refList.loading(isLoading);
    },
  }
}