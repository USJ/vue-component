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

<style lang="scss">
  @import '../../style/variables.scss';
  @import '../../style/variables.css';

  $radio-size: 20px;
  $radio-touch-size: 48px;

  .usj-radio {
    width: auto;
    margin: 16px 8px 16px 0;
    display: inline-flex;
    position: relative;

    &.usj-disabled{
      color: var(--gray6);
    }

    &.usj-checked.usj-disabled{
      .usj-radio-container {
        border-color: var(--gray6);
      }

      .usj-radio-container:after {
        background: var(--gray6);
      }
    }

    &.usj-disabled {
      .usj-radio-container {
        border-color: var(--gray6);
      }
    }

    &:not(.usj-disabled) {
      cursor: pointer;

      .usj-radio-label {
        cursor: pointer;
      }
    }

    .usj-radio-container {
      width: $radio-size;
      height: $radio-size;
      position: relative;
      border-radius: 50%;
      border: 2px solid rgba(#000, 0.54);
      transition: $swift-ease-out;

      &:before {
        width: $radio-touch-size;
        height: $radio-touch-size;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: $swift-ease-in;
        content: ' ';
      }

      &:after {
        background: $usj-theme-orange;
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        border-radius: 50%;
        opacity: 0;
        transform: scale3D(0.38, 0.38, 1);
        transition: $swift-ease-in;
        content: ' ';
      }

      input {
        position: absolute;
        left: -999em;
      }
    }

    .usj-radio-label {
      height: $radio-size;
      padding-left: 8px;
      line-height: $radio-size;
    }
  }

  .usj-radio.usj-checked {
    .usj-radio-container {
      border-color: $usj-theme-orange;

      &:after {
        opacity: 1;
        transform: scale3D(1, 1, 1);
        transition: $swift-ease-out;
      }
    }

  }
</style>

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
    classes() {
      return {
        'usj-checked':
          typeof this.value !== 'undefined' &&
          this.value !== null &&
          this.usjValue.toString() === this.value.toString(),
        'usj-disabled': this.disabled
      }
    }
  },
  methods: {
    toggleCheck($event) {
      if (!this.disabled) {
        this.$emit('input', this.usjValue, $event)
        this.$emit('change', this.usjValue, $event)
      }
    }
  }
}
</script>
