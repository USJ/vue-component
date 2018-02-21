<template>
  <div class="usj-tabs" :class="[tabClasses]">
    <div usj-tag="nav" class="usj-tabs-navigation" :usj-elevation="usjElevation" :class="navigationClasses" ref="tabNavigation">
      <button
        v-for="header in tabList"
        :key="header.id"
        type="button"
        class="usj-tab-header"
        :class="getHeaderClass(header)"
        :disabled="header.disabled"
        @click="setActiveTab(header)"
        ref="tabHeader">
        <div class="usj-tab-header-container">
          <usj-icon v-if="header.icon">{{ header.icon }}</usj-icon>
          <span v-if="header.label">{{ header.label }}</span>
          <usj-tooltip v-if="header.tooltip" :usj-direction="header.tooltipDirection" :usj-delay="header.tooltipDelay">{{ header.tooltip }}</usj-tooltip>
        </div>
      </button>

      <span class="usj-tab-indicator" :class="indicatorClasses" ref="indicator"></span>
    </div>

    <div class="usj-tabs-content" ref="tabContent" :style="{ height: contentHeight }">
      <div class="usj-tabs-wrapper" :style="{ transform: `translate3D(-${contentWidth}, 0, 0)` }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./usjTabs.scss"></style>

<script>
  import throttle from '../../core/utils/throttle'
  export default {
    props: {
      usjFixed: Boolean,
      usjCentered: Boolean,
      usjRight: Boolean,
      usjDynamicHeight: {
        type: Boolean,
        default: false
      },
      usjElevation: {
        type: [String, Number],
        default: 0
      }
    },
    data: () => ({
      tabList: {},
      activeTab: null,
      activeTabNumber: 0,
      hasIcons: false,
      hasLabel: false,
      transitionControl: null,
      transitionOff: true,
      contentHeight: '0px',
      contentWidth: '0px'
    }),
    computed: {
      tabClasses () {
        return {
          'usj-dynamic-height': this.usjDynamicHeight,
          'usj-transition-off': this.transitionOff
        }
      },
      navigationClasses () {
        return {
          'usj-has-icon': this.hasIcons,
          'usj-has-label': this.hasLabel,
          'usj-fixed': this.usjFixed,
          'usj-right': !this.usjCentered && this.usjRight,
          'usj-centered': this.usjCentered || this.usjFixed
        }
      },
      indicatorClasses () {
        // let toLeft = this.lastIndicatorNumber > this.activeTabNumber
        // this.lastIndicatorNumber = this.activeTabNumber
        // return {
        //   'usj-transition-off': this.transitionOff,
        //   'usj-to-right': !toLeft,
        //   'usj-to-left': toLeft
        // }
      }
    },
    methods: {
      getHeaderClass (header) {
        return {
          'usj-active': this.activeTab === header.id,
          'usj-disabled': header.disabled
        }
      },
      registerTab (tabData) {
        this.tabList[tabData.id] = tabData
      },
      unregisterTab (tabData) {
        delete this.tabList[tabData.id]
      },
      updateTab (tabData) {
        this.registerTab(tabData)
        if (tabData.active) {
          if (!tabData.disabled) {
            this.setActiveTab(tabData)
          } else if (Object.keys(this.tabList).length) {
            let tabsIds = Object.keys(this.tabList)
            let targetIndex = tabsIds.indexOf(tabData.id) + 1
            let target = tabsIds[targetIndex]
            if (target) {
              this.setActiveTab(this.tabList[target])
            } else {
              this.setActiveTab(this.tabList[0])
            }
          }
        }
      },
      observeElementChanges () {
        this.parentObserver = new MutationObserver(throttle(this.calculateOnWatch, 50))
        this.parentObserver.observe(this.$refs.tabContent, {
          childList: true,
          attributes: true,
          subtree: true
        })
      },
      getTabIndex (id) {
        const idList = Object.keys(this.tabList)
        return idList.indexOf(id)
      },
      calculateIndicatorPos () {
        if (this.$refs.tabHeader && this.$refs.tabHeader[this.activeTabNumber]) {
          const tabsWidth = this.$el.offsetWidth
          const activeTab = this.$refs.tabHeader[this.activeTabNumber]
          const left = activeTab.offsetLeft
          const right = tabsWidth - left - activeTab.offsetWidth
          this.$refs.indicator.style.left = left + 'px'
          this.$refs.indicator.style.right = right + 'px'
        }
      },
      calculateTabsWidthAndPosition () {
        const width = this.$el.offsetWidth
        let index = 0
        this.contentWidth = width * this.activeTabNumber + 'px'
        for (const tabId in this.tabList) {
          const tab = this.tabList[tabId]
          tab.ref.width = width + 'px'
          tab.ref.left = width * index + 'px'
          index++
        }
      },
      calculateContentHeight () {
        this.$nextTick(() => {
          if (Object.keys(this.tabList).length) {
            let height = this.tabList[this.activeTab].ref.$el.offsetHeight
            this.contentHeight = height + 'px'
          }
        })
      },
      calculatePosition () {
        window.requestAnimationFrame(() => {
          this.calculateIndicatorPos()
          this.calculateTabsWidthAndPosition()
          this.calculateContentHeight()
        })
      },
      debounceTransition () {
        window.clearTimeout(this.transitionControl)
        this.transitionControl = window.setTimeout(() => {
          this.calculatePosition()
          this.transitionOff = false
        }, 200)
      },
      calculateOnWatch () {
        this.calculatePosition()
        this.debounceTransition()
      },
      calculateOnResize () {
        this.transitionOff = true
        this.calculateOnWatch()
      },
      setActiveTab (tabData) {
        this.hasIcons = !!tabData.icon
        this.hasLabel = !!tabData.label
        this.activeTab = tabData.id
        this.activeTabNumber = this.getTabIndex(this.activeTab)
        this.calculatePosition()
        this.$emit('change', this.activeTabNumber)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.observeElementChanges()
        window.addEventListener('resize', this.calculateOnResize)
        if (Object.keys(this.tabList).length && !this.activeTab) {
          let firstTab = Object.keys(this.tabList)[0]
          this.setActiveTab(this.tabList[firstTab])
        }
      })
    },
    beforeDestroy () {
      if (this.parentObserver) {
        this.parentObserver.disconnect()
      }
      window.removeEventListener('resize', this.calculateOnResize)
    }
  }
</script>
