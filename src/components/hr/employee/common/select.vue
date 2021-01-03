<template>
  <employee-select ref="employeeSelect" common v-bind="$props" @input="$emit('input',$event)" @select="$emit('select',$event)"/>
</template>
<script>
import employeeSelect from "../select";
export default {
  components: { employeeSelect },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {},
    //员工查询参数
    params: {
      type: Object,
      default: undefined
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setOptions(data) {
      this.$refs.employeeSelect.setOptions(data);
    },
    getOptions() {
      this.$refs.employeeSelect.getOptions();
    }
  }
};
</script>