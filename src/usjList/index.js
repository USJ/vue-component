import usjList from './usjList.vue'
import usjListItem from './usjListItem.js'
import usjListExpand from './usjListExpand.vue'

export default function install (Vue) {
  Vue.component('usj-list', usjList)
  Vue.component('usj-list-item', usjListItem)
  Vue.component('usj-list-expand', usjListExpand)
}

export { usjList, usjListExpand, usjListItem }
