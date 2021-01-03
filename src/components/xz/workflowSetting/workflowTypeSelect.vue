<template>
  <commonSelect
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择流程类别"
    :get-data-func="api.getWorkflowTypeList"
  />
</template>
<script>
import api from "@/api/xz/workflowSetting";
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

