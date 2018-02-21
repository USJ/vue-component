import usjMenu from './usjMenu.vue'
import usjMenuItem from './usjMenuItem.vue'
import usjMenuContent from './usjMenuContent.vue'

export default function install (Vue) {
  Vue.component('usj-menu', usjMenu)
  Vue.component('usj-menu-item', usjMenuItem)
  Vue.component('usj-menu-content', usjMenuContent)
}
