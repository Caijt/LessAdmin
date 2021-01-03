export default {
  mounted() {
    this.reload();
  },
  methods: {
    reload() {
      this.$refs.list.reload();
    },
    create() {
      this.$refs.editDialog.openCreate();
    },
    edit(row) {
      this.$refs.editDialog.openEdit(row);
    },
    editById(id) {
      this.$refs.editDialog.openEditById(id);
    },
    deleteBatch() {
      this.$refs.list.deleteBatch();
    },
    del(row) {
      this.$refs.list.delete(row);
    }
  }
};