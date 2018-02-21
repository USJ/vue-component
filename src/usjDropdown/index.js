import usjDropdown from './usjDropdown.vue'
import usjDropdownButton from './usjDropdownButton.vue'
import usjDropdownMenu from './usjDropdownMenu.vue'
import usjDropdownItem from './usjDropdownItem'

export default function install (Vue) {
  Vue.component('usj-dropdown', usjDropdown)
  Vue.component('usj-dropdown-button', usjDropdownButton)
  Vue.component('usj-dropdown-menu', usjDropdownMenu)
  Vue.component('usj-dropdown-item', usjDropdownItem)
}
