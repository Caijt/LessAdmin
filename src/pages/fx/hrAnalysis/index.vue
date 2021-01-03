<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="handleClick">
      <el-tab-pane label="入职数据分析" name="inductionAnalysis">
        <induction-analysis-list ref="inductionAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openInductionPrintDialog">打印</el-button>
            <el-button type="primary" @click="openInductionChartDialog">图表展示</el-button>
          </template>
        </induction-analysis-list>
      </el-tab-pane>
      <!-- <el-tab-pane label="在职数据分析" name="workingAnalysis">
        <working-analysis-list ref="workingAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openWorkingPrintDialog">打印</el-button>
            <el-button type="primary" @click="openWorkingChartDialog">图表展示</el-button>
          </template>
        </working-analysis-list>
      </el-tab-pane>-->
      <el-tab-pane label="离职数据分析" name="dimissionAnalysis">
        <dimission-analysis-list ref="dimissionAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openDimissionPrintDialog">打印</el-button>
            <el-button type="primary" @click="openDimissionChartDialog">图表展示</el-button>
          </template>
        </dimission-analysis-list>
      </el-tab-pane>
      <el-tab-pane label="工资数据分析" name="wageAnalysis">
        <wage-analysis-list ref="wageAnalysisList">
          <template slot="toolbar-left">
            <el-button type="primary" @click="openWagePrintDialog">打印</el-button>
            <el-button type="primary" @click="openWageChartDialog">图表展示</el-button>
          </template>
        </wage-analysis-list>
      </el-tab-pane>
    </el-tabs>

    <induction-chart-dialog ref="inductionChartDialog" />
    <!-- <working-chart-dialog ref="workingChartDialog" /> -->
    <dimission-chart-dialog ref="dimissionChartDialog" />
    <wage-chart-dialog ref="wageChartDialog"></wage-chart-dialog>

    <induction-print-dialog ref="inductionPrintDialog" />
    <!-- <working-print-dialog ref="workingPrintDialog" /> -->
    <dimission-print-dialog ref="dimissionPrintDialog" />
    <wage-print-dialog ref="wagePrintDialog"></wage-print-dialog>
  </div>
</template>
<script>
import curdMixins from "@/mixins/curd";

import inductionAnalysisList from "@/components/fx/hrAnalysis/inductionAnalysis/list";
// import workingAnalysisList from "@/components/fx/hrAnalysis/workingAnalysis/list";
import dimissionAnalysisList from "@/components/fx/hrAnalysis/dimissionAnalysis/list";
import wageAnalysisList from "@/components/fx/hrAnalysis/wageAnalysis/list";

import inductionChartDialog from "@/components/fx/hrAnalysis/inductionAnalysis/chartDialog";
// import workingChartDialog from "@/components/fx/hrAnalysis/workingAnalysis/chartDialog";
import dimissionChartDialog from "@/components/fx/hrAnalysis/dimissionAnalysis/chartDialog";
import wageChartDialog from "@/components/fx/hrAnalysis/wageAnalysis/chartDialog";

import inductionPrintDialog from "@/components/fx/hrAnalysis/inductionAnalysis/printDialog";
// import workingPrintDialog from "@/components/fx/hrAnalysis/workingAnalysis/printDialog";
import dimissionPrintDialog from "@/components/fx/hrAnalysis/dimissionAnalysis/printDialog";
import wagePrintDialog from "@/components/fx/hrAnalysis/wageAnalysis/printDialog";

export default {
  mixins: [curdMixins],
  components: {
    inductionAnalysisList,
    // workingAnalysisList,
    dimissionAnalysisList,
    wageAnalysisList,

    inductionChartDialog,
    // workingChartDialog,
    dimissionChartDialog,
    wageChartDialog,

    inductionPrintDialog,
    // workingPrintDialog,
    dimissionPrintDialog,
    wagePrintDialog
  },
  data() {
    return {
      tabName: "inductionAnalysis"
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
    _toChartData(types, data, nameKeys, valueKey, lastValueNumber) {
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
        let keys = [];
        item.depName && keys.push(item.depName);
        item.postName && keys.push(item.postName);
        item.jobName && keys.push(item.jobName);

        d[keys.join("+") || "全部"] = item[valueKey];
        if (item[lastValueNumber] != null) {
          d["去年同期"] = item[lastValueNumber];
        }
      });
      return chartData;
    },
    openInductionChartDialog() {
      let data = this.$refs.inductionAnalysisList.$refs.list.data;
      let types = Array.from(
        new Set(
          data.map(item => {
            let keys = [];
            item.depName && keys.push(item.depName);
            item.postName && keys.push(item.postName);
            item.jobName && keys.push(item.jobName);
            return keys.join("+");
          })
        )
      );
      if (this.$refs.inductionAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(
        types,
        data,
        ["depName", "postName", "jobName"],
        "newNumber",
        "lastNumber"
      );
      this.$refs.inductionChartDialog.open().then(that => {
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
    // openWorkingChartDialog() {
    //   let data = this.$refs.workingAnalysisList.$refs.list.data;
    //   let types = Array.from(
    //     new Set(
    //       data.map(item => {
    //         let keys = [];
    //         item.depName && keys.push(item.depName);
    //         item.postName && keys.push(item.postName);
    //         item.jobName && keys.push(item.jobName);
    //         return keys.join("+");
    //       })
    //     )
    //   );
    //   if (this.$refs.workingAnalysisList.queryParams.dimensions == 2) {
    //     types.push("去年同期");
    //   }
    //   let chartData = this._toChartData(
    //     types,
    //     data,
    //     ["depName", "postName", "jobName"],
    //     "newNumber",
    //     "lastNumber"
    //   );
    //   this.$refs.workingChartDialog.open().then(that => {
    //     that.setChartOption({
    //       dataset: {
    //         source: chartData
    //       },
    //       series: types.map(item => {
    //         return {
    //           name: item,
    //           type: "bar"
    //         };
    //       })
    //     });
    //   });
    // },
    openDimissionChartDialog() {
      let data = this.$refs.dimissionAnalysisList.$refs.list.data;
      let types = Array.from(
        new Set(
          data.map(item => {
            let keys = [];
            item.depName && keys.push(item.depName);
            item.postName && keys.push(item.postName);
            item.jobName && keys.push(item.jobName);
            return keys.join("+");
          })
        )
      );
      if (this.$refs.dimissionAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(
        types,
        data,
        ["depName", "postName", "jobName"],
        "newNumber",
        "lastNumber"
      );
      this.$refs.dimissionChartDialog.open().then(that => {
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
    openWageChartDialog() {
      let data = this.$refs.wageAnalysisList.$refs.list.data;
      let types = Array.from(
        new Set(
          data.map(item => {
            let keys = [];
            item.depName && keys.push(item.depName);
            item.wageType && keys.push(item.wageType);
            item.isPay && keys.push(item.isPay);
            return keys.join("+");
          })
        )
      );
      if (this.$refs.wageAnalysisList.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toWageChartData(
        types,
        data,
        ["depName", "wageType", "isPay"],
        "newAmount",
        "lastAmount"
      );
      this.$refs.wageChartDialog.open().then(that => {
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
    _toWageChartData(types, data, nameKeys, valueKey, lastValueNumber) {
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
        let keys = [];
        item.depName && keys.push(item.depName);
        item.wageType && keys.push(item.wageType);
        item.isPay && keys.push(item.isPay);

        d[keys.join("+") || "全部"] = item[valueKey];
        if (item[lastValueNumber] != null) {
          d["去年同期"] = item[lastValueNumber];
        }
      });
      return chartData;
    },
    openInductionPrintDialog() {
      this.$refs.inductionPrintDialog.open().then(that => {
        that.rows = this.$refs.inductionAnalysisList.$refs.list.data;
      });
    },
    // openWorkingPrintDialog() {
    //   this.$refs.workingPrintDialog.open().then(that => {
    //     that.rows = this.$refs.workingAnalysisList.$refs.list.data;
    //   });
    // },
    openDimissionPrintDialog() {
      this.$refs.dimissionPrintDialog.open().then(that => {
        that.rows = this.$refs.dimissionAnalysisList.$refs.list.data;
      });
    },
    openWagePrintDialog() {
      this.$refs.wagePrintDialog.open().then(that => {
        that.rows = this.$refs.wageAnalysisList.$refs.list.data;
      });
    }
  }
};
</script>