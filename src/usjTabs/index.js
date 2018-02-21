import usjTabs from './usjTabs.vue'
import usjTab from './usjTab.vue'

export default function install (Vue) {
  Vue.component('usj-tabs', usjTabs)
  Vue.component('usj-tab', usjTab)
}

export {usjTabs, usjTab}
