<template>
  <commonSelect
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择角色"
    :get-data-func="api.getCommonOptionList"
  />
</template>
<script>
import api from "@/api/sys/role";
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

