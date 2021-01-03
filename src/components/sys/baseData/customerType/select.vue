<template>
  <commonSelect
    :value="value"
    :clearable="clearable"
    @input="v=>$emit('input',v)"
    placeholder="请选择客户类型"
    :get-data-func="api.getCustomerTypeList"
  />
</template>
<script>
import api from "@/api/sys/baseData";
import commonSelect from "@/components/common/select";
export default {
  props: {
    value: {},
    clearable: {
      type: Boolean,
      default: false
    }
  },
  components: { commonSelect },
  data() {
    return {
      api
    };
  },
  methods: {}
};
</script>

