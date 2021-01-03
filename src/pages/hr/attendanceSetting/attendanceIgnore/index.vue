<template>
  <div>
    <el-alert
      title="温馨提示"
      type="success"
      description="此页面设置考勤忽略规则，只要员工符合以下任一条件，就无需进行考勤打卡，考勤统计均不会显示异常。此规则优先级最高，只要符合条件，其它考勤设置都不起作用。"
      show-icon
    ></el-alert>    
    <edit-form v-if="$permission.canRead()" ref="editForm" />
  </div>
</template>
<script>
import editForm from "@/components/hr/attendanceSetting/attendanceIgnore/editForm";

export default {
  components: {
    editForm
  },
  mixins: [],
  mounted() {
    this.$refs.editForm.getData();
  },
  methods: {}
};
</script>