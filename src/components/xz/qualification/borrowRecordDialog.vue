<template>
  <common-dialog
    ref="dialog"
    width="800px"
    form-text
    title="资质借用记录"
    :inDialog="inDialog"
    :data="data"
    :get-data-func="api.getById"
    @details-opened="onDetailsOpened"
    @close-saved="$emit('close-saved')"
  >
    <template slot="form">
      <el-form-item label="资质标题">{{data.title}}</el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="资质类型">{{data.type}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效时间">{{$commonJs.toDateString(data.validTime)}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态" class="no-border">
            <el-tag v-if="data.status==0" type="success">在档</el-tag>
            <el-tag v-else type="danger">外借</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借用人">{{data.borrowEmployeeName || "无"}}</el-form-item>
        </el-col>
      </el-row>
    </template>
    <el-divider>借用明细</el-divider>
    <div style="margin-bottom:5px">
      <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">添加</el-button>
    </div>
    <el-table :data="borrowList">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="借用部门" prop="borrowDepName"></el-table-column>
      <el-table-column label="借用人" prop="borrowEmployeeName"></el-table-column>
      <el-table-column label="借用日期" prop="borrowDate">
        <template slot-scope="{row}">{{row.borrowDate|toDateString}}</template>
      </el-table-column>
      <el-table-column label="归还日期" prop="returnDate">
        <template slot-scope="{row}">{{row.returnDate|toDateString}}</template>
      </el-table-column>
      <el-table-column label="操作" width="60px">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="del(row,$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <borrow-record-edit-dialog in-dialog ref="borrowRecordEditDialog" @close-saved="reload" />
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import detailsDialogMixin from "@/mixins/detailDialog";
import api from "@/api/xz/qualification";
import recordApi from "@/api/xz/qualificationBorrowRecord";
import borrowRecordEditDialog from "./borrowRecordEditDialog";

export default {
  mixins: [detailsDialogMixin],
  components: {
    commonDialog,
    borrowRecordEditDialog
  },
  data() {
    return {
      data: {
        id: 0,
        status: 0,
        title: "",
        type: "",
        validTime: "",
        borrowEmployeeName: ""
      },
      borrowList: [],
      api,
      unit: "资质"
    };
  },
  methods: {
    create() {
      this.$refs.borrowRecordEditDialog.openCreate({
        qualificationId: this.data.id
      });
    },
    edit(row) {
      this.$refs.borrowRecordEditDialog.openEdit(row);
    },
    del(row, index) {
      console.log(index);
      this.$msgbox({
        title: "提示",
        message: "您确定要删除此借用记录吗？",
        showCancelButton: true,
        type: "warning"
      }).then(() => {
        recordApi.deleteById(row.id).then(res => {
          this.reload();
        });
      });
    },
    onDetailsOpened() {
      recordApi.getList({ qualificationId: this.data.id }).then(res => {
        this.borrowList = res.data;
      });
    },
    reload() {
      this.getData(this.data.id);
      this.onDetailsOpened();
    }
  }
};
</script>