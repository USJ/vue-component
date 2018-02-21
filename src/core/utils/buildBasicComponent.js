export default function buildComponent (elName, elClass) {
  return {
    functional: true,
    render: (h, context) => h(elName, {
      staticClass: elClass + ' ' + context.data.staticClass
    }, context.children)
  }
}
