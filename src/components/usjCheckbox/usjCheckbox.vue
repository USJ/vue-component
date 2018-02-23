<template>
  <div class="usj-checkbox" :class="[classes]">
    <div class="usj-checkbox-container" @click.stop="toggleCheck" tabindex="0">
      <input type="checkbox" :name="name" :id="id" :disabled="disabled" :value="value" :checked="checked" tabindex="-1">
      <!--<usj-ink-ripple :usj-disabled="disabled" />-->
    </div>

    <label :for="id || name" class="usj-checkbox-label" v-if="$slots.default" @click.prevent="toggleCheck">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="postcss" src="./usjCheckbox.css">

</style>

<script>
export default {
  name: 'usj-checkbox',
  props: {
    name: String,
    value: [String, Boolean, Array],
    id: String,
    disabled: Boolean,
    usjValue: [String]
  },
  data() {
    return {
      checked: this.value || false
    }
  },
  computed: {
    classes() {
      return {
        'usj-checked': this.isArray()
          ? this.value.indexOf(this.usjValue) >= 0
          : this.checked,
        'usj-disabled': this.disabled
      }
    }
  },
  watch: {
    value() {
      if (!this.isArray()) {
        this.checked = !!this.value
      }
    }
  },
  methods: {
    toggleCheck($event) {
      if (!this.disabled) {
        if (this.isArray()) {
          let index = this.value.indexOf(this.usjValue)

          if (index >= 0) {
            this.value.splice(index, 1)
          } else {
            this.value.push(this.usjValue)
          }
          this.$emit('change', this.value, $event)
          this.$emit('input', this.value, $event)
        } else {
          this.checked = !this.checked
          this.$emit('change', this.checked, $event)
          this.$emit('input', this.checked, $event)
        }
      }
    },
    isArray() {
      return Array.isArray(this.value)
    }
  }
}
</script>
