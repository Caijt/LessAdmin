<template>
  <commonSelect
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择投诉类型"
    :get-data-func="api.getComplainTypeList"
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
  methods: {}
};
</script>

