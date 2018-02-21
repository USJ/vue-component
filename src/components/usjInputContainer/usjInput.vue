<template>
  <input
    class="usj-input"
    :type="type"
    :value="value"
    :disabled="disabled"
    :required="required"
    :placeholder="placeholder"
    :maxlength="maxlength"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @keydown.up="onInput"
    @keydown.down="onInput">
</template>

<script>
  import common from './common'
  import getClosestVueParent from '../../core/utils/getClosestVueParent'

  export default {
    mixins: [common],
    props: {
      type: {
        type: String,
        default: 'text'
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.parentContainer = getClosestVueParent(this.$parent, 'usj-input-container')

        if (!this.parentContainer) {
          this.$destroy()

          throw new Error('You should wrap the usj-input in a usj-input-container')
        }

        this.setParentDisabled()
        this.setParentRequired()
        this.setParentPlaceholder()
        this.handleMaxLength()
        this.updateValues()
      })
    }
  }
</script>
