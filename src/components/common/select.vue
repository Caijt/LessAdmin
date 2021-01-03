<template>
  <el-select
    ref="select"
    :value="value"
    :placeholder="placeholder"
    @change="change"
    filterable
    :loading="loading"
    style="width:100%"
    :collapse-tags="collapseTags"
    :multiple="multiple"
    :clearable="clearable"
  >
    <el-option
      v-for="item in list"
      :key="item[idKey]"
      :label="item[labelKey]"
      :value="item[idKey]"
      v-show="!item[disabledKey]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    getDataFunc: {
      type: Function,
      default: null
    },
    value: {},
    placeholder: {
      type: String,
      default: "请选择"
    },
    idKey: {
      type: String,
      default: "id"
    },
    labelKey: {
      type: String,
      default: "name"
    },
    disabledKey: {
      type: String,
      default: "isDisabled"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      loading: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (!this.getDataFunc) {
        alert("请指定get-data-func属性！");
        return;
      }
      this.loading = true;
      return this.getDataFunc()
        .then(res => {
          this.list = res.data;
          this.loading = false;
          return res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(value) {
      this.$emit("input", value);
    }
  }
};
</script>

