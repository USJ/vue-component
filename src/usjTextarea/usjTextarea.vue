<template>
  <div ref="root">
    <span v-if="!float">
      <div class="mdc-textfield mdc-textfield--multiline">
        <textarea :id="id" class="mdc-textfield__input" :placeholder="placeholder"></textarea>
      </div>
    </span>
    <span v-if="float">
      <!-- multiline -->
      <div ref="textfield" class="mdc-textfield mdc-textfield--multiline" :class="classes">
        <textarea :value="value" ref="native" :id="id" class="mdc-textfield__input" @change="fireEvent"></textarea>
        <label ref="label" :class="labelClasses" class="mdc-textfield__label mdc-textfield__label--float-above" :for="id">
          {{ placeholder }}
        </label>
      </div>
      <p ref="helptext" :class="helptextClasses" :id="id + '-helptext'" class="mdc-textfield-helptext" aria-hidden="true" slot="usjHelptext">
        <slot name="helptext"></slot>
      </p>
    </span>
  </div>
</template>

<script>
import { MDCTextfieldFoundation } from '@material/textfield'

export default {
  props: {
    'id': String,
    'labelId': String,
    'value': String,
    'disabled': {
      type: Boolean,
      default: false
    },
    'float': {
      type: Boolean,
      default: false
    },
    'placeholder': String
  },
  data () {
    return {
      classes: {},
      labelClasses: {},
      helptextClasses: {},
      changeHandlers: [],
      foundation: null
    }
  },
  mounted () {
    if (this.float) {
      let vm = this
      this.foundation = new MDCTextfieldFoundation({
        addClass (className) {
          vm.$set(vm.classes, className, true)
        },
        removeClass (className) {
          vm.$refs.textfield.classList.remove(className)
        },
        addClassToLabel (className) {
          vm.$refs.label.classList.add(className)
        },
        removeClassFromLabel (className) {
          vm.$refs.label.classList.remove(className)
        },
        addClassToHelptext (className) {
          vm.$refs.helpdesk.classList.add(className)
        },
        removeClassToHelptext (className) {
          vm.$refs.helptext.classList.remove(className)
        },
        helptextHasClass (className) {
          return vm.$refs.helptext.className.indexOf(className) > -1
        },
        setHelptextAttr (name, value) {
          vm.$refs.helptext.setAttribute(name, value)
        },
        removeHelptextAttr (name) {
          vm.$refs.helptext.removeAttribute(name)
        },
        registerInputFocusHandler (handler) {
          vm.$refs.native.addEventListener('focus', handler)
        },
        deregisterInputFocusHandler (handler) {
          vm.$refs.native.removeEventListener('focus', handler)
        },
        registerInputBlurHandler (handler) {
          vm.$refs.native.addEventListener('blur', handler)
        },
        deregisterInputBlurHandler (handler) {
          vm.$refs.native.removeEventListener('blur', handler)
        },
        registerInputInputHandler (handler) {
          vm.$refs.native.addEventListener('input', handler)
        },
        deregisterInputInputHandler (handler) {
          vm.$refs.native.removeEventListener('input', handler)
        },
        registerInputKeydownHandler (handler) {
          vm.$refs.native.addEventListener('keydown', handler)
        },
        deregisterInputKeydownHandler (handler) {
          vm.$refs.native.removeEventListener('keydown', handler)
        },
        getNativeInput () {
          return vm.$refs.native
        }
      })
      this.foundation.init()

      this.foundation.setDisabled(this.disabled)

      if (this.value) {
        this.$refs.label.classList.add('mdc-textfield__label--float-above')
      }
    }
  },
  beforeUnmount () {
    this.foundation.destroy()
  },
  methods: {
    fireEvent (event) {
      this.changeHandlers.forEach((h) => h(event))
      this.$emit('input', event.target.value)
    }
  },
  computed: {
  }
}
</script>
