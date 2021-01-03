import listMixin from "./list"
import dialogMixin from "./dialog"
export default {
  mixins: [dialogMixin, listMixin],
  props: {
    showSelect: {
      type: Boolean,
      default: false
    },
    select:{
      type:Boolean,
      default:false
    },
    selectable:{
      type:Boolean,
      default:false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect(row) {
      this.$emit("select", row);
      this.refDialog.close();
    },
    selectMultiple() {
      let rows = this.refList.getCheckedRows();
      this.$emit("select-multiple", rows);
      this.refDialog.close();
    }
  }
}