
const usjDivider = {
  functional: true,
  render: (h, context) => {
    let classes = context.data.staticClass || ''

    return h('hr', {
      staticClass: 'usj-divider ' + classes
    }, context.children)
  }
}

require('./usjDivider.scss')

export default function install (Vue) {
  Vue.component('usj-divider', usjDivider)
}
