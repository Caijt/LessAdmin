<template>
  <div style="max-width:800px">
    <edit-form></edit-form>
  </div>
</template>
<script>
import editForm from "@/components/sys/config/editForm";
export default {
  components: { editForm },
  data() {
    return {
      testData: [
        {
          meta: { title: "test", fullPath: "/test", id: 1 }
        },
        {
          meta: { title: "test", fullPath: "/test2", id: 2 },
          children: [
            {
              meta: { title: "test", fullPath: "/test3", id: 3 }
            }
          ]
        }
      ]
    };
  },
  mounted() {
    console.log(this.$store.state.sys.permissionRouters);
  }
};
</script>