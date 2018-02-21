import usjInputContainer from './usjInputContainer.vue'
import usjInput from './usjInput.vue'
import usjTextarea from './usjTextarea.vue'

export default function install (Vue) {
  Vue.component('usj-input', usjInput)
  Vue.component('usj-input-container', usjInputContainer)
  Vue.component('usj-textarea', usjTextarea)
}

export { usjInputContainer, usjInput }
