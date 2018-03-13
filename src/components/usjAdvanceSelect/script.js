import debounce from '../../core/utils/debounce'
import getClosestVueParent from '../../core/utils/getClosestVueParent.js'

import common from '../usjInputContainer/common'

let vm

const usjAdvanceSelect = {
  mixins: [common],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select an item...'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    emitOnly: { // emit select event only (not update v-model), applicable only to single select
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    fetchFunction: {
      type: Function
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    value: null,
    id: String,
    name: String
  },
  data() {
    return {
      searchValue: '',
      singleItem: {},
      multipleItems: [],
      highlightIdx: -1,
      showValueEl: true,
      showMenuEl: true,
      showPlaceholderEl: true,
      menuItems: [],
      loading: false
    }
  },
  watch: {
    multipleItems(newVal) {
      console.debug('Multiple Items ', newVal)
    },
    singleItem(newVal) {
      console.debug('Single Items ', newVal)
    },
    value(val) {
      if (val) {
        this.updateLocalValue()
      }
    },
    options(val) {
      this.menuItems = val
    }
  },
  computed: {
    rootClasses() {
      return {
        'is-disabled': this.disabled,
        'is-multiple': this.multiple,
        'is-searchable': this.searchable
      }
    },
    hasSelected() {
      if (this.multiple) {
        return this.multipleItems.length > 0
      }

      return Object.keys(this.singleItem).length > 0
    },
    hasDefaultSlot() {
      return !!this.$scopedSlots.default
    },
    singleLabel() {
      if (this.multiple) {
        return
      }

      if (this.options.length > 0) {
        const item = this.options.filter(
          option => option.value === this.singleItem
        )[0]

        if (!item) {
          return
        }

        return item.label
      }

      return this.singleItem
    },
    hasOptions() {
      return this.options.length > 0
    }
  },
  methods: {
    clear(e) {
      this.doSelectItem(this.multiple ? [] : {})

      this.togglePlaceholderEl(true)
    },
    getLabel(value) {
      if (this.hasOptions) {
        return this.options.filter(option => option.value === value)[0].label
      }
    },

    handleMenuItemMouseOver(item, index) {
      this.highlightIdx = index
    },
    handleMenuItemClick(item) {
      this.doSelectItem(item)
    },
    doSelectItem(item) {
      const value = this.isOptionObject(item) ? item.value : item

      if (this.emitOnly) {
        this.$emit('select', value)
        this.toggleMenuEl(false)
        this.toggleValueEl(false)
        this.togglePlaceholderEl(true)
        return
      }

      if (this.multiple) {
        this.addItem(value)
      } else {
        this.singleItem = value
      }

      this.searchValue = ''
      this.toggleValueEl(true)
      this.toggleMenuEl(false)
      this.togglePlaceholderEl(false)

      this.updateValue(this.getUpdateValue())
    },
    addItem(newItem) {
      const hasDuplicate = this.multipleItems.some(item => {
        return newItem === item
      })

      console.debug(hasDuplicate)

      if (!hasDuplicate) {
        this.multipleItems.push(newItem)
      }
    },
    removeItem(item, index) {
      this.multipleItems.splice(index, 1)
      console.debug(this.getUpdateValue())
      this.updateValue(this.getUpdateValue())
    },
    handleInputBlur() {
      this.searchValue = ''
      this.toggleValueEl(true)
      this.toggleMenuEl(false)

      // when nothing is selected, put back placeholder
      if (!this.singleItem) {
        this.togglePlaceholderEl(true)
      }
    },
    handleInputInput(e) {
      if (this.searchValue) {
        if (!this.multiple) {
          this.toggleValueEl(false)
        }
        this.togglePlaceholderEl(false)
      }

      if (this.options.length > 0 && this.searchValue) {
        this.menuItems = this.options.filter(
          item =>
            JSON.stringify(item)
              .toLowerCase()
              .indexOf(this.searchValue.toLowerCase()) > -1
        )
      }

      if (this.fetchFunction && this.searchValue) {
        this.fetchMenuItems()
      }
    },

    fetchMenuItems: debounce(function() {
      vm.loading = true
      vm.fetchFunction(vm.searchValue).then(data => {
        console.debug('Fetch function ', data)
        vm.menuItems = data
        vm.loading = false
      })
    }, 1000),

    handleInputFocus(e) {
      this.toggleMenuEl(true)
      this.togglePlaceholderEl(false)
    },

    handleControlClick(e) {
      if (this.disabled) {
        return
      }

      if (this.searchable) {
        this.$refs['input'].focus()
      } else {
        this.toggleMenuEl(true)
        this.togglePlaceholderEl(false)
      }
    },
    toggleMenuEl(show) {
      this.showMenuEl = show
    },
    toggleValueEl(show) {
      this.showValueEl = show
    },
    togglePlaceholderEl(show) {
      this.showPlaceholderEl = show
    },
    handleUpKey() {
      let idx = this.highlightIdx - 1

      if (this.highlightIdx < 0 || idx < 0) {
        this.highlightIdx = this.menuItems.length - 1
      } else {
        this.highlightIdx = idx
      }
    },
    handleDownKey() {
      let idx = this.highlightIdx + 1
      let length = this.menuItems.length

      if (this.highlightIdx > length || idx > length) {
        this.highlightIdx = 0
      } else {
        this.highlightIdx = idx
      }
    },
    handleEnterKey() {
      this.doSelectItem(this.menuItems[this.highlightIdx])
    },
    updateLocalValue() {
      // handle multiple
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          console.error(
            `v-model has to be Array for multiple, ${typeof this.value} given`
          )
        }

        this.value.forEach(item => this.addItem(item))
      } else {
        if (this.options.length > 0) {
          this.doSelectItem(
            this.menuItems.filter(item => item.value === this.value)[0]
          )
        }

        if (this.fetchFunction) {
          if (!this.value instanceof Object) {
            console.error(
              'fetchFunction cannot be used without `v-model` as object'
            )
          }

          this.doSelectItem(this.value)
        }
      }
    },
    getUpdateValue() {
      if (this.multiple) {
        return this.multipleItems
      }

      return this.isOptionObject(this.singleItem)
        ? this.singleItem.value
        : this.singleItem
    },
    updateValue(value) {
      this.$emit('input', value)

      this.togglePlaceholderEl(!this.hasSelected)
    },
    isOptionObject(object) {
      return object.hasOwnProperty('label') && object.hasOwnProperty('value')
    }
  },
  mounted() {
    console.log('Mounted v-advs')

    if (this.options) {
      this.menuItems = this.options
    }

    if (this.value && Object.keys(this.value).length > 0) {
      this.updateLocalValue()
    }

    this.togglePlaceholderEl(!this.hasSelected)
    this.toggleMenuEl(false)

    this.$nextTick(() => {
      this.parentContainer = getClosestVueParent(this.$parent, 'usj-input-container')

      if (!this.parentContainer) {
        this.$destroy()

        throw new Error('You should wrap the usj-advance-select in a usj-input-container')
      }

      this.setParentDisabled()
      this.setParentRequired()
      this.setParentPlaceholder()
      this.handleMaxLength()
      this.updateValues()
    })

    // this.$nextTick(() => {
    //   inputContainerCmp = getClosestVueParent(this.$parent, 'usj-input-container')

    // })

    vm = this
  }
}

export default usjAdvanceSelect
