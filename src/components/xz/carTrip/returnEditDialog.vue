<template>
  <common-dialog
    ref="dialog"
    width="500px"
    title="司机回车信息"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    confirm-on-save
    close-on-saved
    form-label-width="100px"
    confirm-on-close-change
    confirm-save-text="您确定要回车吗？"
    save-button-text="回车"
    :save-func="api.returnCar"
    @close-saved="$emit('close-saved')"
    @edit-opened="onEditOpened"
  >
    <template slot="form">
      <el-form-item label="回车公里数" prop="mileage">
        <el-input-number v-model="data.mileage" />
      </el-form-item>
      <el-form-item label="回车时间" prop="returnTime">
        <el-date-picker type="datetime" v-model="data.returnTime" value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xz/carTrip";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog
  },
  data() {
    return {
      data: {
        id: 0,
        mileage: 0,
        returnTime: ""
      },
      api,
      unit: "用车申请单",
      rules: {
        mileage: [{ required: true, message: "请填写回车时车辆公里数" }],
        returnTime: [{ required: true, message: "请填写车辆回车时间" }]
      }
    };
  },
  methods: {
    onEditOpened(){
      this.data.returnTime = this.$commonJs.getNowDatetimeString();
    }
  }
};
</script>