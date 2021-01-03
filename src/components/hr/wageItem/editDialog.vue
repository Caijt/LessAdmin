<template>
  <common-dialog
    ref="dialog"
    width="700px"
    show-save-button
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="api.save"
    :get-data-func="api.getEditById"
    @saved="reload"
    @data-got="onDataGot"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="工资项目" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="工资类型" prop="wageTypeId">
        <wage-type-select v-model="data.wageTypeId"/>
      </el-form-item>
      <el-form-item label="排序值" prop="order">
        <el-input-number v-model="data.order" />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-select v-model="data.dataSource" :disabled="isEdit">
          <el-option label="手工录入" value="MANUAL"></el-option>
          <el-option label="固定值" value="FIXED"></el-option>
          <el-option label="公式计算" value="COMPUTE"></el-option>
        </el-select>
        <span class="c-tips">* 创建后无法修改</span>
      </el-form-item>
      <template v-if="data.dataSource=='FIXED'">
        <el-form-item label="固定数值" prop="value">
          <el-input-number v-model="data.value" />
        </el-form-item>
        <el-form-item label="条件匹配">
          <fixed-setting-list ref="fixedSettingList" in-dialog></fixed-setting-list>
        </el-form-item>
      </template>
      <template v-if="data.dataSource=='COMPUTE'">
        <el-form-item label="公式类型" prop="computeFormualType">
          <el-radio-group v-model="data.computeFormualType" :disabled="isEdit">
            <el-radio label="LEAVE">请假类</el-radio>
            <el-radio label="OVERTIME">加班类</el-radio>
            <el-radio label="KPI">绩效考核类</el-radio>
          </el-radio-group>
          <span class="c-tips">* 创建后无法修改</span>
        </el-form-item>
        <el-form-item
          label="基准项目"
          prop="baseWageItemId"
          v-if="data.computeFormualType=='LEAVE'||data.computeFormualType=='KPI'"
        >
          <wage-select v-model="data.baseWageItemId"></wage-select>
        </el-form-item>
        <el-form-item label="基数" prop="value" v-if="data.computeFormualType=='LEAVE'||data.computeFormualType=='OVERTIME'">
          <el-input-number v-model="data.value" />
        </el-form-item>
        <el-form-item label="请假项目" class="is-required" v-if="data.computeFormualType=='LEAVE'">
          <leave-setting-list ref="leaveSettingList" in-dialog></leave-setting-list>
        </el-form-item>
        <el-form-item label="匹配条件" required v-if="data.computeFormualType=='KPI'">
          <kpi-setting-list ref="kpiSettingList" in-dialog></kpi-setting-list>
        </el-form-item>
        <template v-if="data.computeFormualType=='OVERTIME'">
          <el-divider>加班系数</el-divider>
          <el-form-item label="工作日" prop="wageItemComputeOvertimeSetting.workdayCoefficient">
            <el-input-number v-model="data.wageItemComputeOvertimeSetting.workdayCoefficient"></el-input-number>
          </el-form-item>
          <el-form-item label="周末" prop="wageItemComputeOvertimeSetting.weekendCoefficient">
            <el-input-number v-model="data.wageItemComputeOvertimeSetting.weekendCoefficient"></el-input-number>
          </el-form-item>
          <el-form-item label="节假日" prop="wageItemComputeOvertimeSetting.holidayCoefficient">
            <el-input-number v-model="data.wageItemComputeOvertimeSetting.holidayCoefficient"></el-input-number>
          </el-form-item>
          <el-form-item>
            <span class="c-tips">* 计算公式：加班工资基数 * ( 工作日加班 * 系数 + 周末加班 * 系数 + 节假日加班 * 系数 )</span>
          </el-form-item>
        </template>
      </template>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import api from "@/api/hr/wageItem";
import fixedSettingList from "./fixedSetting/editList";
import leaveSettingList from "./leaveSetting/editList";
import kpiSettingList from "./kpiSetting/editList";
import wageSelect from "./select";
import wageTypeSelect from "@/components/sys/baseData/wageType/select";

export default {
  mixins: [editDialogMixin],
  components: {
    fixedSettingList,
    leaveSettingList,
    kpiSettingList,
    wageSelect,
    commonDialog,
    wageTypeSelect
  },
  data() {
    return {
      data: {
        id: 0,
        name: "",
        wageTypeId:null,
        dataSource: "",
        order: 99,
        value: 0,
        baseWageItemId: null,
        computeFormualType: "",
        wageItemFixedSettings: null,
        wageItemComputeLeaveSettings: null,
        wageItemComputeKpiSettings: null,
        wageItemComputeOvertimeSetting: {
          workdayCoefficient: 0,
          weekendCoefficient: 0,
          holidayCoefficient: 0
        }
      },
      api,
      unit: "工资项目",
      rules: {
        name: [{ required: true, message: "请填写工资项目名称" }],
        wageTypeId: [{ required: true, message: "请选择工资类型" }],
        dataSource: [{ required: true, message: "请选择数据来源" }],
        computeFormualType: [{ required: true, message: "请选择公式类型" }],
        baseWageItemId: [
          { required: true, message: "请选择基准工资项目" },
          {
            validator: (rules, value, callback) => {
              if (value == this.data.id) {
                callback(new Error("基准工资项目不能与当前项目一样"));
              } else {
                callback();
              }
            }
          }
        ],
        value: [{ required: true, message: "请填写数值" }],
        order: [{ required: true, message: "请填写排序值" }],
        "wageItemComputeOvertimeSetting.workdayCoefficient": [
          { required: true, message: "请填写工作日加班系数" }
        ],
        "wageItemComputeOvertimeSetting.weekendCoefficient": [
          { required: true, message: "请填写周末加班系数" }
        ],
        "wageItemComputeOvertimeSetting.holidayCoefficient": [
          { required: true, message: "请填写节假日加班系数" }
        ]
      }
    };
  },
  methods: {
    onDataGot(data) {
      if (this.data.dataSource == "FIXED") {
        this.$refs.fixedSettingList.setData(data.wageItemFixedSettings);
      }
      if (this.data.dataSource == "COMPUTE") {
        if (this.data.computeFormualType == "LEAVE") {
          this.$refs.leaveSettingList.setData(
            data.wageItemComputeLeaveSettings
          );
        } else if (this.data.computeFormualType == "KPI") {
          this.$refs.kpiSettingList.setData(data.wageItemComputeKpiSettings);
        }
      }
    },
    onBeforeSave() {
      if (
        this.data.dataSource != "COMPUTE" ||
        this.data.computeFormualType != "OVERTIME"
      ) {
        this.data.wageItemComputeOvertimeSetting = null;
      }
      if (this.data.dataSource == "FIXED") {
        this.data.wageItemFixedSettings = this.$refs.fixedSettingList.refList.data.map(
          item => {
            return {
              employeeId: item.employeeId,
              value: item.value,
              wageItemId: this.data.id
            };
          }
        );
      }
      if (this.data.dataSource == "COMPUTE") {
        if (this.data.computeFormualType == "LEAVE") {
          let data = this.$refs.leaveSettingList.refList.data.map(item => {
            return {
              computeItem: item.computeItem,
              coefficient: item.coefficient,
              wageItemId: this.data.id
            };
          });
          if (data.length == 0) {
            this.$message.warning("请添加请假计算项目");
            return false;
          }
          for (let item of data) {
            for (let item2 of data) {
              if (item == item2) {
                continue;
              }
              if (
                item.computeItem ==item2.computeItem
              ) {
                this.$message.warning("请假项目中有重复的计算项目，请删除重复项");
                return false;
              }
            }
          }
          this.data.wageItemComputeLeaveSettings = data;
        }
        if (this.data.computeFormualType == "KPI") {
          let data = this.$refs.kpiSettingList.refList.data.map(item => {
            return {
              scoreBegin: item.scoreBegin,
              scoreEnd: item.scoreEnd,
              baseValue: item.baseValue,
              coefficient: item.coefficient,
              wageItemId: this.data.id
            };
          });
          if (data.length == 0) {
            this.$message.warning("请添加匹配条件");
            return false;
          }
          if (data.some(item => item.scoreBegin > item.scoreEnd)) {
            this.$message.warning("匹配条件中下限分数必须小于上限分数");
            return false;
          }
          for (let item of data) {
            for (let item2 of data) {
              if (item == item2) {
                continue;
              }
              if (
                item.scoreBegin < item2.scoreEnd &&
                item.scoreEnd > item2.scoreBegin
              ) {
                this.$message.warning("匹配条件中有重叠的分数区间，请检查");
                return false;
              }
            }
          }
          this.data.wageItemComputeKpiSettings = data;
        }
      }
    }
  }
};
</script>