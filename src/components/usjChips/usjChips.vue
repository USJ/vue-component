<template>
  <usj-input-container class="usj-chips" :class="[themeClass, classes]" @click="applyInputFocus">
    <usj-chip
      v-for="chip in selectedChips"
      :key="chip"
      :usj-editable="!usjStatic"
      :usj-deletable="!usjStatic"
      :disabled="disabled"
      @edit="editChip(chip)"
      @delete="deleteChip(chip)">
      <slot name="chip" :value="chip">{{ chip }}</slot>
    </usj-chip>

    <usj-input
      v-show="!usjStatic"
      v-model="currentChip"
      :type="usjInputType"
      :placeholder="usjInputPlaceholder"
      :id="inputId"
      :name="usjInputName"
      :disabled="disabled"
      @keydown.native.delete="deleteLastChip"
      @keydown.native.prevent.enter="addChip"
      @keydown.native.prevent.186="addChip"
      tabindex="0"
      :debounce="0"
      ref="input">
    </usj-input>

    <slot></slot>
  </usj-input-container>
</template>

<style lang="postcss">
  @import '../../style/variables.css';

  :root {
    --color-background-default: var(--usj-theme-grey);

    --chip-height: 32px;
    --chip-icon-size: 24px;
    --chip-icon-font: var(--chip-icon-size) - 4px;
  }

  .usj-chip {
    height: var(--chip-height);
    padding: 8px 12px;
    display: inline-block;
    border-radius: var(--chip-height);
    transition: var(--swift-ease-out);
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;

    background-color: var(--color-background-default);
    color: var(--color-text-invered);

    &.usj-deletable {
      position: relative;
      padding-right: 32px;
    }

    &.usj-editable {
      .usj-chip-container {
        cursor: pointer;
      }
    }

    &:focus,
    &:active {
      outline: none;

      &:not(.usj-disabled) {
        cursor: pointer;
        box-shadow: var(--box-shadow-elevate-2);
      }
    }

    &.usj-disabled {
      .usj-button {
        pointer-events: none;
        cursor: default;
      }
    }

    .usj-button.usj-delete {
      width: var(--chip-icon-size);
      min-width: var(--chip-icon-size);
      height: var(--chip-icon-size);
      min-height: var(--chip-icon-size);
      margin: 0;
      padding: 0;
      position: absolute;
      top: 4px;
      right: 4px;
      border-radius: var(--chip-icon-size);
      transition: var(--swift-ease-out);

      .usj-icon {
        width: var(--chip-icon-font);
        min-width: var(--chip-icon-font);
        height: var(--chip-icon-font);
        min-height: var(--chip-icon-font);
        margin: 0;
        font-size: var(--chip-icon-font);
      }

      .usj-ink-ripple {
        border-radius: var(--chip-height);
      }

      .usj-ripple {
        opacity: 0.54;
      }
    }
  }

  .usj-chips {
    min-height: 54px;
    display: flex;
    flex-wrap: wrap;

    .usj-chip {
      margin-right: 8px;
      margin-bottom: 4px;
    }

    .usj-input {
      width: 128px;
      flex: 1;
    }
  }
</style>

<script>
import uniqueId from '../../core/utils/uniqueId'
export default {
  name: 'usj-chips',
  props: {
    value: Array,
    disabled: Boolean,
    debounce: {
      type: Number,
      default: 1e2
    },
    usjInputId: String,
    usjInputName: String,
    usjInputPlaceholder: String,
    usjInputType: {
      type: String,
      default: 'text'
    },
    usjStatic: Boolean,
    usjMax: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      currentChip: null,
      selectedChips: this.value,
      inputId: this.usjInputId || 'chips-' + uniqueId()
    }
  },
  watch: {
    value(value) {
      this.selectedChips = value
    }
  },
  computed: {
    classes() {
      return {
        'usj-static': this.usjStatic,
        'usj-disabled': this.disabled,
        'usj-chips': true
      }
    }
  },
  methods: {
    applyInputFocus() {
      this.$nextTick(() => {
        this.$refs.input.$el.focus()
      })
    },
    addChip() {
      if (this.currentChip && this.selectedChips.length < this.usjMax) {
        const value = this.currentChip.trim()
        if (this.selectedChips.indexOf(value) < 0) {
          this.selectedChips.push(value)
          this.currentChip = null
          this.$emit('input', this.selectedChips)
          this.$emit('change', this.selectedChips)
          this.applyInputFocus()
        }
      }
    },
    deleteChip(chip) {
      let index = this.selectedChips.indexOf(chip)
      if (index >= 0) {
        this.selectedChips.splice(index, 1)
      }
      this.$emit('change', this.selectedChips)
      this.applyInputFocus()
    },
    editChip(chip) {
      let index = this.selectedChips.indexOf(chip)
      if (index >= 0) {
        this.selectedChips.splice(index, 1)
      }
      this.currentChip = chip
      this.$emit('change', this.selectedChips)
      this.applyInputFocus()
    },
    deleteLastChip() {
      if (!this.currentChip) {
        this.selectedChips.pop()
        this.$emit('change', this.selectedChips)
        this.applyInputFocus()
      }
    }
  }
}
</script>
