import Vue from 'vue'
import permission from '@/utils/permission'

Object.defineProperty(Vue.prototype, '$permission', { value: permission })