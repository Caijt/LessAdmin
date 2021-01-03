<template>
  <commonSelect
    :multiple="multiple"
    :clearable="clearable"
    :value="value"
    @input="v=>$emit('input',v)"
    placeholder="请选择离职类型"
    :get-data-func="getData"
  />
</template>
<script>
import api from "@/api/hr/dimissionRecord";
import commonSelect from "@/components/common/select";
export default {
  props: {
    value: {},
    clearable: {
      type: Boolean,
      default: false
    },
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
  methods: {
    getData() {
      return Promise.resolve({
        data: api.dimissionTypes
      });
    }
  }
};
</script>

