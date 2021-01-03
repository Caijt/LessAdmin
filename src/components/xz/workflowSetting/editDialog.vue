<template>
  <common-dialog
    ref="dialog"
    width="700px"
    right
    form-label-width="110px"
    show-save-button
    confirm-on-close-change
    :before-save="onBeforeSave"
    :title="title"
    :inDialog="inDialog"
    :data="data"
    :form-rules="rules"
    :save-func="api.save"
    :init-base-data-func="initBaseData"
    @edit-opened="onEditOpened"
    @saved="reloadRelated"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <template slot="form">
      <el-divider>流程信息</el-divider>
      <el-form-item label="流程名称" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="禁用" prop="isDisabled">
        <el-switch v-model="data.isDisabled" />
        <span class="c-tips">* 流程一但被使用了，就不能被删除了，可以禁用流程使其不参与匹配</span>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input-number v-model="data.priority" />
        <span class="c-tips">* 值越小，越先进行匹配，只会执行最先匹配成功的流程</span>
      </el-form-item>
      <el-form-item label="匹配条件类型" prop="conditionType">
        <el-radio-group v-model="data.conditionType">
          <el-radio :label="0">无条件</el-radio>
          <el-radio :label="1">匹配发起人职务</el-radio>
          <el-radio :label="2">匹配发起人部门</el-radio>
          <el-radio :label="3">匹配发起人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="发起人职务"
        prop="postId"
        :rules="[{required:data.conditionType==1,message:'请选择匹配发起人的职务'}]"
        v-show="data.conditionType==1"
      >
        <post-select v-model="data.postId" />
      </el-form-item>
      <el-form-item
        label="发起人部门"
        prop="depId"
        :rules="[{required:data.conditionType==2,message:'请选择匹配发起人的部门'}]"
        v-show="data.conditionType==2"
      >
        <dep-select ref="depSelect" v-model="data.depId" />
      </el-form-item>
      <el-form-item
        label="指定发起人"
        prop="employeeId"
        :rules="[{required:data.conditionType==3,message:'请选择匹配的发起人'}]"
        v-show="data.conditionType==3"
      >
        <employee-select in-dialog v-model="data.employeeId" ref="employeeSelect" />
      </el-form-item>
      <el-form-item label="流程节点" required>
        <edit-node-list ref="editNodeList" in-dialog></edit-node-list>
      </el-form-item>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import editNodeList from "./node/editList";
import api from "@/api/xz/workflowSetting";
import postSelect from "@/components/sys/baseData/post/select";
import employeeSelect from "@/components/hr/employee/select";
import depSelect from "@/components/hr/department/treeSelect";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    editNodeList,
    postSelect,
    employeeSelect,
    depSelect
  },
  data() {
    let t = this;
    return {
      data: {
        id: 0,
        workflowTypeId: null,
        name: "",
        isDisabled:false,
        priority: 99,
        conditionType: 0,
        postId: null,
        employeeId: null,
        depId: null
      },
      api,
      unit: "流程",
      rules: {
        name: [{ required: true, message: "请填写流程分支名称" }],
        priority: [{ required: true, message: "请填写分支优先级别值" }],
        conditionType: [{ required: true, message: "请选择分支条件匹配类型" }]
      }
    };
  },
  methods: {
    onBeforeSave() {
      console.log(this.data.postId);
      let nodeData = this.$refs.editNodeList.data;
      if (nodeData.length == 0) {
        this.$message.warning("请添加流程分支节点");
        return false;
      }
      this.data.workflowNodes = nodeData.map(item => {
        return {
          id: item.id,
          workflowId: this.data.id,
          nodePickType: item.nodePickType,
          leaderLevel: item.leaderLevel,
          employeeId: item.employeeId
        };
      });
      if (this.data.conditionType == 0) {
        this.data.employeeId = null;
        this.data.depId = null;
        this.data.postId = null;
      } else if (this.data.conditionType == 1) {
        this.data.employeeId = null;
        this.data.depId = null;
      } else if (this.data.conditionType == 2) {
        this.data.postId = null;
        this.data.employeeId = null;
      } else if (this.data.conditionType == 3) {
        this.data.postId = null;
        this.data.depId = null;
      }
      return true;
    },
    onEditOpened(data) {
      if (data.employeeId) {
        let emp = {
          id: data.employeeId,
          name: data.employeeName
        };
        this.$refs.employeeSelect.setOptions([emp]);
      }
      this.reloadRelated();
    },
    //刷新关联表
    reloadRelated() {
      this.$refs.editNodeList.getData({
        workflowId: this.data.id
      });
    },
    onClosed() {
      this.$refs.editNodeList.clear();
    },
    initBaseData() {
      return this.$refs.depSelect.getData();
    }
  }
};
</script>