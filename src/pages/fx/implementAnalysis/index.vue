<template>
  <div>
    <list ref="list">
      <template slot="toolbar-left">
        <el-button type="primary" @click="openPrintDialog">打印</el-button>
        <el-button type="primary" @click="openChartDialog">图表展示</el-button>
      </template>
    </list>
    <chart-dialog ref="chartDialog" />
    <print-dialog ref="printDialog" />
  </div>
</template>
<script>
import list from "@/components/fx/implementAnalysis/list";
import curdMixins from "@/mixins/curd";
import chartDialog from "@/components/fx/implementAnalysis/chartDialog";
import printDialog from "@/components/fx/implementAnalysis/printDialog";

export default {
  mixins: [curdMixins],
  components: {
    list,
    chartDialog,
    printDialog
  },
  methods: {
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
        item.customerTypeName && keys.push(item.customerTypeName);
        item.isQualified && keys.push(item.isQualified);
        item.satisfaction && keys.push(item.satisfaction);

        d[keys.join("+") || "全部"] = item[valueKey];
        if (item[lastValueNumber] != null) {
          d["去年同期"] = item[lastValueNumber];
        }
      });
      return chartData;
    },
    openChartDialog() {
      let data = this.$refs.list.$refs.list.data;
      let types = Array.from(
        new Set(
          data.map(item => {
            let keys = [];
            item.customerTypeName && keys.push(item.customerTypeName);
            item.isQualified && keys.push(item.isQualified);
            item.satisfaction && keys.push(item.satisfaction);
            return keys.join("+");
          })
        )
      );
      if (this.$refs.list.queryParams.dimensions == 2) {
        types.push("去年同期");
      }
      let chartData = this._toChartData(
        types,
        data,
        ["customerTypeName", "isQualified", "satisfaction"],
        "projectNumber",
        "lastProjectNumber"
      );
      this.$refs.chartDialog.open().then(that => {
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
    openPrintDialog() {
      this.$refs.printDialog.open().then(that => {
        that.rows = this.$refs.list.$refs.list.data;
      });
    }
  }
};
</script>