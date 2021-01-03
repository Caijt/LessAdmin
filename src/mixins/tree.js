export default {
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    currentNodeKey:{
      
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  data() {
    return {
    }
  },
  computed:{
    refTree() {
      if (!this.$refs.tree) {
        alert("请在Tree公共组件上指定ref=\"tree\"");
      }
      return this.$refs.tree;
    }
  },
  methods: {
    getDataOnce(params) {
      return this.refTree.getDataOnce(params);
    },
    getData(params) {
      return this.refTree.getData(params);
    },
    reload() {
      return this.refTree.getData();
    },
    filter() {
      return this.refTree.filter();
    },
    getCheckedNodes() {
      return this.refList.getCheckedNodes();
    },
    getCheckedNodesWithMessage() {
      return this.refList.getCheckedNodesWithMessage();
    },
    getCheckedNodeWithMessage() {
      return this.refList.getCheckedNodeWithMessage();
    },
    clear() {
      this.refTree.clear();
    },
    delete(row = null) {
			return this.refList.delete(row);
		},
		deleteBatch() {
			return this.refList.deleteBatch(row);
		}
  }
}