<template>
  <div>
    <el-alert
      style="margin-bottom:5px"
      title="温馨提示"
      type="success"
      description="此页面是统计员工在统计日期内每一天的考勤统计情况，请先指定统计日期范围，再进行统计，如果不指定统计的范围，会因数据量巨大导致统计非常缓慢"
      show-icon
    ></el-alert>
    <list :disabled="!$permission.canRead()" />
  </div>
</template>
<script>
import list from "@/components/hr/attendanceStatistic/dayList";
export default {
  components: { list }
};
</script>