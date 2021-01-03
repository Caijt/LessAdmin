<template>
  <commonSelect
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择工资项目"
    :get-data-func="api.getOptionList"
  />
</template>
<script>
import api from "@/api/hr/wageItem";
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

