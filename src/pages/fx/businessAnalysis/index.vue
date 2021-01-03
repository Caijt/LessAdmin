<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="handleClick">
      <el-tab-pane label="客户数据分析" name="customerAnalysis">
        <customer-analysis-list ref="customerAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openCustomerPrintDialog">打印</el-button>
            <el-button type="primary" @click="openCustomerChartDialog">图表展示</el-button>
          </template>
        </customer-analysis-list>
      </el-tab-pane>
      <el-tab-pane label="合同数据分析" name="contractAnalysis">
        <contract-analysis-list ref="contractAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openContractPrintDialog">打印</el-button>
            <el-button type="primary" @click="openContractChartDialog">图表展示</el-button>
          </template>
        </contract-analysis-list>
      </el-tab-pane>
      <el-tab-pane label="商机数据分析" name="businessAnalysis">
        <business-analysis-list ref="businessAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openBusinessPrintDialog">打印</el-button>
            <el-button type="primary" @click="openBusinessChartDialog" >图表展示</el-button>
          </template>
        </business-analysis-list>
      </el-tab-pane>
    </el-tabs>
    <customer-chart-dialog ref="customerChartDialog" />
    <contract-chart-dialog ref="contractChartDialog" />
    <business-chart-dialog ref="businessChartDialog" />

    <customer-print-dialog ref="customerPrintDialog" />
    <contract-print-dialog ref="contractPrintDialog" />
    <business-print-dialog ref="businessPrintDialog" />
  </div>
</template>
<script>
import customerAnalysisList from "@/components/fx/businessAnalysis/customerAnalysis/list";
import contractAnalysisList from "@/components/fx/businessAnalysis/contractAnalysis/list";
import businessAnalysisList from "@/components/fx/businessAnalysis/businessAnalysis/list";

import customerChartDialog from "@/components/fx/businessAnalysis/customerAnalysis/chartDialog";
import contractChartDialog from "@/components/fx/businessAnalysis/contractAnalysis/chartDialog";
import businessChartDialog from "@/components/fx/businessAnalysis/businessAnalysis/chartDialog";

import customerPrintDialog from "@/components/fx/businessAnalysis/customerAnalysis/printDialog";
import contractPrintDialog from "@/components/fx/businessAnalysis/contractAnalysis/printDialog";
import businessPrintDialog from "@/components/fx/businessAnalysis/businessAnalysis/printDialog";

export default {
  components: {
    customerAnalysisList,
    contractAnalysisList,
    businessAnalysisList,

    customerChartDialog,
    contractChartDialog,
    businessChartDialog,

    customerPrintDialog,
    contractPrintDialog,
    businessPrintDialog
  },
  data() {
    return {
      tabName: "customerAnalysis"
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    handleClick() {
      this.reload();
    },
    reload() {
      this.$refs[this.tabName + "List"].reload();
      this.$nextTick(() => {
        this.$refs[this.tabName + "List"].$refs.list.$refs.table.doLayout();
      });
    },
    _toChartData(types,data,nameKey,valueKey,lastValueNumber){
      let chartData = [];
      data.forEach((item, index) => {
        let date = item.year + (item.month == "00" ? "" : "-" + item.month);
        let d = chartData.find(a => a.date == date);
        if (!d) {
          d = { date };
          types.forEach(t => {
            d[t || "全部"] = 0;
          });
          chartData.splice(0, 0, d);
        }
        d[item[nameKey] || "全部"] = item[valueKey];
        if (item[lastValueNumber] != null) {
          d["去年同期"] = item[lastValueNumber];
        }
      });
      return chartData;
    },
    openCustomerChartDialog() {
      let data = this.$refs.customerAnalysisList.$refs.list.data;
      let types = Array.from(new Set(data.map(item => item.customerTypeName)));      
      if (this.$refs.customerAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(types,data,"customerTypeName","newNumber","lastNumber");
      this.$refs.customerChartDialog.open().then(that => {
        that.setChartOption({
          dataset: {
            source: chartData
          },
          series: types.map(item => {
            return {
              name: item,
              type: "bar"
            };
          })
        });
      });
    },
    openContractChartDialog() {
      let data = this.$refs.contractAnalysisList.$refs.list.data;
      let types = Array.from(new Set(data.map(item => item.customerTypeName)));      
      if (this.$refs.contractAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(types,data,"customerTypeName","newNumber","lastNumber");
      this.$refs.contractChartDialog.open().then(that => {
        that.setChartOption({
          dataset: {
            source: chartData
          },
          series: types.map(item => {
            return {
              name: item,
              type: "bar"
            };
          })
        });
      });
    },
    openBusinessChartDialog() {
      let data = this.$refs.businessAnalysisList.$refs.list.data;
      let types = Array.from(new Set(data.map(item => item.customerTypeName)));    
      if (this.$refs.businessAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(types,data,"customerTypeName","newNumber","lastNumber");
      this.$refs.businessChartDialog.open().then(that => {
        that.setChartOption({
          dataset: {
            source: chartData
          },
          series: types.map(item => {
            return {
              name: item,
              type: "bar"
            };
          })
        });
      });
    },
    openCustomerPrintDialog(){
      this.$refs.customerPrintDialog.open().then(that=>{
        that.rows = this.$refs.customerAnalysisList.$refs.list.data;
      })
    },
    openContractPrintDialog(){
      this.$refs.contractPrintDialog.open().then(that=>{
        that.rows = this.$refs.contractAnalysisList.$refs.list.data;
      })
    },
    openBusinessPrintDialog(){
      this.$refs.businessPrintDialog.open().then(that=>{
        that.rows = this.$refs.businessAnalysisList.$refs.list.data;
      })
    }
  }
};
</script>