<template>
  <div>
    <el-input
      :value="displayName"
      :placeholder="placeholder"
      readonly
      :type="type"
      clearable
      @click.native="$emit('click')"
    >
      <i
        style="cursor: pointer;"
        v-show="hasValue && clearable"
        slot="suffix"
        class="el-input__icon el-icon-close"
        @click.stop="clear"
      ></i>
    </el-input>
  </div>
</template>
<script>
import { blueviolet } from "color-name";
export default {
  props: {
    value: {},
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "点击选择"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      name: ""
    };
  },
  computed: {
    hasValue() {
      return this.value != undefined && this.value != null && this.value != "";
    },
    displayName() {
      return this.hasValue
        ? this.label ||
            this.name ||
            (this.value instanceof Array ? this.value.join(",") : this.value)
        : "";
    }
  },
  methods: {
    clear() {
      this.name = "";
      this.$emit("input", null);
    },
    setName(name) {
      this.name = name;
    }
  }
};
</script>

