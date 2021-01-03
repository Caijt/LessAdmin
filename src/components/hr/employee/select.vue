<template>
  <div>
    <input-select
      :multiple="multiple"
      :collapse-tags="collapseTags"
      :value="value"
      :options="options"
      @click="onClick"
      :loading="isLoading"
      @input="(v)=>$emit('input',v)"
    />
    <component
      :is="common?'employeeCommonDialog':'employeeDialog'"
      ref="employeeDialog"
      :in-dialog="inDialog"
      selectable
      :multiple="multiple"
      @select="onSelect"
      @select-multiple="onSelectMultiple"
    />
  </div>
</template>
<script>
import employeeDialog from "./listDialog";
import employeeCommonDialog from "./common/listDialog";
import api from "@/api/hr/employee";
export default {
  components: { employeeDialog ,employeeCommonDialog},
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    common:{
      type:Boolean,
      default:false
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
  data() {
    return {
      options: [],
      isLoading: false
    };
  },
  methods: {
    onClick() {
      let notIds;
      if (this.multiple) {
        notIds = this.value;
      } else {
        notIds = this.value ? [this.value] : [];
      }
      this.$refs.employeeDialog.open().then(that => {
        that.getData({ ...this.params, notIds });
      });
    },
    onSelect(data) {
      this.$emit("input", data.id);
      this.options = [data];
      this.$emit("select",data);
    },
    onSelectMultiple(data) {
      let ids = data.map(item => item.id);
      ids = (this.value || []).concat(ids);
      this.$emit("input", ids);
      this.options = this.options.concat(data);
    },
    setOptions(data) {
      this.options = data;
    },
    //获取option值
    getOptions() {
      let ids = this.value;
      if (!(ids instanceof Array)) {
        ids = ids ? [ids] : [];
      }
      if (ids.length > 0) {
        this.isLoading = true;
        api.getOptionList({ ids }).then(res => {
          this.options = res.data;
          this.isLoading = false;
        });
      }
    }
  }
};
</script>