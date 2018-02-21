import usjDropdownItemButton from './usjDropdownItemButton.vue'
import usjDropdownItemDefault from './usjDropdownItemDefault.vue'

export default {
  functional: true,
  render (h, { children, data, props }) {
    function selectComponent (props, data) {
      let componentEvents = []
      let btnEvents = ['click']

      if (data.on) { componentEvents = Object.keys(data.on) }

      const hasBtnEvent = btnEvents
          .filter(eventName => componentEvents.indexOf(eventName) !== -1).length > 0

      if (hasBtnEvent) {
        return usjDropdownItemButton
      }

      return usjDropdownItemDefault
    }

    // select component base on props values
    return h(selectComponent(props, data), {props, ...data}, children)
  }
}
