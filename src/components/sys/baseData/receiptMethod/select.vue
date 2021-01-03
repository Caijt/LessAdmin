<template>
  <commonSelect
    ref="commonSelect"
    :value="value"
    @input="onSelected"
    placeholder="请选择收款方式"
    :get-data-func="api.getReceiptMethodList"
  />
</template>
<script>
import api from "@/api/sys/baseData";
import commonSelect from "@/components/common/select";
export default {
  props: {
    value: {}
  },
  components: { commonSelect },
  data() {
    return {
      api
    };
  },
  methods: {
    onSelected(v) {
      let obj = this.$refs.commonSelect.list.find(item => {
        return item.id === v;
      });
      this.$emit("input", obj);
    }
  }
};
</script>

