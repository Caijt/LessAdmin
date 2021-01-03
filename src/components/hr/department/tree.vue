<template>
  <tree
    :current-node-key="currentNodeKey"
    :default-checked-keys="defaultCheckedKeys"
    ref="tree"
    :show-checkbox="showCheckbox"
    :height="height"
    :get-data-func="api.getList"
    default-expand-all
    @node-click="(d,n,c)=>$emit('node-click',d,n,c)"
    @check="(d,t)=>$emit('check',d,t)"
  >
    <slot name="node-right" slot="node-right" slot-scope="{data,node}" :data="data" :node="node"></slot>
  </tree>
</template>
<script>
import api from "@/api/hr/department";
import tree from "@/components/common/tree";
import treeMixin from "@/mixins/tree";
export default {
  props: {
    currentNodeKey: {},
    defaultCheckedKeys: {},
    showCheckbox: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  mixins: [treeMixin],
  components: { tree },
  data() {
    return {
      api
    };
  },
  methods: {}
};
</script>