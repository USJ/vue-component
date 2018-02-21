import usjPage from './usjPage.vue'
import usjPageMenu from './usjPageMenu.vue'
import usjPageHeader from './usjPageHeader.vue'
import usjPageContent from './usjPageContent.vue'
import usjPageFooter from './usjPageFooter.vue'
import usjPageSideNav from './usjPageSideNav.vue'
import usjPageSideContent from './usjPageSideContent.vue'

import buildBasicComponent from '../../core/utils/buildBasicComponent'

export {
  usjPage,
  usjPageMenu,
  usjPageHeader,
  usjPageContent,
  usjPageFooter
}

export default function install (Vue) {
  Vue.component('usj-page', usjPage)
  Vue.component('usj-page-menu', usjPageMenu)
  Vue.component('usj-page-header', usjPageHeader)
  Vue.component('usj-page-content', usjPageContent)
  Vue.component('usj-page-footer', usjPageFooter)
  Vue.component('usj-page-side-nav', usjPageSideNav)
  Vue.component('usj-page-side-content', usjPageSideContent)

  Vue.component('usj-page-title', buildBasicComponent('div', 'usj-page-header__title'))

  Vue.component('usj-page-control', buildBasicComponent('div', 'usj-page-control'))
  Vue.component('usj-page-control-item', buildBasicComponent('div', 'usj-page-control__item'))
}
