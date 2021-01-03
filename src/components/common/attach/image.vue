<template>
  <img v-attach-src="id" @click="onClick" class="__img"/>
</template>
<script>
import api from "@/api/common/attach";
export default {
  props:{
    id:{
      type:[String,Number]
    }
  },
  directives: {
    attachSrc: {
      bind: function(el, binding, vnode) {
        api.load(binding.value).then(res => {
          el.src = URL.createObjectURL(res);
        });
      }
    }
  },
  methods:{
    onClick(){
      this.$emit("click")
    }
  }
}
</script>
<style scoped>
.__img{
  max-width: 100%;
  /* width:100px;
  height:100px; */
}
</style>