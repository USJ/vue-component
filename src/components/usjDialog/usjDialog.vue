<style src="./usjDialog.scss" lang="scss">

</style>

<template>
  <div class="usj-dialog-container" :class="[classes]" @keyup.esc.stop="closeOnEsc" tabindex="0">
    <div ref="dialog" class="usj-dialog" :style="styles" :class="dialogClasses">
      <slot></slot>
    </div>

    <usj-backdrop v-if="usjBackdrop" ref="backdrop" :class="classes" @close="usjClickOutsideToClose && close()"></usj-backdrop>
  </div>
</template>

<script>
// code from https://github.com/marcosmoura/vue-material/blob/master/src/components/mdDialog/mdDialog.vue
import { usjBackdrop } from '../usjBackdrop'

export default {
  components: { usjBackdrop },
  props: {
    usjEscToClose: {
      type: Boolean,
      default: true
    },
    usjBackdrop: {
      type: Boolean,
      default: true
    },
    usjClickOutsideToClose: {
      type: Boolean,
      default: true
    },
    usjOpenFrom: String,
    usjCloseTo: String,
    usjFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    active: false,
    transitionOff: false,
    dialogTransform: ''
  }),
  computed: {
    classes() {
      return {
        'usj-active': this.active
      }
    },
    dialogClasses() {
      return {
        'usj-fullscreen': this.usjFullscreen,
        'usj-transition-off': this.transitionOff,
        'usj-reference': this.usjOpenFrom || this.usjCloseTo
      }
    },
    styles() {
      return {
        transform: this.dialogTransform
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.dialogElement = this.$el
      this.dialogInnerElement = this.$refs.dialog
      this.removeDialog()
    })
  },
  methods: {
    removeDialog() {
      if (document.body.contains(this.dialogElement)) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    calculateDialogPos(ref) {
      const reference = document.querySelector(ref)
      if (reference) {
        const openFromRect = reference.getBoundingClientRect()
        const dialogRect = this.dialogInnerElement.getBoundingClientRect()
        const widthInScale = openFromRect.width / dialogRect.width
        const heightInScale = openFromRect.height / dialogRect.height
        let distance = {
          top: -(dialogRect.top - openFromRect.top),
          left: -(dialogRect.left - openFromRect.left + openFromRect.width)
        }
        if (openFromRect.top > dialogRect.top + dialogRect.height) {
          distance.top = openFromRect.top - dialogRect.top
        }
        if (openFromRect.left > dialogRect.left + dialogRect.width) {
          distance.left =
            openFromRect.left - dialogRect.left - openFromRect.width
        }
        this.dialogTransform = `translate3D(${distance.left}px, ${
          distance.top
        }px, 0) scale(${widthInScale}, ${heightInScale})`
      }
    },
    open() {
      document.body.appendChild(this.dialogElement)
      this.transitionOff = true
      this.calculateDialogPos(this.usjOpenFrom)
      window.setTimeout(() => {
        this.dialogElement.focus()
        this.transitionOff = false
        this.active = true
      })
      this.$emit('open')
    },
    closeOnEsc() {
      if (this.usjEscToClose) {
        this.close()
      }
    },
    close() {
      const transitionEndEventName = 'transitioned'
      if (document.body.contains(this.dialogElement)) {
        this.$nextTick(() => {
          let cleanElement = () => {
            let activeRipple = this.dialogElement.querySelector(
              '.usj-ripple.usj-active'
            )
            if (activeRipple) {
              activeRipple.classList.remove('usj-active')
            }
            this.dialogInnerElement.removeEventListener(
              transitionEndEventName,
              cleanElement
            )
            document.body.removeChild(this.dialogElement)
            this.dialogTransform = ''
          }
          this.transitionOff = true
          this.dialogTransform = ''
          this.calculateDialogPos(this.mdCloseTo)
          window.setTimeout(() => {
            this.transitionOff = false
            this.active = false
            this.dialogInnerElement.addEventListener(
              transitionEndEventName,
              cleanElement
            )
          })
          this.$emit('close')
        })
      }
    }
  },
  beforeDestroy() {
    this.removeDialog()
  }
}
</script>
