<template>
  <common-dialog
    ref="dialog"
    width="500px"
    close-on-saved
    :title="title"
    show-save-button
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    form-label-width="110px"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="灭害种类" prop="metacilTypeId">
        <metacil-type v-model="data.metacilTypeId" ref="metacilTypeSelect" />
      </el-form-item>
      <el-form-item label="实施内容" prop="implementContent">
        <el-input type="textarea" v-model="data.implementContent" placeholder="填写实施内容" />
      </el-form-item>
      <el-form-item label="预计实施时间">
        <el-row style="width:300px">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                v-model.trim="data.expectDateBegin"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                v-model.trim="data.expectDateEnd"
                placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="实施频率描述" prop="frequencyDescription">
        <el-input type="textarea" v-model="data.frequencyDescription" placeholder="填写实施频率描述" />
      </el-form-item>
      <el-form-item label="预计投入人数" prop="expectPeopleNumber">
        <el-input v-model="data.expectPeopleNumber" />
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import metacilType from "@/components/sys/baseData/metacilType/select";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    metacilType
  },
  data() {
    return {
      data: {
        id: 0,
        contractId: null,
        metacilTypeId: null,
        metacilTypeName: "",
        implementContent: "",
        expectDateBegin: null,
        expectDateEnd: null,
        frequencyDescription: "",
        expectPeopleNumber: null
      },
      unit: "实施明细",
      rules: {
        implementContent: [{ required: true, message: "请填写实施内容" }],
        metacilTypeId: [{ required: true, message: "请选择灭害种类" }],
        expectDateBegin: [
          { required: true, message: "请选择预计开始实施时间" }
        ],
        expectDateEnd: [{ required: true, message: "请选择预计结束实施时间" }],
        expectPeopleNumber: [
          { required: true, message: "请填写预计投入人数" },
          { validator: this.$commonJs.validateRules.num }
        ]
      }
    };
  },
  methods: {
    onBeforeSave() {
      this.data.metacilTypeName = this.$refs.metacilTypeSelect.$refs.commonSelect.$refs.select.selectedLabel;
      this.$emit("saved", { ...this.data });
      this.close();
      return false;
    }
  }
};
</script>