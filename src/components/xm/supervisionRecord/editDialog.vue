<template>
  <common-dialog
    ref="dialog"
    width="700px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    confirm-on-close-change
    get-guid-on-create
    :before-close="onBeforeClose"
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>质量监督记录信息</el-divider>
      <el-form-item label="监督时间" prop="supervisionTime">
        <el-date-picker
          v-model="data.supervisionTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目名称" prop="contractId">
        <input-select
          v-model="data.contractId"
          :options="contractOptions"
          @click="openContractDialog"
        />
      </el-form-item>
      <el-form-item label="监督情况" prop="content">
        <el-input v-model="data.content" type="textarea" placeholder></el-input>
      </el-form-item>
      <el-form-item label="监督结果" prop="isQualified">
        <el-radio-group v-model="data.isQualified">
          <el-radio :label="true">合格</el-radio>
          <el-radio :label="false">不合格</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="现场图片">
        <upload-list ref="attachList" multiple card :guid="data.guid" limit-type="image" />
      </el-form-item>
    </template>
    <contract-dialog selectable ref="contractDialog" in-dialog @select="onSelect" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/xm/supervisionRecord";
import uploadList from "@/components/common/attach/uploadList";
import contractDialog from "@/components/yx/contract/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, uploadList, contractDialog },
  data() {
    return {
      data: {
        id: 0,
        guid: "",
        contractId: null,
        supervisionTime: "",
        content: "",
        isQualified: true
      },
      contractOptions: [],
      api,
      unit: "质量监督记录",
      rules: {
        contractId: [{ required: true, message: "请选择项目" }],
        supervisionTime: [{ required: true, message: "请选择质量监督时间" }],
        isQualified: [{ required: true, message: "请选择监督结果" }]
      }
    };
  },
  methods: {
    onCreateOpened() {
      this.data.supervisionTime = this.$commonJs.getNowDatetimeString();
    },
    onEditOpened(data) {
      this.contractOptions = [{
        id:data.contractId,
        name:data.projectName
      }];
      this.$refs.attachList.getData();
    },
    onClosed() {
      this.$refs.attachList.clear();
    },
    onBeforeClose(done) {
      if (this.isEdit) {
        done();
        return;
      }
      if (this.$refs.attachList.count() > 0) {
        this.$message.warning("请删除已上传的照片附件");
        return;
      }
      done();
    },
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