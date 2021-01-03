<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <list
      row-key="id"
      ref="list"
      unit="合同"
      :disabled="disabled"
      :show-query="showQuery"
      :show-checkbox="showCheckbox"
      show-index
      :query-params="queryParams"
      :expand-query="expandQuery"
      :show-summary="showSummary"
      :page="page"
      :get-page-list-func="api.getPageList"
      :delete-func="api.deleteById"
    >
      <template slot="toolbar-left">
        <slot name="toolbar-left"></slot>
      </template>
      <template slot="query">
        <div>
          <el-form-item label="客户名称">
            <el-input v-model.trim="queryParams.customerName" clearable placeholder="填写客户名称"></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input v-model.trim="queryParams.customerPhone" clearable placeholder="填写客户电话"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <customer-type v-model="queryParams.customerTypeId" />
          </el-form-item>
          <el-form-item label="合同开始时间" label-width="100px">
            <el-row style="width:330px">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.contractDateBeginBegin"
                    placeholder="开始时间"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.contractDateBeginEnd"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系人">
            <el-input v-model.trim="queryParams.customerContact" clearable placeholder="填写联系人"></el-input>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="queryParams.businessType" clearable placeholder="填写业务类型">
              <el-option label="普通项目" :value="0"></el-option>
              <el-option label="应急项目" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model.trim="queryParams.projectName" clearable placeholder="填写项目名称"></el-input>
          </el-form-item>
          <el-form-item label="合同结束时间" label-width="100px">
            <el-row style="width:330px">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.contractDateEndBegin"
                    placeholder="开始时间"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker
                    v-model.trim="queryParams.contractDateEndEnd"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="服务地址">
            <el-input v-model.trim="queryParams.customerAddress" clearable placeholder="填写服务地址"></el-input>
          </el-form-item>
          <el-form-item label="服务频率">
            <el-radio-group v-model="queryParams.frequency" style="width:140px">
              <el-radio :label="true">单次</el-radio>
              <el-radio :label="false">多次</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合同形式">
            <el-select v-model="queryParams.contractForm" clearable placeholder="选择合同形式">
              <el-option label="口头" :value="0"></el-option>
              <el-option label="书面" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同金额" label-width="100px">
            <el-row style="width:330px">
              <el-col :span="11">
                <el-form-item>
                  <el-input v-model.trim="queryParams.amountBegin" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-input v-model.trim="queryParams.amountEnd" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="状态">
            <el-select v-model="queryParams.status" clearable placeholder="选择状态">
              <el-option label="书面合同未完成" :value="0"></el-option>
              <el-option label="书面合同已完成" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="灭害种类">
            <el-select
              v-model="queryParams.metacilTypeIds"
              multiple
              placeholder="请选择灭害种类（可多选）"
              style="width:610px;"
              class="c-remove-max-width"
              :clearable="true"
            >
              <el-option
                v-for="item in metacilTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </template>
      <template slot="column">
        <el-table-column prop="customerName" label="客户名称" min-width="100" />
        <el-table-column prop="customerTypeName" label="客户类型" width="100" />
        <el-table-column prop="customerContact" label="联系人" width="150" />
        <el-table-column prop="customerPhone" label="电话" width="150" />
        <el-table-column prop="customerAddress" label="服务地址" width="150" />
        <el-table-column prop="businessType" label="业务类型" width="150">
          <template slot-scope="{row}">
            <el-col v-if="row.businessType==0">普通项目</el-col>
            <el-col v-else>应急项目</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="metacilTypeNames" label="灭害种类" width="200" show-overflow-tooltip />
        <el-table-column prop="projectName" label="项目名称" s width="150" />
        <el-table-column prop="frequency" label="服务频率" width="80">
          <template slot-scope="{row}">
            <el-col v-if="row.frequency">单次</el-col>
            <el-col v-else>多次</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="合同金额" width="100" />
        <el-table-column prop="contractDateBegin" label="合同开始时间" sortable="custom" width="150">
          <template slot-scope="{ row }">
            <span>{{ row.contractDateBegin | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractDateEnd" label="合同结束时间" width="150">
          <template slot-scope="{ row }">
            <span>{{ row.contractDateEnd | toDateString }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractForm" label="合同形式" width="100">
          <template slot-scope="{row}">
            <el-col v-if="row.contractForm==0">口头</el-col>
            <el-col v-else>书面</el-col>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150" align="center">
          <template slot-scope="{row}">
            <el-col v-if="row.status==null">-</el-col>
            <el-col v-else-if="row.status==0">书面合同未完成</el-col>
            <el-col v-else>书面合同已完成</el-col>
          </template>
        </el-table-column>
        <!-- slot[column] -->
        <slot name="table"></slot>
        <slot name="column"></slot>
        <!--/ slot[column]-->
      </template>
    </list>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import list from "@/components/common/list";
import api from "@/api/yx/contract";
import metacilTypeApi from "@/api/sys/baseData";

import customerType from "@/components/sys/baseData/customerType/select";

export default {
  mixins: [listMixin],
  components: {
    list,
    customerType
  },
  props: {},
  data() {
    return {
      //查询条件字段
      queryParams: {
        customerName: "",
        customerPhone: "",
        customerAddress: "",
        customerContact: "",
        customerTypeId: null,
        metacilTypeIds: [],
        metacilTypeNames: "",
        businessType: null,
        projectName: "",
        frequency: null,
        amountBegin: null,
        amountEnd: null,
        contractDateBeginBegin: null,
        contractDateBeginEnd: null,
        contractDateEndBegin: null,
        contractDateEndEnd: null,
        contractForm: null,
        status: null
      },
      metacilTypes: [],
      api
    };
  },
  created() {
    metacilTypeApi.getMetacilTypeList().then(res => {
      this.metacilTypes = res.data;
    });
  },
  methods: {}
};
</script>