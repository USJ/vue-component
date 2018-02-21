import usjTable from './usjTable.vue'
import usjTableHead from './usjTableHead.vue'
import usjTableRow from './usjTableRow.vue'
import usjTableCell from './usjTableCell.vue'

const usjTableHeader = {
  functional: true,
  render: (h, context) => {
    let classes = context.data.staticClass || ''

    return h('thead', {
      staticClass: 'usj-table__header ' + classes
    }, context.children)
  }
}

const usjTableBody = {
  functional: true,
  render: (h, context) => {
    let classes = context.data.staticClass || ''

    return h('tbody', {
      staticClass: 'usj-table__body ' + classes
    }, context.children)
  }
}

export default function install (Vue) {
  Vue.component('usj-table', usjTable)
  Vue.component('usj-table-head', usjTableHead)
  Vue.component('usj-table-row', usjTableRow)
  Vue.component('usj-table-cell', usjTableCell)
  Vue.component('usj-table-header', usjTableHeader)
  Vue.component('usj-table-body', usjTableBody)
}

export {
  usjTable,
  usjTableHeader,
  usjTableHead,
  usjTableBody,
  usjTableRow,
  usjTableCell
}
