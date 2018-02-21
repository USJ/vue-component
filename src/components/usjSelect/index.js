import usjSelect from './usjSelect.vue'
import usjOption from './usjOption.vue'

export default function install (Vue) {
  Vue.component('usj-select', usjSelect)
  Vue.component('usj-option', usjOption)
}

export { usjSelect, usjOption }
