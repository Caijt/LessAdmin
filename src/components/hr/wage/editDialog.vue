<template>
  <common-dialog
    ref="dialog"
    width="1150px"
    right
    show-save-button
    :title="dialogTitle"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :get-data-func="api.getEditById"
    save-button-text="保存"
    :before-save="onBeforeSave"
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @closed="onClosed"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <edit-list ref="editList" />
    </template>
    
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/wage";
import editList from "./editList";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    editList
  },
  data() {
    return {
      data: {
        id: 0,
        type: "",
        date: "",
        wageAccountId: null,
        WageRecordItems: null
      },
      api,
      unit: "工资单",
      rules: {
        name: [{ required: true, message: "请填写账套名称" }],
        accountId: [{ required: true, message: "请选择账套状态" }]
      }
    };
  },
  computed: {
    dialogTitle() {
      return (
        "工资单 [ " +
        this.data.type +
        " - " +
        this.$commonJs.toDateStringByFormat(this.data.date, "YYYY-MM") +
        " ]"
      );
    }
  },
  methods: {
    onCreateOpened(data) {
      this.$refs.dialog.loading();
      api
        .getWageRecordItem({
          date: data.date,
          wageAccountId: data.wageAccountId
        })
        .then(res => {
          this.$refs.editList.setHeader(res.data);
          this.$refs.editList.setData(res.data);
          this.$refs.dialog.loading(false);
        });
    },
    onEditOpened(data) {
      this.$refs.editList.setHeader(data.wageRecordItems);
      this.$refs.editList.setData(data.wageRecordItems);
    },
    onBeforeSave() {
      console.log(this.data.id)
      let data = this.$refs.editList.refList.data.map(item=>{
        return {
          ...item,
          wageRecordId:this.data.id
        }
      });
      this.data.WageRecordItems = data;
      return true;
    },
    onClosed(){
      this.$refs.editList.clear();
    }
  }
};
</script>