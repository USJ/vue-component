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

<style lang="postcss">
  @import '../../style/variables.css';

  :root {
    --checkbox-size: 20;
    --checkbox-touch-size: 48px;
  }

  .usj-checkbox {
    width: auto;
    margin: 16px 8px 16px 0;
    display: inline-flex;
    position: relative;

    &:not(.usj-disabled) {
      cursor: pointer;

      .usj-checkbox-label {
        cursor: pointer;
      }
    }

    .usj-checkbox-container {
      width: var(--checkbox-size);
      min-width: var(--checkbox-size);
      height: var(--checkbox-size);
      position: relative;
      border-radius: 2px;
      border: 2px solid rgba(#000, 0.54);
      transition: var(--swift-ease-out);

      &:focus {
        outline: none;
      }

      &:before {
        width: var(--checkbox-touch-size);
        height: var(--checkbox-touch-size);
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: var(--swift-ease-in);
        content: ' ';
      }

      &:after {
        width: 6px;
        height: 13px;
        position: absolute;
        top: 0;
        left: 5px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        opacity: 0;
        transform: rotate(45deg) scale3D(0.15, 0.15, 1);
        transition: var(--swift-ease-in);
        content: ' ';
      }

      input {
        position: absolute;
        left: -999em;
      }

      .usj-ink-ripple {
        top: -16px;
        right: -16px;
        bottom: -16px;
        left: -16px;
        border-radius: 50%;
        color: rgba(#000, 0.54);

        .usj-ripple {
          width: var(--checkbox-touch-size) !important;
          height: var(--checkbox-touch-size) !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
        }
      }
    }

    .usj-checkbox-label {
    //height: $checkbox-size;
      padding-left: 8px;
      line-height: var(--checkbox-size);
    }
  }

  .usj-checkbox.usj-checked {
    .usj-checkbox-container {
      border: 2px solid $usj-theme-orange;
      background: $usj-theme-orange;

      &:after {
        opacity: 1;
        transform: rotate(45deg) scale3D(1, 1, 1);
        transition: $swift-ease-out;
      }
    }
  }
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
