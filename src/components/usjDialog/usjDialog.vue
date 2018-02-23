<style lang="scss">
  @import '../../style/variables.scss';
  @import '../../style/elevation.scss';

  .usj-dialog-container {
    font-family: $usj-font-family;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 108;

    &.usj-active {
      pointer-events: auto;

      .usj-dialog {
        opacity: 1 !important;
        transform: scale(1) !important;
        transition: $swift-ease-out;
        transition-property: opacity, transform;
      }
    }
  }

  .usj-dialog-backdrop {
    position: fixed;
    z-index: 109;
  }

  .usj-dialog {
    @include elevate(1);

    background-color: white;
    min-width: 800px;
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-flow: column;
    overflow: hidden;
    position: relative;
    z-index: 110;
    outline: none;
    border-radius: 2px;
    opacity: 0;
    transform: scale(0.9, 0.85);
    transform-origin: center center;
    transition: opacity $swift-ease-out-duration $swift-ease-out-timing-function,
    transform $swift-ease-out-duration 0.05s $swift-ease-out-timing-function;
    will-change: opacity, transform;

    &.usj-reference {
      transform-origin: top center;
    }

    &.usj-transition-off {
      transition: none !important;
    }

    p {
      margin: 0;
    }
  }

  .usj-dialog-title {
    margin-bottom: 52px;
    padding: 39px 42px 0 42px;
    font-size: 18pt;
    font-weight: 500;
  }

  .usj-dialog-content {
    padding: 0 42px 42px;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    position: relative;
    background: linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px),
    linear-gradient(to top, #fff 0, #fff 3px, transparent 3px),
    linear-gradient(
                    to bottom,
                    rgba(#000, 0.12) 0,
                    rgba(#000, 0.12) 1px,
                    transparent 1px
    ),
    linear-gradient(
                    to top,
                    rgba(#000, 0.2) 1px,
                    rgba(#000, 0.2) 2px,
                    transparent 2px
    );
    // background: linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px),
    //             linear-gradient(to top, #fff 0, #fff 3px, transparent 3px),
    //             linear-gradient(to bottom, rgba(#000, .12) 0, rgba(#000, .12) 1px, transparent 1px),
    //             linear-gradient(to top, rgba(#000, .2) 1px, rgba(#000, .2) 2px, transparent 2px);
    background-attachment: local, local, scroll, scroll;

    &:first-child {
      padding-top: 24px;
    }

    p:first-child:not(:only-child) {
      margin-top: 0;
    }

    p:last-child:not(:only-child) {
      margin-bottom: 0;
    }
  }

  .usj-dialog-body {
    margin: 0 -24px;
    padding: 0 24px;
    overflow: auto;
  }

  .usj-dialog-actions {
    min-height: 52px;
    padding: 8px 42px 35px 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    &:before {
      height: 1px;
      position: absolute;
      top: -1px;
      right: 0;
      left: 0;
      background-color: #fff;
      content: ' ';
    }

    .usj-button {
      min-width: 64px;
      margin: 0;
      padding: 0 15px;

      + .usj-button {
        margin-left: 8px;
      }
    }
  }
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
