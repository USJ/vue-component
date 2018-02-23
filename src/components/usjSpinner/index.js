require('./usjSpinner.css')

function range(begin, end) {
  return Array.from(new Array(end), (val, index) => index + begin)
}

const usjSpinner = {
  render: function(h) {
    let children = []
    range(1, 13).forEach(i => {
      children.push(
        h('div', {
          class: `sk-circle${i} sk-child`
        })
      )
    })

    return h(
      this.tag,
      {
        class: 'sk-circle usj-spinner'
      },
      children
    )
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}

export default function install(Vue) {
  Vue.component('usj-spinner', usjSpinner)
}

export { usjSpinner }
