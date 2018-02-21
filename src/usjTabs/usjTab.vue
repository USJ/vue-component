<template>
  <div class="usj-tab" :id="tabId" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import uniqueId from '../../core/utils/uniqueId'
  import getClosestVueParent from '../../core/utils/getClosestVueParent'
  export default {
    props: {
      id: [String, Number],
      usjLabel: [String, Number],
      usjIcon: String,
      usjActive: Boolean,
      usjDisabled: Boolean,
      usjTooltip: String,
      usjTooltipDelay: {
        type: String,
        default: '0'
      },
      usjTooltipDirection: {
        type: String,
        default: 'bottom'
      }
    },
    data () {
      return {
        mounted: false,
        tabId: this.id || 'tab-' + uniqueId(),
        width: '0px',
        left: '0px'
      }
    },
    watch: {
      usjActive () {
        this.updateTabData()
      },
      usjDisabled () {
        this.updateTabData()
      },
      usjIcon () {
        this.updateTabData()
      },
      usjLabel () {
        this.updateTabData()
      },
      usjTooltip () {
        this.updateTabData()
      },
      usjTooltipDelay () {
        this.updateTabData()
      },
      usjTooltipDirection () {
        this.updateTabData()
      }
    },
    computed: {
      styles () {
        return {
          width: this.width,
          left: this.left
        }
      }
    },
    methods: {
      getTabData () {
        return {
          id: this.tabId,
          label: this.usjLabel,
          icon: this.usjIcon,
          active: this.usjActive,
          disabled: this.usjDisabled,
          tooltip: this.usjTooltip,
          tooltipDelay: this.usjTooltipDelay,
          tooltipDirection: this.usjTooltipDirection,
          ref: this
        }
      },
      updateTabData () {
        this.parentTabs.updateTab(this.getTabData())
      }
    },
    mounted () {
      let tabData = this.getTabData()
      this.parentTabs = getClosestVueParent(this.$parent, 'usj-tabs')
      if (!this.parentTabs) {
        throw new Error('You must wrap the usj-tab in a usj-tabs')
      }
      this.mounted = true
      this.parentTabs.updateTab(tabData)
      if (this.usjActive) {
        this.parentTabs.setActiveTab(tabData)
      }
    },
    beforeDestroy () {
      this.parentTabs.unregisterTab(this.getTabData())
    }
  }
</script>
