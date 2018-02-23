import UsjListItemButton from './usjListItemButton.vue'
import UsjListItemLink from './usjListItemLink.vue'
import UsjListItemRouter from './usjListItemRouter.vue'
import usjListItemExpand from './usjListItemExpand.vue'
import UsjListItemDefault from './usjListItemDefault.vue'

export default {
  functional: true,
  props: {
    href: String,
    disabled: Boolean
  },
  render(createElement, { children, data, props }) {
    const getItemComponent = () => {
      const on = data.on
      const interactionEvents = [
        'contextmenu',
        'dblclick',
        'dragend',
        'mousedown',
        'touchstart',
        'click'
      ]
      let childrenCount = children.length

      if (props.href) {
        return UsjListItemLink
      }

      if (on) {
        let counter = interactionEvents.length

        while (counter--) {
          if (on[interactionEvents[counter]]) {
            return UsjListItemButton
          }
        }
      }

      while (childrenCount--) {
        const options = children[childrenCount].componentOptions

        if (options) {
          if (options.tag === 'usj-list-expand') {
            const expandComponent = children[childrenCount]

            data.scopedSlots = {
              expand: () => expandComponent
            }

            children.splice(childrenCount, 1)

            return usjListItemExpand
          } else if (options.tag === 'router-link') {
            children[childrenCount].data.staticClass = 'usj-list-item-container'

            return UsjListItemRouter
          }
        }
      }

      return UsjListItemDefault
    }

    return createElement(
      getItemComponent(),
      Object.assign({ props }, data),
      children
    )
  }
}
