<template>
  <common-dialog
    ref="dialog"
    width="800px"
    title="在职数据分析图表"
    :inDialog="inDialog"
    @close-saved="$emit('close-saved')"
    @closed="onClosed"
  >
    <chart :option="chartOption" ref="chart" :page="false">
      <el-radio-group slot="toolbar-left" v-model="chartType" @change="onChartTypeChange">
        <el-radio-button label="bar">柱形</el-radio-button>
        <el-radio-button label="line">曲线</el-radio-button>
      </el-radio-group>
    </chart>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import editDialogMixin from "@/mixins/editDialog";
import chart from "@/components/common/chart";

export default {
  mixins: [editDialogMixin],
  components: {
    commonDialog,
    chart
  },
  data() {
    return {
      chartType: "bar",
      chartOption: {
        legend: {},
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            type: "category"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量"
          }
        ],
        series: []
      }
    };
  },
  methods: {
    setChartOption(option) {
      this.$refs.chart.setOption(option);
    },
    onClosed() {
      this.$refs.chart.clear();
      this.chartType = "bar";
    },
    onChartTypeChange(v) {
      let option = this.$refs.chart.chart.getOption();
      let series = option.series.map(item => {
        return {
          type: v,
          smooth: true
        };
      });
      this.$refs.chart.setOption({
        series
      });
    }
  }
};
</script>