<template>
  <div class="usj-input-container" :class="[classes]">
    <slot></slot>

    <span class="usj-count" v-if="enableCounter">{{ inputLength }} / {{ counterLength }}</span>

    <usj-button class="usj-icon-button usj-toggle-password" @click.native="togglePasswordType" v-if="usjHasPassword">
      <usj-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</usj-icon>
    </usj-button>
  </div>
</template>

<style lang="scss" src="./usjInputContainer.scss"></style>

<script>
  import isArray from '../../core/utils/isArray'

  export default {
    props: {
      usjInline: Boolean,
      usjHasPassword: Boolean,
      usjInvalid: Boolean
    },
    data () {
      return {
        value: '',
        input: false,
        showPassword: false,
        enableCounter: false,
        hasSelect: false,
        hasPlaceholder: false,
        hasFile: false,
        isDisabled: false,
        isRequired: false,
        isFocused: false,
        counterLength: 0,
        inputLength: 0
      }
    },
    computed: {
      hasValue () {
        if (isArray(this.value)) {
          return this.value.length > 0
        }

        return Boolean(this.value)
      },
      classes () {
        return {
          'usj-input-inline': this.usjInline,
          'usj-has-password': this.usjHasPassword,
          'usj-has-select': this.hasSelect,
          'usj-has-file': this.hasFile,
          'usj-has-value': this.hasValue,
          'usj-input-placeholder': this.hasPlaceholder,
          'usj-input-disabled': this.isDisabled,
          'usj-input-required': this.isRequired,
          'usj-input-focused': this.isFocused,
          'usj-input-invalid': this.usjInvalid
        }
      }
    },
    methods: {
      isInput () {
        return this.input && this.input.tagName.toLowerCase() === 'input'
      },
      togglePasswordType () {
        if (this.isInput()) {
          if (this.input.type === 'password') {
            this.input.type = 'text'
            this.showPassword = true
          } else {
            this.input.type = 'password'
            this.showPassword = false
          }

          this.input.focus()
        }
      },
      setValue (value) {
        this.value = value
      }
    },
    mounted () {
      this.input = this.$el.querySelectorAll('input, textarea, select, .usj-file')[0]

      if (!this.input) {
        this.$destroy()

        throw new Error('Missing input/select/textarea inside usj-input-container')
      }
    }
  }
</script>
