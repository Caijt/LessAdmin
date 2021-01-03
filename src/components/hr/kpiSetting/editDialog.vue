<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    form-label-width="100px"
    confirm-on-close-change
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :confirm-on-save="data.isSubmit"
    :close-on-saved="data.isSubmit"
    confirm-save-text="您确定要发布此绩效考核吗？发布后考核对象的各审批节点人将收到绩效考核处理事项。"
    @edit-opened="onEditOpened"
    @saved="reloadRelated"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-form-item label="考核名称" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="考核类型" prop="type">
        <el-select v-model="data.type">
          <el-option label="月度考核" :value="0"></el-option>
          <el-option label="季度考核" :value="1"></el-option>
          <el-option label="年度考核" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考核年份" prop="year">
        <el-date-picker v-model="data.year" type="year" value-format="yyyy" placeholder="选择年"></el-date-picker>
      </el-form-item>
      <el-form-item label="考核月份" prop="month" v-if="data.type==0">
        <el-select v-model="data.month">
          <el-option
            :label="'第 '+(index+1)+' 月'"
            :value="index+1"
            v-for="(item,index) in 12"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考核季度" prop="quarter" v-if="data.type==1">
        <el-select v-model="data.quarter">
          <el-option label="第 1 季度" :value="1"></el-option>
          <el-option label="第 2 季度" :value="2"></el-option>
          <el-option label="第 3 季度" :value="3"></el-option>
          <el-option label="第 4 季度" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考核部门" prop="targetDepIds">
        <dep-select ref="depSelect" multiple v-model="data.targetDepIds" />
      </el-form-item>
      <el-form-item label="考核职务" prop="targetPostIds">
        <post-select multiple v-model="data.targetPostIds" />
      </el-form-item>
      <el-form-item label="考核流程" required>
        <edit-node-list ref="editNodeList" in-dialog></edit-node-list>
      </el-form-item>
      <el-form-item label="考核明细" required>
        <edit-item-list ref="editItemList" in-dialog></edit-item-list>
      </el-form-item>
    </template>
    <template slot="footer">
      <el-button type="danger" @click="submit">发布</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">关闭</el-button>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import editNodeList from "./node/editList";
import editItemList from "./item/editList";
import api from "@/api/hr/kpiSetting";
import postSelect from "@/components/sys/baseData/post/select";
import depSelect from "@/components/hr/department/treeSelect";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    editNodeList,
    editItemList,
    postSelect,
    depSelect
  },
  data() {
    let nowYear = new Date().getFullYear();
    let validator = (rule, value, callback) => {
      if (
        this.data.targetDepIds.length == 0 &&
        this.data.targetPostIds.length == 0
      ) {
        callback(new Error("考核部门及考核职务不能同时为空"));
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        name: "",
        type: 0,
        year: nowYear.toString(),
        month: null,
        quarter: null,
        target: "",
        kpiSettingNodes: null,
        kpiSettingItems: null,
        isSubmit: false,
        targetDepIds: [],
        targetPostIds: []
      },
      api,
      unit: "绩效考核",
      rules: {
        name: [{ required: true, message: "请填写考核名称" }],
        type: [{ required: true, message: "请选择考核类型" }],
        year: [{ required: true, message: "请选择考核年份" }],
        month: [{ required: true, message: "请选择考核月份" }],
        quarter: [{ required: true, message: "请选择考核季度" }],
        targetDepIds: [{ validator }],
        targetPostIds: [{ validator }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      let nodeData = this.$refs.editNodeList.data;
      if (nodeData.length == 0) {
        this.$message.warning("请添加考核流程");
        return false;
      }
      let itemData = this.$refs.editItemList.data;
      if (itemData.length == 0) {
        this.$message.warning("请添加考核项目明细");
        return false;
      }
      this.data.kpiSettingNodes = nodeData.map(item => {
        return {
          id: item.id,
          kpiSettingId: this.data.id,
          isFixedType: item.isFixedType,
          leaderLevel: item.leaderLevel,
          employeeId: item.employeeId
        };
      });
      this.data.kpiSettingItems = itemData.map(item => {
        return {
          id: item.id,
          kpiSettingId: this.data.id,
          type: item.type,
          description: item.description,
          score: item.score
        };
      });
      if (this.data.type == 0 || this.data.type == 2) {
        this.data.quarter = null;
      }
      if (this.data.type == 1 || this.data.type == 2) {
        this.data.month = null;
      }
      return true;
    },
    onEditOpened() {
      // if (this.data.target) {
      //   this.data.targetArrage = this.data.target
      //     .split(",")
      //     .map(item => parseInt(item));
      // }
      this.reloadRelated();
    },
    //刷新关联表
    reloadRelated() {
      this.$refs.editNodeList.getData({
        kpiSettingId: this.data.id
      });
      this.$refs.editItemList.getData({
        kpiSettingId: this.data.id
      });
    },
    onClosed() {
      this.$refs.editNodeList.clear();
      this.$refs.editItemList.clear();
    },
    save() {
      this.data.isSubmit = false;
      return this.$refs.dialog.save();
    },
    submit() {
      this.data.isSubmit = true;
      return this.$refs.dialog.save();
    },
    openCopy(data) {
      this.open().then(that => {
        this.data = { ...this.data, ...data, id: 0 };
        this.$refs.editNodeList.copy({
          kpiSettingId: data.id
        });
        this.$refs.editItemList.copy({
          kpiSettingId: data.id
        });
      });
    }
  }
};
</script>