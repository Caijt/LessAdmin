<template>
  <common-dialog
    ref="dialog"
    width="600px"
    show-save-button
    form-label-width="100px"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="项目名称" prop="contractId">
        <input-select
          @click="openContractDialog"
          :options="contractOptions"
          v-model="data.contractId"
        />
      </el-form-item>
      <el-form-item label="收款时间" prop="receiveTime">
        <el-date-picker
          v-model="data.receiveTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="收款金额" prop="receiveMoney">
        <el-input v-model="data.receiveMoney" placeholder style="width:150px">
          <span slot="prefix">￥</span>
        </el-input>
      </el-form-item>
      <el-form-item label="款项类别" prop="moneyTypeId">
        <money-type-select v-model="data.moneyTypeId" />
      </el-form-item>
    </template>
    <contract-dialog selectable ref="contractDialog" in-dialog @select="onSelect" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xm/receiveMoney";
import contractDialog from "@/components/yx/contract/listDialog";
import moneyTypeSelect from "@/components/sys/baseData/moneyType/select";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, contractDialog, moneyTypeSelect },
  data() {
    return {
      data: {
        id: 0,
        contractId: null,
        receiveTime: "",
        receiveMoney: 0,
        moneyTypeId: null
      },
      api,
      unit: "收款记录",
      contractOptions: [],
      rules: {
        contractId: [{ required: true, message: "请选择项目" }],
        receiveTime: [{ required: true, message: "请选择收款时间" }],
        receiveMoney: [
          { required: true, message: "请填写收款金额" },
          { validator: this.$commonJs.validateRules.num },
          { validator: this.$commonJs.validateRules.et0 }
        ]
      }
    };
  },
  methods: {
    onCreateOpened() {
      this.data.supervisionTime = this.$commonJs.getNowDatetimeString();
    },
    onEditOpened(data) {
      this.contractOptions = [
        {
          id: data.contractId,
          name: data.projectName
        }
      ];
    },
    onClosed() {},
    openContractDialog() {
      this.$refs.contractDialog.open().then(that => {
        that.getDataOnce();
      });
    },
    onSelect(data) {
      this.data.contractId = data.id;
      this.contractOptions = [
        {
          id: data.id,
          name: data.projectName
        }
      ];
    }
  }
};
</script>