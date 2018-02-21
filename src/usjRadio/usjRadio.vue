<template>
  <div class="usj-radio" :class="[classes]">
    <div class="usj-radio-container" @click.stop="toggleCheck">
      <input type="radio" :name="name" :id="id" :disabled="disabled" :value="value">
    </div>

    <label :for="id || name" class="usj-radio-label" v-if="$slots.default" @click="toggleCheck">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="postcss" src="./usjRadio.css"></style>

<script>
  export default {
    name: 'usj-radio',
    props: {
      name: String,
      id: String,
      value: [String, Boolean, Number],
      usjValue: {
        type: [String, Boolean, Number],
        required: true
      },
      disabled: Boolean
    },
    computed: {
      classes () {
        return {
          'usj-checked': typeof this.value !== 'undefined' && this.value !== null && this.usjValue.toString() === this.value.toString(),
          'usj-disabled': this.disabled
        }
      }
    },
    methods: {
      toggleCheck ($event) {
        if (!this.disabled) {
          this.$emit('input', this.usjValue, $event)
          this.$emit('change', this.usjValue, $event)
        }
      }
    }
  }
</script>
