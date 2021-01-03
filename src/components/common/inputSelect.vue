<template>
  <el-select
    clearable
    style="width:100%"
    :value="value"
    :collapse-tags="collapseTags"
    :multiple="multiple"
    v-loading="loading"
    @click.native.capture="onClick"
    @input="v=>$emit('input',v)"

  >
    <el-option
      v-for="option in options"
      :key="option[idKey]"
      :label="option[labelKey]"
      :value="option[idKey]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    value: {},
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    idKey: {
      type: String,
      default: "id"
    },
    labelKey: {
      type: String,
      default: "name"
    }
  },
  watch: {
    value(v) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.multiple) {
          v = v || [];
          if(v.every(item=>this.options[i][this.idKey] != item)){
            this.options.splice(i,1);
            i--;
          }
        } else {
          if (this.options[i][this.idKey] != v) {
            this.options.splice(i, 1);
            i--;
          }
        }
      }
    }
  },
  methods: {
    onClick(e) {
      if (e.target.className.indexOf("close") < 0) {
        e.stopPropagation();
        this.$emit("click");
        this.show = true;
      }
    }
  }
};
</script>