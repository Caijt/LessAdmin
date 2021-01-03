<template>
  <common-dialog
    ref="dialog"
    width="700px"
    close-on-saved
    confirm-on-close-change
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :before-save="onBeforeSave"
    :save-func="()=>{}"
    @create-opened="onCreateOpened"
    @edit-opened="onEditOpened"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="实施时间" required style="margin-bottom:0px">
        <el-col :span="11">
          <el-form-item prop="implementBeginTime">
            <el-date-picker
              style="width:100%"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="data.implementBeginTime"
              placeholder="实施开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align:center">-</el-col>
        <el-col :span="11">
          <el-form-item prop="implementEndTime">
            <el-date-picker
              style="width:100%"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="data.implementEndTime"
              placeholder="实施结束时间"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="任务描述" prop="description">
        <el-input type="textarea" v-model="data.description"></el-input>
      </el-form-item>
      <el-form-item label="考勤位置">
        <qq-map ref="map" />
      </el-form-item>
      <el-form-item label="考勤距离">
        <el-select v-model="data.locationDistance">
          <el-option :label="i*100+'米'" :value="i*100" v-for="i in 30" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分派班组" required>
        <team-list in-dialog ref="teamList" style="margin-bottom:5px" />
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="close">关 闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import teamList from "./team/editList";
import qqMap from "@/components/common/maps/qq/map";

export default {
  mixins: [editDialogMixin],
  components: { commonDialog, teamList, qqMap },
  data() {
    return {
      edit: false,
      data: {
        id: 0,
        implementBeginTime: "",
        implementEndTime: "",
        description: "",
        taskTeams: null,
        lat: 0,
        lng: 0,
        address: "",
        locationDistance: 500
      },
      unit: "任务分派明细",
      rules: {
        implementBeginTime: [{ required: true, message: "请选择实施开始时间" }],
        implementEndTime: [{ required: true, message: "请选择实施结束时间" }]
      }
    };
  },
  computed: {
    isEdit() {
      return this.edit;
    }
  },
  methods: {
    onBeforeSave() {
      let teamData = this.$refs.teamList.data;
      if (teamData.length == 0) {
        this.$message.warning("请分派实施的班组");
        return false;
      }
      if (teamData.every(item => !item.isLead)) {
        this.$message.warning("请指定负责的班组");
        return false;
      }
      this.data.taskTeams = teamData.map(item => {
        item.taskId = this.data.id;
        return item;
      });
      this.data.address = this.$refs.map.getAddress();
      let location = this.$refs.map.getLocation();
      this.data.lat = location.lat;
      this.data.lng = location.lng;
      this.$emit("saved", { ...this.data });
      this.close(true);
      return false;
    },
    onCreateOpened(address) {
      if (address) {
        this.$refs.map.search(address);
      } else {
        this.$refs.map.goLocalCity();
      }
    },
    onEditOpened(data) {
      this.edit = true;
      this.$refs.map.setLocation({ lat: data.lat, lng: data.lng });
      this.$refs.teamList.setData(data.taskTeams.map(item => ({ ...item })));
    },
    onClosed() {
      this.edit = false;
      this.$refs.teamList.clear();
    }
  }
};
</script>