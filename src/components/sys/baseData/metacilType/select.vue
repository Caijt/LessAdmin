<template>
  <commonSelect
    ref="commonSelect"
    :value="value"
    @input="v=>$emit('input',v)"
    :clearable="clearable"
    placeholder="请选择灭害种类"
    :get-data-func="api.getMetacilTypeList"
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
  methods: {
  }
};
</script>