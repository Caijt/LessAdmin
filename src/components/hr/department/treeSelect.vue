<template>
  <div>
    <el-popover  placement="left"	 v-model="show" width="400" trigger="click">
      <tree class="__popover-tree" :show-checkbox="multiple" ref="tree" @node-click="onSelect" @check="onCheck">
        <template slot="node-right" slot-scope="{data,node}" v-if="multiple">
          <el-button type="text" @click="onAll(data,node)">全选</el-button>
        </template>
      </tree>
      <input-select
        :multiple="multiple"
        :collapse-tags="collapseTags"
        :value="value"
        @input="v=>$emit('input',v)"
        @click="show=true"
        :options="options"
        slot="reference"
      />
    </el-popover>
  </div>
</template>
<script>
import tree from "./tree";
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {},
    autoInit: {
      type: Boolean,
      default: true
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  components: { tree },
  data() {
    return {
      show: false,
      options: []
    };
  },
  mounted() {
    if (this.autoInit) {
      this.getData();
    }
  },
  computed: {
    refTree() {
      return this.$refs.tree.refTree.$refs.tree;
    }
  },
  watch: {
    value(v) {
      this.update();
    }
  },
  methods: {
    update() {
      let v = this.value;
      if (this.multiple) {
        v = v || [];
        if (!(v instanceof Array)) {
          alert("请传入数组类型");
          return;
        }
        this.refTree.setCheckedKeys(v);
        var checkedNodes = this.refTree.getCheckedNodes();
        this.options = checkedNodes;
        this.refTree.setCurrentKey(null);
      } else {
        this.refTree.setCurrentKey(v || null);
        var node = this.refTree.getCurrentNode();
        this.options = node ? [node] : [];
      }
    },
    onSelect(d, n, c) {
      if (!this.multiple) {
        this.$emit("input", d.id);
      }
      this.$emit("node-click", d, n, c);
    },
    getData() {
      return this.$refs.tree.getData().then(() => {
        this.update();
        return;
      });
    },
    onCheck(data, tree) {
      this.$emit("input", tree.checkedKeys);
    },
    onAll(data, node) {
      this.checkedNodes(node, !node.checked);
      this.$emit("input", this.refTree.getCheckedKeys());
    },
    checkedNodes(node, checked) {
      this.refTree.setChecked(node.data, checked);
      node.childNodes.forEach(item => {
        this.checkedNodes(item, checked);
      });
    }
  }
};
</script>
<style>
.__popover-tree{
  max-height: calc(100vh - 35px);
}
</style>