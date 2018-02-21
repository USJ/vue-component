
import usjChip from './usjChip.vue'
import usjChips from './usjChips.vue'

export default function install (Vue) {
  Vue.component('usj-chip', usjChip)
  Vue.component('usj-chips', usjChips)
}

export { usjChip }
