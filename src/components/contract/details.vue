<template>
    <div>
        <el-dialog
            class="c-dialog-fixed"
            width="600px"
            :visible.sync="show"
            :append-to-body="inDialog"
            @open="openDialog"
            @close="closeDialog"
            :title="title"
        >
            <div v-loading="loading">
                <el-form ref="form" label-width="90px" class="c-form-text">
                    <el-form-item label="合同编号">
                        <span>{{data.contract_no}}</span>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <span>{{data.project_name}}</span>
                    </el-form-item>
                    <el-form-item label="客户名称">
                        <span>{{data.customer_name}}</span>
                    </el-form-item>
                    <el-form-item label="合同款">
                        <span>￥{{data.contract_money}}</span>
                    </el-form-item>
                    <el-form-item label="合同日期">
                        <span>{{data.contract_date}}</span>
                    </el-form-item>
                    <el-form-item label="合同签订公司">
                        <span>{{data.sign_company_name}}</span>
                    </el-form-item>
                    <el-form-item label="业绩归属公司">
                        <span>{{data.sale_company_name}}</span>
                    </el-form-item>
                    <el-form-item label="销售类型">
                        <span>{{data.sale_type_name}}</span>
                    </el-form-item>
                    <el-form-item label="主业务员">
                        <span>{{data.salesman_name}}</span>
                    </el-form-item>
                    <el-form-item label="区域">
                        <span>{{data.area_name}}</span>
                    </el-form-item>
                    <el-form-item label="付款备注">
                        <span>{{data.pay_remarks}}</span>
                    </el-form-item>
                    <el-form-item label="录入员">
                        <span>{{ data.create_user }}</span>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="创建时间">
                                <span>{{ $commonJs.formatDate(data.create_time) }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="更新时间">
                                <span>{{ $commonJs.formatDate(data.update_time) }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template slot="footer">
                <slot name="footer" :data="data"></slot>
            </template>
        </el-dialog>
        <divide-dialog :in-dialog="inDialog" ref="divideDialog" />
    </div>
</template>
<script>
import api from "@/api/test/contract";
import attachList from "@/components/common/attach/textList";
import detailsMixin from "@/mixins/detailDialog";

export default {
    mixins: [detailsMixin],
    components: {
        attachList
    },
    created() {
        this.$options.components.divideDialog = () =>
            import("@/components/test/divide/listDialog");
    },
    data() {
        return {
            data: {
                id: null,
                is_other_pay: false,
                currency: "CNY"
            }
        };
    },
    computed: {
        title() {
            let title =
                "合同记录详情 [ " + (this.data.contract_no || "...") + " ]";
            return title;
        }
    },
    methods: {
        getData(id) {
            this.loading = true;
            this.data.id = id;
            api.getDetails(id).then(res => {
                this.setData(res.data);
                this.loading = false;
            });
            return this;
        },
        openDivideDialog() {
            this.$refs.divideDialog.open().then(that => {
                that.initData({ return_id: this.data.id });
            });
        }
    }
};
</script>