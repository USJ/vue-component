import usjListView from './usjListView.vue'
import usjListViewDetails from './usjListViewDetails.vue'
import usjListViewList from './usjListViewList.vue'
import usjListViewItem from './usjListViewItem.vue'

const usjListActions = {
  functional: true,
  render: (h, context) => {
    let classes = context.data.staticClass || ''

    return h('div', {
      staticClass: 'usj-list-actions ' + classes
    }, context.children)
  }
}

const usjDetailsActions = {
  functional: true,
  render: (h, context) => {
    let classes = context.data.staticClass || ''

    return h('div', {
      staticClass: 'usj-details-actions ' + classes
    }, context.children)
  }
}

export default function install (Vue) {
  Vue.component('usj-list-view', usjListView)
  Vue.component('usj-list-view-details', usjListViewDetails)
  Vue.component('usj-list-view-list', usjListViewList)
  Vue.component('usj-list-view-item', usjListViewItem)

  Vue.component('usj-list-actions', usjListActions)
  Vue.component('usj-details-actions', usjDetailsActions)
}
