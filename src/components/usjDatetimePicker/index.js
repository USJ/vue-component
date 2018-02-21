import usjDatetimePicker from './usjDatetimePicker.vue'

export default function install (Vue) {
  require('flatpickr/dist/themes/material_orange.css')

  Vue.component('usj-datetime-picker', usjDatetimePicker)
}
