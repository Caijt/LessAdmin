<template>
  <div>
    <el-dialog
      :title="title"
      class="c-dialog-fixed c-right-fixed"
      :visible.sync="show"
      :append-to-body="inDialog"
      @open="openDialog"
      @close="closeDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="600px"
      :before-close="beforeClose"
    >
      <div v-loading="loading">
        <divider>合同期初信息</divider>
        <el-form :model="data" :rules="rules" ref="form" label-width="120px" status-icon>
          <el-form-item label="期初应收款" prop="begin_receive_money">
            <el-input v-model="data.begin_receive_money" style="width: 150px">
              <span slot="prefix">￥</span>
            </el-input>
            <span class="c-tips">* 截止到2019年6月30日该合同项目的应收款</span>
          </el-form-item>
          <el-form-item label="验收金" prop="check_money">
            <el-input v-model="data.check_money" style="width: 150px">
              <span slot="prefix">￥</span>
            </el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="form.name" placeholder="填写用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="form.loginName" placeholder="填写用户登录名"></el-input>
          </el-form-item>
          <el-form-item label="修改密码" prop="change_pwd"  v-if="isEdit">
            <el-switch v-model="form.changePassword" />
          </el-form-item>
          <el-form-item label="登录密码" prop="loginPassword" v-if="!isEdit||form.changePassword">
            <el-input v-model="form.loginPassword" type="password" placeholder="用户登录密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="save(0)" :loading="loading">保存</el-button>
        <el-button @click="close">关 闭</el-button>
      </div>
    </el-dialog>
    <wj-contract ref="wjContractDialog">
      <template slot="column">
        <el-table-column fixed="right" align="center" width="60" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="pull(row)">提取</el-button>
          </template>
        </el-table-column>
      </template>
    </wj-contract>
  </div>
</template>
<script>
import api from "@/api/test/contract";
import attach from "@/components/common/attach/attachFile";
import wjContract from "@/components/wjContractSys/contract/listDialog";
import editDialogMixin from "@/mixins/editDialog";

export default {
  mixins: [editDialogMixin],
  components: {
    attach,
    wjContract
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validator = (rule, value, callback) => {
      if (value) {
        api.checkNoUnique(value, this.data.id).then(res => {
          if (res.data) {
            callback();
          } else {
            callback(new Error("此合同已在系统中录入过！"));
          }
        });
      } else {
        callback();
      }
    };
    return {
      data: {
        id: 0,
        guid: "",
        begin_receive_money: 0,
        remarks: "",
        check_date: "",
        check_money: 0,
        promise_money: 0,
        expire_date: ""
      },
      rules: {
        begin_receive_money: [
          { validator: this.$commonJs.validateRules.num },
          { required: true, message: "请填写期初应收款" }
        ],
        check_money: [{ validator: this.$commonJs.validateRules.num }],
        promise_money: [{ validator: this.$commonJs.validateRules.num }]
      }
    };
  },
  computed: {
    title() {
      let title = "合同期初信息";
      return title;
    },
    attachUploadUrl() {
      return api.attachUploadUrl;
    },
    attachDeleteUrl() {
      return api.attachDeleteUrl;
    }
  },
  mounted() {},
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        this.loading = true;
        api
          .save(this.data)
          .then(res => {
            this.data.id = res.data;
            this.loading = false;
            this.$message.success("保存成功");
            this.updated = true;
          })
          .catch(res => {
            this.loading = false;
            console.log(res);
          });
      });
    },
    openWjContractDialog() {
      this.$refs.wjContractDialog.open().then(that => {
        that.getDataOnce({});
      });
    },
    pull(row) {
      let data = {
        //合同字段
        contract_id: row.serial_num,
        contract_no: row.contract_num,

        contract_money: row.contract_amount,
        contract_date: row.contract_date,

        payment: row.contract_remark,

        area_name: row.area_name,
        area_id: row.area_id,

        project_name: row.project_name,

        salesman_name: row.salesman_name,
        salesman_id: row.salesman_id,

        sale_type_name: row.type_name, //销售类别
        sale_type_id: row.contract_typeid,

        sale_company_name: row.company_name,
        sale_company_id: row.company_id,

        sign_company_name: row.sign_company_name,
        sign_company_id: row.sign_companyid,

        customer_name: row.customer_name,
        customer_id: row.customer_id,

        factory: row.processing_factory
      };
      this.assign(data);
      this.$refs.wjContractDialog.close();
    }
  }
};
</script>