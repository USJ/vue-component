<template>
  <div class="usj-select" :class="[classes]">
    <usj-menu :usj-close-on-select="!multiple" @opened="$emit('open')" @closed="$emit('close')">
      <span class="usj-select-value" usj-menu-trigger ref="value">{{ selectedText || placeholder }}</span>

      <usj-menu-content class="usj-select-content" :class="[contentClasses]">
        <slot></slot>
      </usj-menu-content>
    </usj-menu>

    <select :name="name" :id="id" :required="required" :disabled="disabled" tabindex="-1">
      <option selected="true" :value="selectedValue" v-if="!multiple">{{ selectedText }}</option>
      <option selected="true" v-for="option in multipleOptions" v-if="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<style lang="scss">
@import '../../style/variables.scss';
@import '../../style/elevation.scss';

$select-height: 32px;

.usj-select {
  width: 100%;
  min-width: 128px;
  height: $select-height;
  position: relative;

  &:focus {
    outline: none;
  }

  &:after {
    margin-top: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) scaleY(0.45) scaleX(0.85);
    transition: $swift-linear;
    content: '\25BC';
  }

  &.usj-active {
    .usj-select-menu {
      top: -8px;
      pointer-events: auto;
      opacity: 1;
      transform: translateY(-8px) scale3D(1, 1, 1);
      transform-origin: center top;
      transition: $swift-ease-out;
      transition-duration: 0.25s;
      transition-property: opacity, transform, top;

      > * {
        opacity: 1;
        transition: $swift-ease-in;
        transition-duration: 0.15s;
        transition-delay: 0.1s;
      }
    }
  }

  &.usj-disabled {
    pointer-events: none;
    user-select: none;
    user-drag: none;
  }

  select {
    position: absolute;
    left: -999em;
  }

  .usj-menu {
    width: 100%;
    height: $select-height;
    display: block;
    position: relative;
  }

  .usj-select-value {
    width: 100%;
    height: $select-height;
    padding-right: 24px;
    display: block;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    z-index: 2;
    font-size: 16px;
    line-height: $select-height + 1px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .usj-subheader {
    color: rgba(#757575, 0.87);
    text-transform: uppercase;

    &:first-child {
      margin-top: -8px;
    }
  }
}

.usj-select-content {
  width: auto;
  max-height: 256px;

  &.usj-direction-bottom-right {
    margin-top: -15px;
    margin-left: -16px;
  }

  .usj-menu-item .usj-list-item-holder {
    overflow: visible;
    justify-content: flex-start;
  }

  &.usj-multiple {
    .usj-checkbox {
      margin: 0;
    }

    .usj-checkbox-label {
      padding-left: 16px;
      cursor: pointer;
    }
  }
}
</style>

<script>
import getClosestVueParent from '../../core/utils/getClosestVueParent'
import isArray from '../../core/utils/isArray'
export default {
  props: {
    name: String,
    id: String,
    required: Boolean,
    multiple: Boolean,
    value: [String, Number, Array],
    disabled: Boolean,
    placeholder: String,
    usjMenuClass: String
  },
  data() {
    return {
      selectedValue: null,
      selectedText: null,
      multipleOptions: {},
      options: {},
      optionsAmount: 0
    }
  },
  computed: {
    classes() {
      return {
        'usj-disabled': this.disabled
      }
    },
    contentClasses() {
      if (this.multiple) {
        return 'usj-multiple ' + this.usjMenuClass
      }
      return this.usjMenuClass
    }
  },
  watch: {
    value(value) {
      this.setTextAndValue(value)
    },
    disabled() {
      this.setParentDisabled()
    },
    required() {
      this.setParentRequired()
    },
    placeholder() {
      this.setParentPlaceholder()
    }
  },
  methods: {
    setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled
    },
    setParentRequired() {
      this.parentContainer.isRequired = this.required
    },
    setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder
    },
    getSingleValue(value) {
      let output = {}
      Object.keys(this.options).forEach(index => {
        const options = this.options[index]
        if (options.value === value) {
          output.value = value
          output.text = options.$refs.item.textContent
        }
      })
      return output
    },
    getMultipleValue(modelValue) {
      if (isArray(this.value)) {
        let outputText = []
        modelValue.forEach(value => {
          Object.keys(this.options).forEach(index => {
            const options = this.options[index]
            if (options.value === value) {
              let text = options.$refs.item.textContent
              this.multipleOptions[index] = {
                value,
                text
              }
              outputText.push(text)
            }
          })
        })
        return {
          value: modelValue,
          text: outputText.join(', ')
        }
      }
      return {}
    },
    setTextAndValue(modelValue) {
      const output = this.multiple
        ? this.getMultipleValue(modelValue)
        : this.getSingleValue(modelValue)
      this.selectedValue = output.value
      this.selectedText = output.text
      if (this.parentContainer) {
        this.parentContainer.setValue(this.selectedText)
      }
    },
    changeValue(value) {
      this.$emit('input', value)
      this.$emit('change', value)
      this.$emit('selected', value)
    },
    selectMultiple(index, value, text) {
      let values = []
      this.multipleOptions[index] = {
        value,
        text
      }
      for (var key in this.multipleOptions) {
        if (
          this.multipleOptions.hasOwnProperty(key) &&
          this.multipleOptions[key].value
        ) {
          values.push(this.multipleOptions[key].value)
        }
      }
      this.changeValue(values)
    },
    selectOption(value, text) {
      this.selectedText = text
      this.setTextAndValue(value)
      this.changeValue(value)
    }
  },
  mounted() {
    this.parentContainer = getClosestVueParent(
      this.$parent,
      'usj-input-container'
    )
    if (this.parentContainer) {
      this.setParentDisabled()
      this.setParentRequired()
      this.setParentPlaceholder()
      this.parentContainer.hasSelect = true
    }
    this.setTextAndValue(this.value)
  },
  beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.setValue('')
      this.parentContainer.hasSelect = false
    }
  }
}
</script>
