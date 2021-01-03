<template>
  <common-dialog
    ref="dialog"
    width="800px"
    right
    show-save-button
    save-button-text="提交"
    confirm-on-save
    close-on-saved
    confirm-save-text="你确定要提交此维修记录吗？（提交后无法修改）"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    @create-opened="onCreateOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="维修时间" prop="repairTime">
        <el-date-picker
          type="datetime"
          v-model="data.repairTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择维修时间"
        ></el-date-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="器械编号" prop="apparatusId">
            <el-input
              v-model="data.apparatusNo"
              @keyup.enter.native="search"
              placeholder="输入器械编号，然后回车搜索"
            >
              <el-button slot="append" @click="openApparatusDialog">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="器械名称" v-show="data.apparatusId" class="c-form-text-item">
            <span>{{data.apparatusName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="data.apparatusId">
        <el-col :span="12">
          <el-form-item label="领用人" class="c-form-text-item">
            <span>{{data.useEmployeeName || "无"}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领用部门" class="c-form-text-item">
            <span>{{data.useDepName || "无" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="所处状态"
        prop="statusName"
        v-show="data.apparatusId"
        class="c-form-text-item"
      >
        <span>{{data.apparatusStatusName}}</span>
      </el-form-item>
      <el-form-item label="维修情况" prop="content">
        <el-input type="textarea" v-model="data.content" placeholder="填写维修情况"></el-input>
      </el-form-item>
      <el-form-item label="维修结果" prop="result">
        <el-select v-model="data.result">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="报废" :value="1"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <apparatus-dialog in-dialog ref="apparatusDialog" select @select="setApparatus"></apparatus-dialog>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/qx/repairRecord";
import apparatusApi from "@/api/qx/apparatus";
import apparatusDialog from "@/components/qx/apparatus/listDialog";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, apparatusDialog },
  data() {
    return {
      data: {
        id: 0,
        apparatusId: null,
        apparatusNo: "",
        apparatusName: "",
        apparatusStatusName: "",
        content: "",
        repairTime: "",
        result: 0
      },
      api,
      unit: "维修记录",
      rules: {
        apparatusId: [
          { required: true, message: "请选择维修的器械", trigger: "blur" }
        ],
        repairTime: [{ required: true, message: "请选择领用时间" }],
        result: [{ required: true, message: "请选择维修结果" }]
      }
    };
  },
  methods: {
    onCreateOpened() {
      this.data.repairTime = this.$commonJs.toDatetimeString(new Date());
    },
    openApparatusDialog() {
      this.$refs.apparatusDialog.open().then(that => {
        that.getData();
      });
    },
    search() {
      apparatusApi.getByNo(this.data.apparatusNo).then(res => {
        if (res.data) {
          this.setApparatus(res.data);
        } else {
          this.$message.warning("找不到该编号对应的器械");
        }
      });
    },
    setApparatus(row) {
      this.data.apparatusId = row.id;
      this.data.apparatusName = row.name;
      this.data.apparatusNo = row.no;
      this.data.apparatusStatusName = row.statusName;
      this.data.useEmployeeName = row.useEmployeeName;
      this.data.useDepName = row.useDepName;
    }
  }
};
</script>