import treeMixin from "./tree"
import dialogMixin from "./dialog"
export default {
  mixins: [dialogMixin, treeMixin],
  props: {
    select: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect(data, node, component) {
      if (this.select && !this.multiple) {
        this.$emit("select", data, node);
        this.refDialog.close();
      } else {
        this.$emit("node-click", data, node, component);
      }
    },
    selectMultiple() {
      let nodes = this.$refList.getCheckedNodes();
      this.$emit("select-multiple", nodes);
      this.refDialog.close();
    }
  }
}