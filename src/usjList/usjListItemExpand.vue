<template>
  <li class="usj-list-item usj-list-item-expand" :class="classes">
    <div class="usj-list-item-container usj-button">
      <slot></slot>

      <usj-icon class="usj-list-expand-indicator">keyboard_arrow_down</usj-icon>
    </div>

    <usj-button type="button" class="usj-button-ghost" @click.native="toggleExpandList" :disabled="disabled"></usj-button>

    <div class="usj-list-expand" ref="expand" :class="expandClasses" :style="expandStyles">
      <slot name="expand"></slot>
    </div>
  </li>
</template>

<script>
  import getClosestVueParent from '../../core/utils/getClosestVueParent'

  export default {
    name: 'usj-list-item',
    props: {
      disabled: Boolean,
      usjExpandMultiple: Boolean
    },
    data () {
      return {
        parentList: false,
        active: false,
        height: 0,
        contentObserver: null,
        transitionOff: true
      }
    },
    computed: {
      classes () {
        return {
          'usj-disabled': this.disabled,
          'usj-active': this.active
        }
      },
      expandClasses () {
        return {
          'usj-transition-off': this.transitionOff
        }
      },
      expandStyles () {
        return {
          'margin-bottom': this.height
        }
      }
    },
    methods: {
      resetSiblings () {
        this.parentList.$children.forEach((child) => {
          if (child.$el !== this.$el && child.$el.classList.contains('usj-list-item-expand')) {
            child.active = false
          }
        })
      },
      calculatePadding () {
        window.requestAnimationFrame(() => {
          this.height = -this.$el.scrollHeight + 'px'

          window.setTimeout(() => {
            this.transitionOff = false
          })
        })
      },
      toggleExpandList () {
        if (!this.usjExpandMultiple) {
          this.resetSiblings()
        }

        this.calculatePadding()
        this.active = !this.active
      },
      recalculateAfterChange () {
        this.transitionOff = true
        this.calculatePadding()
      },
      observeChildChanges () {
        this.contentObserver = new MutationObserver(this.recalculateAfterChange)
        this.contentObserver.observe(this.$refs.expand, {
          childList: true,
          characterData: true,
          subtree: true
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.parentList = getClosestVueParent(this.$parent, 'usj-list')
        this.calculatePadding()
        this.observeChildChanges()
        window.addEventListener('resize', this.recalculateAfterChange)
      })
    },
    beforeDestroy () {
      if (this.contentObserver) {
        this.contentObserver.disconnect()
      }

      window.removeEventListener('resize', this.recalculateAfterChange)
    }
  }
</script>
