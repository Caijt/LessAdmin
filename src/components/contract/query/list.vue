<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
    <div>
        <list
            row-key="id"
            ref="list"
            :hide-query="hideQuery"
            :show-checkbox="showCheckbox"
            :query-params="queryParams"
            :show-query="showQuery"
            show-summary
            :no-page="noPage"
            @get-data="onGetData"
        >
            <div slot="query">
                <el-form-item label="合同编号">
                    <el-input v-model.trim="queryParams.contractNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="工程项目">
                    <el-input v-model.trim="queryParams.projectName" clearable></el-input>
                </el-form-item>

                <el-form-item label="客户名称">
                    <el-input v-model.trim="queryParams.customerName" clearable></el-input>
                </el-form-item>
                <br />
                <el-form-item label="签订公司">
                    <el-input v-model.trim="queryParams.signCompanyName" clearable></el-input>
                </el-form-item>
                <el-form-item label="业绩公司">
                    <el-input v-model.trim="queryParams.saleCompanyName" clearable></el-input>
                </el-form-item>
                <br />
                <el-form-item label="合同日期">
                    <el-row style="width:300px">
                        <el-col :span="11">
                            <el-form-item>
                                <el-date-picker
                                    v-model.trim="queryParams.contractDateBegin"
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
                                    v-model.trim="queryParams.contractDateEnd"
                                    placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="合同款">
                    <el-row style="width:300px">
                        <el-col :span="11">
                            <el-form-item>
                                <el-input
                                    v-model.trim="queryParams.contractMoneyBegin"
                                    placeholder="最小值"
                                    clearable
                                >
                                    <span slot="prefix">￥</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">至</el-col>
                        <el-col :span="11">
                            <el-form-item>
                                <el-input
                                    v-model.trim="queryParams.contractMoneyEnd"
                                    placeholder="最小值"
                                    clearable
                                >
                                    <span slot="prefix">￥</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
            </div>
            <template slot="column">
                <el-table-column
                    prop="contract_no"
                    label="合同编号"
                    sortable="custom"
                    width="150"
                    show-overflow-tooltip
                >
                    <template slot-scope="{row}">
                        <span
                            class="c-link"
                            @click="openContractDetails(row.id)"
                        >{{row.contract_no}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="project_name"
                    width="150"
                    label="工程项目"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="customer_name"
                    width="150"
                    label="客户名称"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="contract_money"
                    label="合同款"
                    sortable="custom"
                    width="110"
                    align="right"
                >
                    <template slot-scope="{row}">
                        <span>￥{{ row.contract_money }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="contract_date" label="合同日期" sortable="custom" width="100">
                    <template slot-scope="{row}">{{row.contract_date | formatToDate}}</template>
                </el-table-column>
                <el-table-column
                    prop="sign_company_name"
                    label="合同签订公司"
                    width="100"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="sale_company_name"
                    width="100"
                    label="业绩所属公司"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="salesman_name"
                    label="主业务员"
                    width="100"
                    show-overflow-tooltip
                />
                <el-table-column prop="area_name" label="区域" width="100" show-overflow-tooltip />
                <el-table-column
                    prop="begin_receive_money"
                    label="期初应收款"
                    sortable="custom"
                    width="120"
                    align="right"
                >
                    <template slot-scope="{row}">
                        <span>￥{{ row.begin_receive_money }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="transfer_money"
                    sortable="custom"
                    label="已调拨金额"
                    width="120"
                    align="right"
                    show-overflow-tooltip
                >
                    <template slot-scope="{row}">
                        <span
                            class="c-link"
                            @click="openDeliveryDialog(row.id)"
                        >￥{{ row.transfer_money }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="invoice_money"
                    sortable="custom"
                    label="开票金额"
                    align="right"
                    width="120"
                    show-overflow-tooltip
                >
                    <template slot-scope="{row}">
                        <span
                            class="c-link"
                            @click="openInvoiceDialog(row.id)"
                        >￥{{ row.invoice_money }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="divide_money"
                    sortable="custom"
                    label="回款金额"
                    align="right"
                    width="110"
                    show-overflow-tooltip
                >
                    <template slot-scope="{row}">
                        <span
                            class="c-link"
                            @click="openDivideDialog(row.id)"
                        >￥{{ row.divide_money }}</span>
                    </template>
                </el-table-column>
                <!-- slot[column] -->
                <slot name="column"></slot>
                <!--/ slot[column]-->
            </template>
        </list>
        <transfer-record-dialog :in-dialog="inDialog" ref="deliveryDialog" />
        <invoice-dialog :in-dialog="inDialog" ref="invoiceDialog" />
        <writeoff-dialog :in-dialog="inDialog" ref="writeoffDialog" />
    </div>
</template>
<script>
import list from "@/components/common/list";
import api from "@/api/test/contractQuery";
import transferRecordDialog from "@/components/test/transferRecord/listDialog";
import invoiceDialog from "@/components/test/invoice/listDialog";
import writeoffDialog from "@/components/test/divide/listDialog";
import contractDetails from "@/components/test/contract/details";
import listMixin from "@/mixins/list";
export default {
    mixins: [listMixin],
    components: {
        list,
        invoiceDialog,
        writeoffDialog,
        transferRecordDialog,
        contractDetails
    },
    data() {
        return {
            queryParams: {
                contractNo: "",
                projectName: "",
                customerName: "",
                signCompanyName: "",
                saleCompanyName: "",
                contractDateBegin: "",
                contractDateEnd: "",
                contractMoneyBegin: "",
                contractMoneyEnd: ""
            }
        };
    },
    methods: {
        onGetData(params, done) {
            api.getPageListWithSummary(params).then(res => {
                done(res.data);
            });
        },
        openContractDetails(id) {
            this.$refs.contractDetails.open().then(that => {
                that.getData(id);
            });
        },
        openDeliveryDialog(contractId) {
            this.$refs.deliveryDialog.open().then(that => {
                that.getData({ contract_id: contractId });
            });
        },
        openInvoiceDialog(contractId) {
            this.$refs.invoiceDialog.open().then(that => {
                that.getData({ contract_id: contractId });
            });
        },
        openDivideDialog(contractId) {
            this.$refs.writeoffDialog.open().then(that => {
                that.getData({ contract_id: contractId, status: 1 });
            });
        }
    }
};
</script>