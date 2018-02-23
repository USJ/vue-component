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

<style lang="postcss" src="./usjChips.css">

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
