<template>
  <div class="usj-menu">
    <slot></slot>

    <usj-backdrop class="usj-menu-backdrop usj-transparent usj-active" ref="backdrop" @close="close"></usj-backdrop>
  </div>
</template>

<style lang="scss">
  @import '../../style/variables.scss';
  @import '../../style/elevation';

  $menu-base-width: 56px;

  .usj-menu {
    display: inline-block;
  }

  .usj-menu-content {
    @include elevate(2);

    width: $menu-base-width * 3;
    min-width: $menu-base-width * 1.5;
    max-width: $menu-base-width * 7;
    min-height: 64px;
    max-height: calc(100vh - 32px);
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    z-index: 131;
    transform: scale(0.9, 0.85) translateZ(0);
    border-radius: 2px;
    opacity: 0;
    transition: width $swift-ease-out-duration $swift-ease-out-timing-function,
    opacity 0.3s $swift-ease-in-timing-function,
    margin 0.3s $swift-ease-in-timing-function,
    transform 0s 0.4s $swift-ease-in-timing-function;
    will-change: transform, opacity, width;

    background: white;
    & * {
      outline: none;
    }

    &.usj-direction-bottom-right {
      margin-top: -20px;
      margin-left: -8px;
      transform-origin: top left;

      &.usj-active {
        margin-top: -11px;
      }
    }

    &.usj-direction-bottom-left {
      margin-top: -20px;
      margin-left: 8px;
      transform-origin: top right;

      &.usj-active {
        margin-top: -11px;
      }
    }

    &.usj-direction-top-right {
      margin-top: 20px;
      margin-left: -8px;
      transform-origin: bottom left;

      &.usj-active {
        margin-top: 11px;
      }
    }

    &.usj-direction-top-left {
      margin-top: 20px;
      margin-left: 8px;
      transform-origin: bottom right;

      &.usj-active {
        margin-top: 11px;
      }
    }

    &.usj-align-trigger {
      margin: 0;
    }

    &.usj-size-1 {
      width: $menu-base-width * 1.5;
    }

    @for $i from 2 through 7 {
      &.usj-size-#{$i} {
        width: $menu-base-width * $i;
      }
    }

    &.usj-active {
      pointer-events: auto;
      opacity: 1;
      transform: scale(1) translateZ(0);
      transition: width $swift-ease-out-duration $swift-ease-out-timing-function,
      opacity 0.4s $swift-ease-out-timing-function,
      transform 0.3s $swift-ease-out-timing-function;

      .usj-list {
        opacity: 1;
        transition: opacity 0.3s $swift-ease-out-timing-function;
      }
    }

    .usj-list {
      opacity: 0;
      transition: opacity 0.3s $swift-ease-out-timing-function;
    }
  }

  .usj-menu-item {
    cursor: pointer;
    font-size: 16px;
    line-height: 1.2em;

    &[disabled] {
      cursor: default;
    }

    .usj-list-item-holder {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .usj-backdrop.usj-menu-backdrop {
    z-index: 130;
  }
</style>

<script>
import transitionEndEventName from '../../core/utils/transitionEndEventName'
import getInViewPosition from '../../core/utils/getInViewPosition'

export default {
  props: {
    usjSize: {
      type: [Number, String],
      default: 0
    },
    usjDirection: {
      type: String,
      default: 'bottom right'
    },
    usjAlignTrigger: {
      type: Boolean,
      default: false
    },
    usjOffsetX: {
      type: [Number, String],
      default: 0
    },
    usjOffsetY: {
      type: [Number, String],
      default: 0
    },
    usjCloseOnSelect: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    active: false
  }),
  watch: {
    usjSize(current, previous) {
      if (current >= 1 && current <= 7) {
        this.removeLastSizeMenuContentClass(previous)
        this.addNewSizeMenuContentClass(current)
      }
    },
    usjDirection(current, previous) {
      this.removeLastDirectionMenuContentClass(previous)
      this.addNewDirectionMenuContentClass(current)
    },
    usjAlignTrigger(trigger) {
      this.handleAlignTriggerClass(trigger)
    }
  },
  methods: {
    validateMenu() {
      if (!this.menuContent) {
        this.$destroy()

        throw new Error('You must have a usj-menu-content inside your menu.')
      }

      if (!this.menuTrigger) {
        this.$destroy()

        throw new Error(
          'You must have an element with a usj-menu-trigger attribute inside your menu.'
        )
      }
    },
    removeLastSizeMenuContentClass(size) {
      this.menuContent.classList.remove('usj-size-' + size)
    },
    removeLastDirectionMenuContentClass(direction) {
      this.menuContent.classList.remove(
        'usj-direction-' + direction.replace(/ /g, '-')
      )
    },
    addNewSizeMenuContentClass(size) {
      this.menuContent.classList.add('usj-size-' + size)
    },
    addNewDirectionMenuContentClass(direction) {
      this.menuContent.classList.add(
        'usj-direction-' + direction.replace(/ /g, '-')
      )
    },
    handleAlignTriggerClass(trigger) {
      if (trigger) {
        this.menuContent.classList.add('usj-align-trigger')
      }
    },
    getPosition(vertical, horizontal) {
      let menuTriggerRect = this.menuTrigger.getBoundingClientRect()

      let top =
        vertical === 'top'
          ? menuTriggerRect.top +
            menuTriggerRect.height -
            this.menuContent.offsetHeight
          : menuTriggerRect.top

      let left =
        horizontal === 'left'
          ? menuTriggerRect.left -
            this.menuContent.offsetWidth +
            menuTriggerRect.width
          : menuTriggerRect.left

      top += parseInt(this.usjOffsetY, 10)
      left += parseInt(this.usjOffsetX, 10)

      if (this.usjAlignTrigger) {
        if (vertical === 'top') {
          top -= menuTriggerRect.height + 11
        } else {
          top += menuTriggerRect.height + 11
        }
      }

      return { top, left }
    },
    calculateMenuContentPos() {
      let position

      if (!this.usjDirection) {
        position = this.getPosition('bottom', 'right')
      } else {
        position = this.getPosition.apply(
          this,
          this.usjDirection.trim().split(' ')
        )
      }

      position = getInViewPosition(this.menuContent, position)

      this.menuContent.style.top = position.top + window.pageYOffset + 'px'
      this.menuContent.style.left = position.left + window.pageXOffset + 'px'
    },
    recalculateOnResize() {
      window.requestAnimationFrame(this.calculateMenuContentPos)
    },
    open() {
      if (document.body.contains(this.menuContent)) {
        document.body.removeChild(this.menuContent)
      }

      document.body.appendChild(this.menuContent)
      document.body.appendChild(this.backdropElement)
      window.addEventListener('resize', this.recalculateOnResize)

      this.calculateMenuContentPos()

      getComputedStyle(this.menuContent).top
      this.menuContent.classList.add('usj-active')
      this.menuContent.focus()
      this.active = true
      this.$emit('open')
    },
    close() {
      let close = event => {
        if (this.menuContent && event.target === this.menuContent) {
          let activeRipple = this.menuContent.querySelector(
            '.usj-ripple.usj-active'
          )

          this.menuContent.removeEventListener(transitionEndEventName, close)
          this.menuTrigger.focus()
          this.active = false

          if (activeRipple) {
            activeRipple.classList.remove('usj-active')
          }

          document.body.removeChild(this.menuContent)
          document.body.removeChild(this.backdropElement)
          window.removeEventListener('resize', this.recalculateOnResize)
        }
      }

      this.menuContent.addEventListener(transitionEndEventName, close)
      this.menuContent.classList.remove('usj-active')
      this.$emit('close')
    },
    toggle() {
      if (this.active) {
        this.close()
      } else {
        this.open()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.menuTrigger = this.$el.querySelector('[usj-menu-trigger]')
      this.menuContent = this.$el.querySelector('.usj-menu-content')
      this.backdropElement = this.$refs.backdrop.$el
      this.validateMenu()
      this.handleAlignTriggerClass(this.usjAlignTrigger)
      this.addNewSizeMenuContentClass(this.usjSize)
      this.addNewDirectionMenuContentClass(this.usjDirection)
      this.$el.removeChild(this.$refs.backdrop.$el)
      this.menuContent.parentNode.removeChild(this.menuContent)
      this.menuTrigger.addEventListener('click', this.toggle)
    })
  },
  beforeDestroy() {
    if (document.body.contains(this.menuContent)) {
      document.body.removeChild(this.menuContent)
      document.body.removeChild(this.backdropElement)
    }

    this.menuTrigger.removeEventListener('click', this.toggle)
    window.removeEventListener('resize', this.recalculateOnResize)
  }
}
</script>
