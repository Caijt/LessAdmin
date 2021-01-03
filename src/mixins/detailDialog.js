import dialogMixin from "./dialog";
export default {
  mixins: [dialogMixin],
  computed: {
    hasAttach() {
      return this.$refs["attach"] ? true : false;
    }
  }
}