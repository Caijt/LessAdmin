<template>
  <commonSelect
    :multiple="multiple"
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择职务"
    :get-data-func="api.getPostList"
  />
</template>
<script>
import api from "@/api/sys/baseData";
import commonSelect from "@/components/common/select";
export default {
  props: {
    value: {},
    multiple: {
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

