<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    show-save-button
    form-label-width="110px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :confirm-on-save="data.isSubmit"
    :close-on-saved="data.isSubmit"
    :get-data-func="api.getEditById"
    @edit-opened="onEditOpened"
    @saved="onSaved"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
    @data-got="onDataGot"
  >
    <template slot="form">
      <el-divider>考勤组信息</el-divider>
      <el-form-item label="考勤组名称" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="考勤类型" prop="type">
        <el-radio-group v-model="data.type" style="line-height:28px">
          <div>
            <el-radio :label="0">固定班制</el-radio>
            <span class="c-tips">* 每天考勤时间一样</span>
          </div>
          <!-- <div>
            <el-radio :label="1" disabled>排班制</el-radio>
            <span class="c-tips">* 自定义设置考勤时间</span>
          </div>
          <div>
            <el-radio :label="2" disabled>自由工时</el-radio>
            <span class="c-tips">* 不设置班次，随时打卡</span>
          </div> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="考勤参与范围" prop="range" class="is-required">
        <el-form-item label="部门" label-width="45px" label-position="top" style="margin-bottom:3px">
          <dep-select ref="depSelect" multiple v-model="data.depIds" />
        </el-form-item>
        <el-form-item label="人员" label-width="45px" style="margin-bottom:3px">
          <employee-select ref="employeeSelect" v-model="data.employeeIds" in-dialog multiple />
        </el-form-item>
        <span class="c-tips">* 部门及员工至少填写一项，每个部门或员工只能参与一个考勤组，取决于最后一次保存设置。</span>
      </el-form-item>
      <el-form-item label="工作日" required>
        <workday-list ref="workdayList" in-dialog>
          <el-checkbox v-model="data.autoRestInHoliday">法定节假日自动休息</el-checkbox>
        </workday-list>
      </el-form-item>
      <el-form-item label="加班计算方式" required>
        <el-select v-model="data.overtimeComputeMode" style="width:100%">
          <el-option label="按审批时长计算" :value="0"></el-option>
          <el-option label="在审批的时段内，按打卡时长计算" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="data.overtimeComputeMode==1">
        <el-form-item label="加班打卡区间" prop="overtimeSignRangeMinute">
          <el-input-number
            controls-position="right"
            v-model="data.overtimeSignRangeMinute"
            :min="0"
            style="width:90px"
          />
          <span class="c-tips">* 加班审批单开始、结束时间前后{{data.overtimeSignRangeMinute}}分钟内的打卡记录计算有效时长</span>
        </el-form-item>
        <el-form-item label="开始加班免打卡区间" prop="overtimeNoSignRangeMinute">
          <el-input-number
            controls-position="right"
            v-model="data.overtimeNoSignRangeMinute"
            :min="0"
            style="width:90px"
          />
          <span
            class="c-tips"
          >* 加班审批单的开始时间在当天下班时间之后的{{data.overtimeNoSignRangeMinute}}分钟之前，且在上班时间之后的话，那加班开始时间可不用打卡</span>
        </el-form-item>
      </template>
      <el-form-item label="加班起算时间" prop="overtimeStartMinute">
        <el-input-number
          controls-position="right"
          v-model="data.overtimeStartMinute"
          :min="0"
          style="width:90px"
        />
        <span class="c-tips">* 下班时间{{data.overtimeStartMinute}}分钟之后，计入加班</span>
      </el-form-item>
      <el-form-item label="加班起算周期" prop="overtimeMinMinute">
        <el-input-number
          controls-position="right"
          v-model="data.overtimeMinMinute"
          :min="0"
          style="width:90px"
        ></el-input-number>
        <span class="c-tips">* 当天加班少于{{data.overtimeMinMinute}}分钟，不计入加班</span>
      </el-form-item>
      <el-form-item label="一天工时" prop="oneDayWorkHour">
        <el-input-number
          v-model="data.oneDayWorkHour"
          :min="0"
          :max="24"
          controls-position="right"
          style="width:90px"
        />
        <span class="c-tips">* 用于统计请假、加班、出差时长，当请假 {{data.oneDayWorkHour}} 小时计一天</span>
      </el-form-item>
      <el-form-item label="考勤地点" required>
        <location-list ref="locationList" in-dialog>
          有效距离：
          <el-select v-model="data.locationDistance" style="width:120px">
            <el-option :label="i*100+'米'" :value="i*100" v-for="i in 30" :key="i"></el-option>
          </el-select>
        </location-list>
      </el-form-item>
      <el-form-item label="特殊日期">
        <special-date-list ref="specialDateList" in-dialog></special-date-list>
        <span class="c-tips">* 指定某些特殊日期必须上班、或者得用其它考勤班次、或者不用上班</span>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import workdayList from "./workday/editList";
import locationList from "./location/editList";
import specialDateList from "./specialDate/editList";
import api from "@/api/hr/attendanceGroup";
import employeeSelect from "@/components/hr/employee/select";
import depSelect from "@/components/hr/department/treeSelect";
export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    workdayList,
    locationList,
    specialDateList,
    employeeSelect,
    depSelect
  },
  data() {
    let validator = (rule, value, callback) => {
      if (this.data.depIds.length == 0 && this.data.employeeIds.length == 0) {
        callback(new Error("考勤参与部门及参与人员不能同时为空"));
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        name: "",
        type: 0,
        locationDistance: 300,
        autoRestInHoliday: true,
        depIds: [],
        attendanceGroupWorkdays: [],
        attendanceGroupSpecialDates: [],
        attendanceGroupLocations: [],
        employeeIds: [],
        overtimeComputeMode: 0,
        overtimeStartMinute: 30,
        overtimeMinMinute: 30,
        oneDayWorkHour: 8,
        overtimeSignRangeMinute: 60,
        overtimeNoSignRangeMinute: 60
      },
      api,
      unit: "考勤组",
      rules: {
        name: [{ required: true, message: "请填写考核名称" }],
        type: [{ required: true, message: "请选择考核类型" }],
        range: [{ validator }, { required: false }],
        overtimeStartMinute: [
          { required: true, message: "请填写加班起算时间" }
        ],
        overtimeMinMinute: [{ required: true, message: "请填写起算周期" }],
        oneDayWorkHour: [{ required: true, message: "请填写一天工作时长" }],
        overtimeSignRangeMinute: [
          { required: true, message: "请填写加班打卡区间范围" }
        ],
        overtimeNoSignRangeMinute: [
          { required: true, message: "请填写开始加班免打卡区间范围" }
        ]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let workdayData = this.$refs.workdayList.checkedRows;
      if (workdayData.length == 0) {
        this.$message.warning("请设置工作日");
        return false;
      }
      if (workdayData.some(item => !item.attendanceShiftId)) {
        this.$message.warning("请完善工作日的考勤班次");
        return false;
      }
      let locationData = this.$refs.locationList.data;
      if (locationData.length == 0) {
        this.$message.warning("请至少设置一个考勤地点");
        return false;
      }
      this.data.attendanceGroupWorkdays = workdayData.map(item => {
        let temp = {
          ...item,
          attendanceGroupId: this.data.id
        };
        delete temp.shiftDescription;
        delete temp.isChecked;
        return temp;
      });
      let specialDateData = this.$refs.specialDateList.data;
      this.data.attendanceGroupSpecialDates = specialDateData.map(item => {
        let temp = {
          ...item,
          attendanceGroupId: this.data.id
        };
        delete temp.id;
        return temp;
      });

      this.data.attendanceGroupLocations = locationData.map(item => {
        let temp = {
          ...item,
          attendanceGroupId: this.data.id
        };
        return temp;
      });
      return true;
    },
    onEditOpened(data) {
      this.$refs.workdayList.setData(data.attendanceGroupWorkdays);
      this.$refs.specialDateList.setData(data.attendanceGroupSpecialDates);
      this.$refs.employeeSelect.getOptions();
    },
    //刷新关联表
    onSaved() {
      this.reload();
    },
    onDataGot(data) {
      this.$refs.locationList.setData(data.attendanceGroupLocations);
    },
    onClosed() {
      this.$refs.workdayList.reset();
      this.$refs.locationList.clear();
      this.$refs.specialDateList.clear();
    },
    save() {
      this.data.isSubmit = false;
      return this.$refs.dialog.save();
    },
    submit() {
      this.data.isSubmit = true;
      return this.$refs.dialog.save();
    }
  }
};
</script>