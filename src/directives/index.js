import Vue from 'vue'
import commonJs from "@/utils/common"
import Router from "@/router"

Vue.directive('data', {
  bind: function (el, binding, vnode) {
    if (!el["vData"]) el["vData"] = {};
    el["vData"][binding.arg] = binding.value;
  }
})

Vue.directive('can', {
  bind: function (el, binding, vnode) {
    console.log(binding)
    console.log(vnode)
    console.log(Router.history.current)
  }
})