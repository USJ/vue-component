<template>
  <input
    type="text"
    :id="id"
    :class="inputClass"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    v-model="mutableValue"
    @focus="onFocus"
    @blur="onBlur"
    :disabled="disabled"
    data-input
  >
</template>

<script>
try {
  var flatpickr = require("flatpickr").default;
} catch (er) {
  flatpickr = null;
}

// import flatpickr from 'flatpickr'
import getClosestVueParent from "../../core/utils/getClosestVueParent";
import common from "../usjInputContainer/common";

export default {
  mixins: [common],
  props: {
    value: {
      default: null,
      required: true,
      validate(value) {
        return (
          value === null ||
          value instanceof Date ||
          typeof value === "string" ||
          value instanceof String ||
          value instanceof Array
        );
      }
    },
    // https://chmln.github.io/flatpickr/options/
    config: {
      type: Object,
      default: () => ({
        wrap: false
      })
    },
    placeholder: {
      type: String,
      default: ""
    },
    inputClass: {
      type: [String, Object],
      default: "form-control input"
    },
    name: {
      type: String,
      default: "date-time"
    },
    required: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    asDate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutableValue: this.value,
      fp: null
    };
  },
  methods: {
    handleChange(val) {
      let value;

      if (!this.config.mode || this.config.mode === "single") {
        value = this.fp.selectedDates[0];
      } else {
        value = this.fp.selectedDates;
      }

      this.updateValues(value);
      this.$emit("change", value);
      this.$emit("input", value);
    }
  },
  mounted() {
    if (!flatpickr) {
      throw "'flatpickr' is required for usjDatetimePicker component";
    }

    // Load flatPickr if not loaded yet
    if (!this.fp) {
      this.config.onChange = this.handleChange;
      // Bind on parent element if wrap is true
      let elem = this.config.wrap ? this.$el.parentNode : this.$el;
      this.fp = flatpickr(elem, this.config);
    }

    this.$nextTick(() => {
      this.parentContainer = getClosestVueParent(
        this.$parent,
        "usj-input-container"
      );
      if (!this.parentContainer) {
        this.$destroy();
        throw new Error(
          "You should wrap the usj-input in a usj-input-container"
        );
      }
      this.setParentDisabled();
      this.setParentRequired();
      this.setParentPlaceholder();
      this.handleMaxLength();
      this.updateValues(this.value);
    });
  },
  beforeDestroy() {
    // Free up memory
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }
  },
  watch: {
    /**
     * Watch for any config changes and redraw date-picker
     *
     * @param newConfig Object
     */
    config(newConfig) {
      this.fp.config = Object.assign(this.fp.config, newConfig);
      this.fp.redraw();
      this.fp.setDate(this.value, true);
    },
    /**
     * Watch for value changed by date-picker itself and notify parent component
     *
     * @param newValue
     */
    mutableValue(newValue) {
      if (this.asDate) {
        this.$emit("input", this.fp.selectedDates[0]);
      } else {
        this.$emit("input", newValue);
      }
    },
    // /**
    //  * Watch for changes from parent component and update DOM
    //  *
    //  * @param newValue
    //  */
    value(newValue) {
      this.fp && this.fp.setDate(newValue, false);
    }
  }
};
</script>

