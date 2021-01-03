<template>
  <div v-loading="loading" class="c-flex c-flex-column">
    <div style="margin-bottom: 5px;flex: none;">
      <el-input placeholder="输入关键字" v-model="filterText">
        <el-button icon="el-icon-refresh" slot="prepend" @click="reload"></el-button>
      </el-input>
    </div>
    <div :style="treeStyle" style="overflow-y:auto;flex:auto">
      <el-tree
        check-strictly
        :current-node-key="currentNodeKey"
        :node-key="idKey"
        :default-checked-keys="defaultCheckedKeys"
        :show-checkbox="showCheckbox"
        :expand-on-click-node="false"
        highlight-current
        :data="data"
        :props="treeProps"
        ref="tree"
        :filter-node-method="onFilterNode"
        :default-expand-all="defaultExpandAll"
        @node-click="onNodeClick"
        @check="onCheck"
      >
        <slot slot-scope="{node,data}" :data="data" :node="node">
          <span class="__tree-node">
            <slot name="node-left" :data="data" :node="node">
              <span style="font-size:14px">{{ node.label}}</span>
            </slot>
            <span>
              <slot name="node-right" :data="data" :node="node"></slot>
            </span>
          </span>
        </slot>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentNodeKey: {},
    defaultCheckedKeys: {},
    showCheckbox: {
      type: Boolean,
      default: false
    },
    idKey: {
      type: String,
      default: "id"
    },
    labelKey: {
      type: String,
      default: "name"
    },
    childrenKey: {
      type: String,
      default: "children"
    },
    parentKey: {
      type: String,
      default: "parentId"
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "auto"
    },
    queryPlaceholder: {
      type: String,
      default: "输入关键字"
    },
    getDataFunc: {
      type: Function,
      default: undefined
    },
    deleteFunc: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      filterText: "",
      loading: false,
      data: [],
      hasData: false
    };
  },
  computed: {
    treeStyle() {
      if (this.height == "auto") {
        return {};
      } else {
        return {
          height: this.height,
          paddingRight: "15px",
          overflow: "auto"
        };
      }
    },
    treeProps() {
      return {
        label: this.labelKey,
        children: this.childrenKey
      };
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    getDataOnce() {
      if (this.hasData) {
        return Promise.resolve({ data: this.data });
      }
      return this.getData();
    },
    getData(params = {}) {
      if (!this.getDataFunc) {
        alert("请指定get-data-func属性！");
        return false;
      }
      this.loading = true;
      return this.getDataFunc(params).then(res => {
        this.data = this.$commonJs.toTreeData(
          res.data,
          this.parentKey,
          this.childrenKey
        );
        this.hasData = true;
        this.loading = false;
        return res;
      });
    },
    onFilterNode(value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    onNodeClick(data, node, component) {
      this.$emit("node-click", data, node, component);
    },
    onCheck(data, checkedStatus) {
      this.$emit("check", data, checkedStatus);
    },
    clear() {
      this.data = [];
    },
    reload() {
      return this.getData();
    },
    resetQuery() {
      this.filterText = "";
    },
    filter(keyword) {
      this.filterText = keyword;
    }
  }
};
</script>
<style lang='scss'>
.__tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
</style>