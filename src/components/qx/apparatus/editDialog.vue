<template>
  <common-dialog
    ref="dialog"
    width="500px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @create-opened="onCreateOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="器械类型" prop="type">
        <el-input v-model="data.type" placeholder="填写器械类型"></el-input>
      </el-form-item>
      <el-form-item label="器械名称" prop="name">
        <el-input v-model="data.name" placeholder="填写器械名称"></el-input>
      </el-form-item>
      <el-form-item label="器械编号" prop="no">
        <el-input v-model="data.no" placeholder="填写器械唯一编号"></el-input>
      </el-form-item>
      <el-form-item label="购入时间" prop="buyTime">
        <el-date-picker
          type="datetime"
          v-model="data.buyTime"
          placeholder="选择器械购入时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import roleSelect from "@/components/sys/role/common/select";
export default {
  mixins: [editDialogMixin],
  components: { commonDialog, roleSelect },
  data() {
    let validator = (rule, value, callback) => {
      if (value) {
        this.api.checkExistByNo(value, this.data.id).then(res => {
          if (res.data) {
            callback(new Error("器械编号已重复"));
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        type: "",
        name: "",
        no: "",
        buyTime: ""
      },
      api: require("@/api/qx/apparatus").default,
      unit: "器械档案",
      rules: {
        type: [{ required: true, message: "请填写器械类型" }],
        name: [{ required: true, message: "请填写器械名称" }],
        no: [
          { required: true, message: "请填写器械编号" },
          { validator: validator, trigger: "blur" }
        ],
        buyTime: [{ required: true, message: "请选择购入时间" }]
      }
    };
  },
  computed: {},
  mounted() {},
  methods:{
    onCreateOpened(){
      this.data.buyTime = this.$commonJs.toDatetimeString(new Date());
    }
  }
};
</script>