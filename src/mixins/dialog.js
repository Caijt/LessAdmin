export default {
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    refDialog() {
      if (!this.$refs.dialog) {
        alert("请在Dialog公共组件上指定ref=\"dialog\"");
      }
      return this.$refs.dialog;
    }
  },
  methods: {
    open(data = null) {
      return this.refDialog.open(data).then(() => this);
    },
    close(isForce) {
      return this.refDialog.close(isForce);
    },
    loading(isLoading = true) {
      this.refDialog.loading(isLoading);
    },
    setData(data) {
      this.refDialog.setData(data);
    },
    getData(id) {
      return this.refDialog.getData(id);
    },
    reload() {
      return this.refDialog.reload();
    },
    save(isForce = false) {
      return this.refDialog.save(isForce);
    },
    getGuid() {
      return this.refDialog.getGuid();
    },
    openCreate(data = null) {
      return this.refDialog.openCreate(data).then(() => this);
    },
    openEdit(data) {
      return this.refDialog.openEdit(data).then(() => this);
    },
    openEditById(id) {
      return this.refDialog.openEditById(id).then(() => this);
    },
    openDetail(data) {
      return this.refDialog.openDetail(data).then(() => this);
    },
    openDetailById(id) {
      return this.refDialog.openDetailById(id).then(() => this);
    }
  }
}