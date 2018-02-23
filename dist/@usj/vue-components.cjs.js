'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkbox = require('@material/checkbox');

var _this = undefined;

var debounce = function (callback, wait) {
  var timeout;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    window.clearTimeout(timeout);
    timeout = window.setTimeout(function () {
      timeout = null;
      callback.apply(_this, args);
    }, wait);
  };
};

var usjAdvanceSelect = {
  props: {
    options: {
      type: Array,
      default: function () { return []; }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select an item...'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    fetchFunction: {
      type: Function
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: null,
    id: String,
    name: String
  },
  data: function data() {
    return {
      searchValue: '',
      singleItem: {},
      multipleItems: [],
      highlightIdx: -1,
      showValueEl: true,
      showMenuEl: true,
      showPlaceholderEl: true,
      menuItems: [],
      loading: false
    };
  },
  watch: {
    multipleItems: function multipleItems(newVal) {
      console.debug('Multiple Items ', newVal);
    },
    singleItem: function singleItem(newVal) {
      console.debug('Single Items ', newVal);
    },
    value: function value(val) {
      if (val) {
        this.updateLocalValue();
      }
    },
    options: function options(val) {
      this.menuItems = val;
    }
  },
  computed: {
    rootClasses: function rootClasses() {
      return {
        'is-disabled': this.disabled,
        'is-multiple': this.multiple,
        'is-searchable': this.searchable
      };
    },
    hasSelected: function hasSelected() {
      if (this.multiple) {
        return this.multipleItems.length > 0;
      }

      return this.singleItem !== {};
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },
    singleLabel: function singleLabel() {
      var this$1 = this;

      if (this.multiple) {
        return;
      }

      if (this.options.length > 0) {
        var item = this.options.filter(function (option) { return option.value === this$1.singleItem; })[0];

        if (!item) {
          return;
        }

        return item.label;
      }

      return this.singleItem;
    },
    hasOptions: function hasOptions() {
      return this.options.length > 0;
    }
  },
  methods: {
    clear: function clear(e) {
      this.doSelectItem(this.multiple ? [] : {});

      this.togglePlaceholderEl(true);
    },
    getLabel: function getLabel(value) {
      if (this.hasOptions) {
        return this.options.filter(function (option) { return option.value === value; })[0].label;
      }
    },

    handleMenuItemMouseOver: function handleMenuItemMouseOver(item, index) {
      this.highlightIdx = index;
    },
    handleMenuItemClick: function handleMenuItemClick(item) {
      this.doSelectItem(item);
    },
    doSelectItem: function doSelectItem(item) {
      var value = this.isOptionObject(item) ? item.value : item;

      if (this.multiple) {
        this.addItem(value);
      } else {
        this.singleItem = value;
      }

      this.searchValue = '';
      this.toggleValueEl(true);
      this.toggleMenuEl(false);
      this.togglePlaceholderEl(false);

      this.updateValue(this.getUpdateValue());
    },
    addItem: function addItem(newItem) {
      var hasDuplicate = this.multipleItems.some(function (item) {
        return newItem === item;
      });

      console.debug(hasDuplicate);

      if (!hasDuplicate) {
        this.multipleItems.push(newItem);
      }
    },
    removeItem: function removeItem(item, index) {
      this.multipleItems.splice(index, 1);
      console.debug(this.getUpdateValue());
      this.updateValue(this.getUpdateValue());
    },
    handleInputBlur: function handleInputBlur() {
      this.searchValue = '';
      this.toggleValueEl(true);
      this.toggleMenuEl(false);

      // when nothing is selected, put back placeholder
      if (!this.singleItem) {
        this.togglePlaceholderEl(true);
      }
    },
    handleInputInput: function handleInputInput(e) {
      var this$1 = this;

      if (this.searchValue) {
        if (!this.multiple) {
          this.toggleValueEl(false);
        }
        this.togglePlaceholderEl(false);
      }

      if (this.options.length > 0 && this.searchValue) {
        this.menuItems = this.options.filter(function (item) { return JSON.stringify(item).toLowerCase().indexOf(this$1.searchValue.toLowerCase()) > -1; });
      }

      if (this.fetchFunction && this.searchValue) {
        this.fetchMenuItems();
      }
    },

    fetchMenuItems: debounce(function () {
      var this$1 = this;

      this.loading = true;
      this.fetchFunction(this.searchValue).then(function (data) {
        console.debug('Fetch function ', data);
        this$1.menuItems = data;
        this$1.loading = false;
      });
    }, 1000),

    handleInputFocus: function handleInputFocus(e) {
      this.toggleMenuEl(true);
      this.togglePlaceholderEl(false);
    },

    handleControlClick: function handleControlClick(e) {
      if (this.disabled) {
        return;
      }

      if (this.searchable) {
        this.$refs['input'].focus();
      } else {
        this.toggleMenuEl(true);
        this.togglePlaceholderEl(false);
      }
    },
    toggleMenuEl: function toggleMenuEl(show) {
      this.showMenuEl = show;
    },
    toggleValueEl: function toggleValueEl(show) {
      this.showValueEl = show;
    },
    togglePlaceholderEl: function togglePlaceholderEl(show) {
      this.showPlaceholderEl = show;
    },
    handleUpKey: function handleUpKey() {
      var idx = this.highlightIdx - 1;

      if (this.highlightIdx < 0 || idx < 0) {
        this.highlightIdx = this.menuItems.length - 1;
      } else {
        this.highlightIdx = idx;
      }
    },
    handleDownKey: function handleDownKey() {
      var idx = this.highlightIdx + 1;
      var length = this.menuItems.length;

      if (this.highlightIdx > length || idx > length) {
        this.highlightIdx = 0;
      } else {
        this.highlightIdx = idx;
      }
    },
    handleEnterKey: function handleEnterKey() {
      this.doSelectItem(this.menuItems[this.highlightIdx]);
    },
    updateLocalValue: function updateLocalValue() {
      var this$1 = this;

      // handle multiple
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          console.error(("v-model has to be Array for multiple, " + (typeof this.value) + " given"));
        }

        this.value.forEach(function (item) { return this$1.addItem(item); });
      } else {
        if (this.options.length > 0) {
          this.doSelectItem(this.menuItems.filter(function (item) { return item.value === this$1.value; })[0]);
        }

        if (this.fetchFunction) {
          if (!this.value instanceof Object) {
            console.error('fetchFunction cannot be used without `v-model` as object');
          }

          this.doSelectItem(this.value);
        }
      }
    },
    getUpdateValue: function getUpdateValue() {
      if (this.multiple) {
        return this.multipleItems;
      }

      return this.isOptionObject(this.singleItem) ? this.singleItem.value : this.singleItem;
    },
    updateValue: function updateValue(value) {
      this.$emit('input', value);

      this.togglePlaceholderEl(!this.hasSelected);
    },
    isOptionObject: function isOptionObject(object) {
      return object.hasOwnProperty('label') && object.hasOwnProperty('value');
    }
  },
  mounted: function mounted() {
    console.log('Mounted v-advs');

    if (this.options) {
      this.menuItems = this.options;
    }

    if (this.value) {
      this.updateLocalValue();
    }

    this.togglePlaceholderEl(!this.hasSelected);
    this.toggleMenuEl(false);
  }
};

var __$__vue_module__ = Object.assign(usjAdvanceSelect, { render: function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-select", class: _vm.rootClasses, on: { "keydown": [function ($event) {
                    if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
                        return null;
                    }_vm.handleUpKey($event);
                }, function ($event) {
                    if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
                        return null;
                    }_vm.handleDownKey($event);
                }], "keyup": function ($event) {
                    if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                        return null;
                    }_vm.handleEnterKey($event);
                } } }, [_c('input', { ref: "hiddenInput", attrs: { "type": "hidden", "id": _vm.id, "name": _vm.name }, domProps: { "value": _vm.singleItem.value } }), _vm._v(" "), _c('div', { staticClass: "usj-select__control", on: { "click": _vm.handleControlClick } }, [!_vm.multiple && _vm.showValueEl ? _c('div', { staticClass: "usj-select__value" }, [_vm.hasDefaultSlot ? _vm._t("default", null, null, _vm.singleLabel) : _c('span', [_vm._v(_vm._s(_vm.singleLabel))])], 2) : _vm._e(), _vm._v(" "), _vm.showValueEl && _vm.multiple ? _c('div', { staticClass: "usj-select__multiple-value" }, _vm._l(_vm.multipleItems, function (item, index) {
            return _c('div', { staticClass: "item" }, [_c('div', { staticClass: "item__label" }, [_vm.hasDefaultSlot ? _vm._t("default", null, null, item) : _c('span', [_vm._v(_vm._s(item))])], 2), _vm._v(" "), _c('div', { staticClass: "item__remove", on: { "click": function ($event) {
                        $event.preventDefault();$event.stopPropagation();_vm.removeItem(item, index);
                    } } }, [_c('usj-icon', [_vm._v("clear")])], 1)]);
        })) : _vm._e(), _vm._v(" "), !_vm.hasSelected || _vm.showPlaceholderEl ? _c('div', { staticClass: "usj-select__placeholder" }, [_vm._v(" " + _vm._s(_vm.placeholder) + " ")]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "usj-select__input" }, [_vm.searchable ? _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.searchValue, expression: "searchValue" }], ref: "input", attrs: { "type": "text", "id": "input-id" }, domProps: { "value": _vm.searchValue }, on: { "focus": _vm.handleInputFocus, "input": [function ($event) {
                    if ($event.target.composing) {
                        return;
                    }_vm.searchValue = $event.target.value;
                }, _vm.handleInputInput], "blur": _vm.handleInputBlur } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "placeholder" })]), _vm._v(" "), _vm.clearable ? _c('div', { staticClass: "usj-select__clear", on: { "click": function ($event) {
                    $event.preventDefault();$event.stopPropagation();_vm.clear($event);
                } } }, [_c('usj-icon', [_vm._v("clear")])], 1) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "usj-select__dropdown" })]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showMenuEl, expression: "showMenuEl" }], staticClass: "usj-select__menu-wrapper" }, [_c('ul', { staticClass: "usj-select__menu" }, [_vm.menuItems.length < 1 && !_vm.loading ? _c('li', { staticClass: "usj-select__menu-item_disable_option" }, [_vm._v(" No options available ")]) : _vm._e(), _vm._v(" "), _vm.loading ? _c('li', { staticClass: "usj-select__menu-item_disable_option" }, [_vm._v(" Loading..."), _c('usj-spinner')], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.menuItems, function (item, index) {
            return _c('li', { key: item.value, staticClass: "usj-select__menu-item", class: { 'highlighted': index === _vm.highlightIdx }, on: { "mousedown": function ($event) {
                        _vm.handleMenuItemClick(item);
                    }, "mouseover": function ($event) {
                        _vm.handleMenuItemMouseOver(item, index);
                    } } }, [_vm.hasDefaultSlot ? _vm._t("default", null, null, item) : _c('span', [_vm._v(_vm._s(item.label))])], 2);
        })], 2)])]);
    }, staticRenderFns: [] });
__$__vue_module__.prototype = usjAdvanceSelect.prototype;

function install(Vue) {
  Vue.component('usj-advance-select', __$__vue_module__);
}

var usjAvatar = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-avatar" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'usj-avatar'
};

function install$1(Vue) {
  Vue.component('usj-avatar', usjAvatar);
}

var usjBackdrop = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-backdrop", on: { "click": _vm.close, "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) {
            return null;
          }_vm.close($event);
        } } });
  }, staticRenderFns: [],
  methods: {
    close: function close() {
      this.$emit('close');
    }
  }
};

function install$2(Vue) {
  Vue.component('usj-backdrop', usjBackdrop);
}

var usjButton = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', { ref: "root", staticClass: "usj-button", on: { "click": _vm.fireEvent } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: ['usjValue'],
  methods: {
    fireEvent: function (e) {
      this.$emit('click', e);
    },
    getValue: function getValue() {
      return this.usjValue;
    }
  }
};

function install$3(Vue) {
  Vue.component('usj-button', usjButton);
}

var onClick;
var toggleClass = 'usj-toggle';
var newValue;

var usjButtonToggle = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-button-toggle" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    usjSingle: Boolean,
    usjModel: {}
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$children.forEach(function (child) {
      var element = child.$el;
      onClick = function () {
        if (this$1.usjSingle) {
          this$1.$children.forEach(function (child) {
            child.$el.classList.remove(toggleClass);
          });
          element.classList.add(toggleClass);
          newValue = child.getValue();
        } else {
          element.classList.toggle(toggleClass);
          newValue = this$1.$children.filter(function (child) { return child.$el.classList.contains(toggleClass); }).map(function (child) { return child.getValue(); });
        }

        this$1.$emit('update:usjModel', newValue);
      };

      if (element && element.classList.contains('usj-button')) {
        element.addEventListener('click', onClick);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$children.forEach(function (child) {
      var element = child.$el;
      if (element && element.classList.contains('usj-button')) {
        element.removeEventListener('click', onClick);
      }
    });
  }
};

function install$4(Vue) {
  Vue.component('usj-button-toggle', usjButtonToggle);
}

var usjCheckbox = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-checkbox", class: [_vm.classes] }, [_c('div', { staticClass: "usj-checkbox-container", attrs: { "tabindex": "0" }, on: { "click": function ($event) {
          $event.stopPropagation();_vm.toggleCheck($event);
        } } }, [_c('input', { attrs: { "type": "checkbox", "name": _vm.name, "id": _vm.id, "disabled": _vm.disabled, "tabindex": "-1" }, domProps: { "value": _vm.value, "checked": _vm.checked } })]), _vm._v(" "), _vm.$slots.default ? _c('label', { staticClass: "usj-checkbox-label", attrs: { "for": _vm.id || _vm.name }, on: { "click": function ($event) {
          $event.preventDefault();_vm.toggleCheck($event);
        } } }, [_vm._t("default")], 2) : _vm._e()]);
  }, staticRenderFns: [],
  name: 'usj-checkbox',
  props: {
    name: String,
    value: [String, Boolean, Array],
    id: String,
    disabled: Boolean,
    usjValue: [String]
  },
  data: function data() {
    return {
      checked: this.value || false
    };
  },
  computed: {
    classes: function classes() {
      return {
        'usj-checked': this.isArray() ? this.value.indexOf(this.usjValue) >= 0 : this.checked,
        'usj-disabled': this.disabled
      };
    }
  },
  watch: {
    value: function value() {
      if (!this.isArray()) {
        this.checked = !!this.value;
      }
    }
  },
  methods: {
    toggleCheck: function toggleCheck($event) {
      if (!this.disabled) {
        if (this.isArray()) {
          var index = this.value.indexOf(this.usjValue);

          if (index >= 0) {
            this.value.splice(index, 1);
          } else {
            this.value.push(this.usjValue);
          }
          this.$emit('change', this.value, $event);
          this.$emit('input', this.value, $event);
        } else {
          this.checked = !this.checked;
          this.$emit('change', this.checked, $event);
          this.$emit('input', this.checked, $event);
        }
      }
    },
    isArray: function isArray() {
      return Array.isArray(this.value);
    }
  }
};

function install$5(Vue) {
  Vue.component('usj-checkbox', usjCheckbox);
}

var usjChip = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-chip", class: [_vm.classes], attrs: { "tabindex": "0" } }, [_c('div', { staticClass: "usj-chip-container", on: { "click": function ($event) {
          !_vm.disabled && _vm.usjEditable && _vm.$emit('edit');
        } } }, [_vm._t("default")], 2), _vm._v(" "), _vm.usjDeletable ? _c('usj-button', { staticClass: "usj-icon-button usj-dense usj-delete", attrs: { "tabindex": "-1" }, on: { "click": function ($event) {
          !_vm.disabled && _vm.$emit('delete');
        } }, nativeOn: { "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) {
            return null;
          }!_vm.disabled && _vm.$emit('delete');
        } } }, [_c('usj-icon', { staticClass: "usj-icon-delete" }, [_vm._v("cancel")])], 1) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: 'usj-chip',
  props: {
    disabled: Boolean,
    usjDeletable: Boolean,
    usjEditable: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'usj-deletable': this.usjDeletable,
        'usj-disabled': this.disabled,
        'usj-editable': this.usjEditable
      };
    }
  }
};

var uniqueId = function () {
  return Math.random().toString(36).slice(4);
};

var usjChips = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-input-container', { staticClass: "usj-chips", class: [_vm.themeClass, _vm.classes], on: { "click": _vm.applyInputFocus } }, [_vm._l(_vm.selectedChips, function (chip) {
      return _c('usj-chip', { key: chip, attrs: { "usj-editable": !_vm.usjStatic, "usj-deletable": !_vm.usjStatic, "disabled": _vm.disabled }, on: { "edit": function ($event) {
            _vm.editChip(chip);
          }, "delete": function ($event) {
            _vm.deleteChip(chip);
          } } }, [_vm._t("chip", [_vm._v(_vm._s(chip))], { value: chip })], 2);
    }), _vm._v(" "), _c('usj-input', { directives: [{ name: "show", rawName: "v-show", value: !_vm.usjStatic, expression: "!usjStatic" }], ref: "input", attrs: { "type": _vm.usjInputType, "placeholder": _vm.usjInputPlaceholder, "id": _vm.inputId, "name": _vm.usjInputName, "disabled": _vm.disabled, "tabindex": "0", "debounce": 0 }, nativeOn: { "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) {
            return null;
          }_vm.deleteLastChip($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }$event.preventDefault();_vm.addChip($event);
        }, function ($event) {
          if (!('button' in $event) && $event.keyCode !== 186) {
            return null;
          }$event.preventDefault();_vm.addChip($event);
        }] }, model: { value: _vm.currentChip, callback: function ($$v) {
          _vm.currentChip = $$v;
        }, expression: "currentChip" } }), _vm._v(" "), _vm._t("default")], 2);
  }, staticRenderFns: [],
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
  data: function data() {
    return {
      currentChip: null,
      selectedChips: this.value,
      inputId: this.usjInputId || 'chips-' + uniqueId()
    };
  },
  watch: {
    value: function value(value$1) {
      this.selectedChips = value$1;
    }
  },
  computed: {
    classes: function classes() {
      return {
        'usj-static': this.usjStatic,
        'usj-disabled': this.disabled,
        'usj-chips': true
      };
    }
  },
  methods: {
    applyInputFocus: function applyInputFocus() {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$refs.input.$el.focus();
      });
    },
    addChip: function addChip() {
      if (this.currentChip && this.selectedChips.length < this.usjMax) {
        var value = this.currentChip.trim();
        if (this.selectedChips.indexOf(value) < 0) {
          this.selectedChips.push(value);
          this.currentChip = null;
          this.$emit('input', this.selectedChips);
          this.$emit('change', this.selectedChips);
          this.applyInputFocus();
        }
      }
    },
    deleteChip: function deleteChip(chip) {
      var index = this.selectedChips.indexOf(chip);
      if (index >= 0) {
        this.selectedChips.splice(index, 1);
      }
      this.$emit('change', this.selectedChips);
      this.applyInputFocus();
    },
    editChip: function editChip(chip) {
      var index = this.selectedChips.indexOf(chip);
      if (index >= 0) {
        this.selectedChips.splice(index, 1);
      }
      this.currentChip = chip;
      this.$emit('change', this.selectedChips);
      this.applyInputFocus();
    },
    deleteLastChip: function deleteLastChip() {
      if (!this.currentChip) {
        this.selectedChips.pop();
        this.$emit('change', this.selectedChips);
        this.applyInputFocus();
      }
    }
  }
};

function install$6(Vue) {
  Vue.component('usj-chip', usjChip);
  Vue.component('usj-chips', usjChips);
}

var getClosestVueParent = function ($parent, cssClass) {
  if (!$parent || !$parent.$el) {
    return false;
  }

  if ($parent._uid === 0) {
    return false;
  }

  if (!$parent.$el.classList) {
    return false;
  }

  if ($parent.$el.classList.contains(cssClass)) {
    return $parent;
  }

  return getClosestVueParent($parent.$parent, cssClass);
};

var common = {
  props: {
    value: [String, Number],
    disabled: Boolean,
    required: Boolean,
    maxlength: [Number, String],
    placeholder: String
  },
  watch: {
    value: function value(value$1) {
      this.setParentValue(value$1);
      this.updateValues(value$1);
    },
    disabled: function disabled() {
      this.setParentDisabled();
    },
    required: function required() {
      this.setParentRequired();
    },
    placeholder: function placeholder() {
      this.setParentPlaceholder();
    },
    maxlength: function maxlength() {
      this.handleMaxLength();
    }
  },
  methods: {
    handleMaxLength: function handleMaxLength() {
      this.parentContainer.enableCounter = this.maxlength > 0;
      this.parentContainer.counterLength = this.maxlength;
    },
    setParentValue: function setParentValue(value) {
      this.parentContainer.setValue(value || this.$el.value);
    },
    setParentDisabled: function setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled;
    },
    setParentRequired: function setParentRequired() {
      this.parentContainer.isRequired = this.required;
    },
    setParentPlaceholder: function setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder;
    },
    updateValues: function updateValues(value) {
      var newValue = value || this.$el.value || this.value;

      this.setParentValue(newValue);
      this.parentContainer.inputLength = newValue ? newValue.length : 0;
    },
    onFocus: function onFocus() {
      if (this.parentContainer) {
        this.parentContainer.isFocused = true;
      }
    },
    onBlur: function onBlur() {
      this.parentContainer.isFocused = false;
      this.setParentValue();
    },
    onInput: function onInput() {
      this.updateValues();
      this.$emit('change', this.$el.value);
      this.$emit('input', this.$el.value);
    }
  }
};

var flatpickr = require('flatpickr');
// import flatpickr from 'flatpickr'
// You have to import css yourself
var usjDatetimePicker = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.mutableValue, expression: "mutableValue" }], class: _vm.inputClass, attrs: { "type": "text", "id": _vm.id, "name": _vm.name, "placeholder": _vm.placeholder, "required": _vm.required, "data-input": "" }, domProps: { "value": _vm.mutableValue }, on: { "focus": _vm.onFocus, "blur": _vm.onBlur, "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }_vm.mutableValue = $event.target.value;
        }, _vm.onInput], "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }_vm.onInput($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }_vm.onInput($event);
        }] } });
  }, staticRenderFns: [],
  mixins: [common],
  props: {
    value: {
      default: null,
      required: true,
      validate: function validate(value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof Array;
      }
    },
    // https://chmln.github.io/flatpickr/options/
    config: {
      type: Object,
      default: function () { return ({
        wrap: false
      }); }
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClass: {
      type: [String, Object],
      default: 'form-control input'
    },
    name: {
      type: String,
      default: 'date-time'
    },
    required: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  data: function data() {
    return {
      mutableValue: this.value,
      fp: null
    };
  },
  mounted: function mounted() {
    var this$1 = this;

    // Load flatPickr if not loaded yet
    if (!this.fp) {
      // Bind on parent element if wrap is true
      var elem = this.config.wrap ? this.$el.parentNode : this.$el;
      this.fp = new Flatpickr(elem, this.config);
    }
    this.$nextTick(function () {
      this$1.parentContainer = getClosestVueParent(this$1.$parent, 'usj-input-container');
      if (!this$1.parentContainer) {
        this$1.$destroy();
        throw new Error('You should wrap the usj-input in a usj-input-container');
      }
      this$1.setParentDisabled();
      this$1.setParentRequired();
      this$1.setParentPlaceholder();
      this$1.handleMaxLength();
      this$1.updateValues(this$1.value);
    });
  },
  beforeDestroy: function beforeDestroy() {
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
    config: function config(newConfig) {
      this.fp.config = Object.assign(this.fp.config, newConfig);
      this.fp.redraw();
      this.fp.setDate(this.value, true);
    },
    /**
     * Watch for value changed by date-picker itself and notify parent component
     *
     * @param newValue
     */
    mutableValue: function mutableValue(newValue) {
      this.$emit('input', newValue);
    },
    /**
     * Watch for changes from parent component and update DOM
     *
     * @param newValue
     */
    value: function value(newValue) {
      this.fp && this.fp.setDate(newValue, true);
    }
  }
};

function install$7(Vue) {
  require('flatpickr/dist/themes/material_orange.css');

  Vue.component('usj-datetime-picker', usjDatetimePicker);
}

// code from https://github.com/marcosmoura/vue-material/blob/master/src/components/mdDialog/mdDialog.vue
var usjDialog = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-dialog-container", class: [_vm.classes], attrs: { "tabindex": "0" }, on: { "keyup": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) {
            return null;
          }$event.stopPropagation();_vm.closeOnEsc($event);
        } } }, [_c('div', { ref: "dialog", staticClass: "usj-dialog", class: _vm.dialogClasses, style: _vm.styles }, [_vm._t("default")], 2), _vm._v(" "), _vm.usjBackdrop ? _c('usj-backdrop', { ref: "backdrop", class: _vm.classes, on: { "close": function ($event) {
          _vm.usjClickOutsideToClose && _vm.close();
        } } }) : _vm._e()], 1);
  }, staticRenderFns: [],
  components: { usjBackdrop: usjBackdrop },
  props: {
    usjEscToClose: {
      type: Boolean,
      default: true
    },
    usjBackdrop: {
      type: Boolean,
      default: true
    },
    usjClickOutsideToClose: {
      type: Boolean,
      default: true
    },
    usjOpenFrom: String,
    usjCloseTo: String,
    usjFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: function () { return ({
    active: false,
    transitionOff: false,
    dialogTransform: ''
  }); },
  computed: {
    classes: function classes() {
      return {
        'usj-active': this.active
      };
    },
    dialogClasses: function dialogClasses() {
      return {
        'usj-fullscreen': this.usjFullscreen,
        'usj-transition-off': this.transitionOff,
        'usj-reference': this.usjOpenFrom || this.usjCloseTo
      };
    },
    styles: function styles() {
      return {
        transform: this.dialogTransform
      };
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.dialogElement = this$1.$el;
      this$1.dialogInnerElement = this$1.$refs.dialog;
      this$1.removeDialog();
    });
  },
  methods: {
    removeDialog: function removeDialog() {
      if (document.body.contains(this.dialogElement)) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    calculateDialogPos: function calculateDialogPos(ref) {
      var reference = document.querySelector(ref);
      if (reference) {
        var openFromRect = reference.getBoundingClientRect();
        var dialogRect = this.dialogInnerElement.getBoundingClientRect();
        var widthInScale = openFromRect.width / dialogRect.width;
        var heightInScale = openFromRect.height / dialogRect.height;
        var distance = {
          top: -(dialogRect.top - openFromRect.top),
          left: -(dialogRect.left - openFromRect.left + openFromRect.width)
        };
        if (openFromRect.top > dialogRect.top + dialogRect.height) {
          distance.top = openFromRect.top - dialogRect.top;
        }
        if (openFromRect.left > dialogRect.left + dialogRect.width) {
          distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
        }
        this.dialogTransform = "translate3D(" + (distance.left) + "px, " + (distance.top) + "px, 0) scale(" + widthInScale + ", " + heightInScale + ")";
      }
    },
    open: function open() {
      var this$1 = this;

      document.body.appendChild(this.dialogElement);
      this.transitionOff = true;
      this.calculateDialogPos(this.usjOpenFrom);
      window.setTimeout(function () {
        this$1.dialogElement.focus();
        this$1.transitionOff = false;
        this$1.active = true;
      });
      this.$emit('open');
    },
    closeOnEsc: function closeOnEsc() {
      if (this.usjEscToClose) {
        this.close();
      }
    },
    close: function close() {
      var this$1 = this;

      var transitionEndEventName = 'transitioned';
      if (document.body.contains(this.dialogElement)) {
        this.$nextTick(function () {
          var cleanElement = function () {
            var activeRipple = this$1.dialogElement.querySelector('.usj-ripple.usj-active');
            if (activeRipple) {
              activeRipple.classList.remove('usj-active');
            }
            this$1.dialogInnerElement.removeEventListener(transitionEndEventName, cleanElement);
            document.body.removeChild(this$1.dialogElement);
            this$1.dialogTransform = '';
          };
          this$1.transitionOff = true;
          this$1.dialogTransform = '';
          this$1.calculateDialogPos(this$1.mdCloseTo);
          window.setTimeout(function () {
            this$1.transitionOff = false;
            this$1.active = false;
            this$1.dialogInnerElement.addEventListener(transitionEndEventName, cleanElement);
          });
          this$1.$emit('close');
        });
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeDialog();
  }
};

var usjDialogContent = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-dialog-content" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjDialogTitle = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-dialog-title usj-title" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjDialogActions = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-dialog-actions" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjDialogPrompt = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-dialog', { ref: "dialog", staticClass: "usj-dialog-prompt", on: { "close": function ($event) {
          _vm.fireCloseEvent('cancel');
        } } }, [_vm.usjTitle ? _c('usj-dialog-title', [_vm._v(_vm._s(_vm.usjTitle))]) : _vm._e(), _vm._v(" "), _vm.usjContentHtml ? _c('usj-dialog-content', { domProps: { "innerHTML": _vm._s(_vm.usjContentHtml) } }) : _vm._e(), _vm._v(" "), _vm.usjContent ? _c('usj-dialog-content', [_vm._v(_vm._s(_vm.usjContent))]) : _vm._e(), _vm._v(" "), _c('usj-dialog-content', [_c('usj-input-container', [_c('usj-input', { ref: "input", attrs: { "id": _vm.usjInputId, "name": _vm.usjInputName, "maxlength": _vm.usjInputMaxlength, "placeholder": _vm.usjInputPlaceholder, "value": _vm.value }, nativeOn: { "keydown": function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }_vm.confirmValue($event);
        } } })], 1)], 1), _vm._v(" "), _c('usj-dialog-actions', [_c('usj-button', { staticClass: "usj-primary", on: { "click": function ($event) {
          _vm.close('cancel');
        } } }, [_vm._v(_vm._s(_vm.usjCancelText))]), _vm._v(" "), _c('usj-button', { staticClass: "usj-primary", on: { "click": _vm.confirmValue } }, [_vm._v(_vm._s(_vm.usjOkText))])], 1)], 1);
  }, staticRenderFns: [],
  name: 'usj-dialog-prompt',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    usjTitle: String,
    usjContent: String,
    usjContentHtml: String,
    usjOkText: {
      type: String,
      default: 'Ok'
    },
    usjCancelText: {
      type: String,
      default: 'Cancel'
    },
    usjInputId: String,
    usjInputName: String,
    usjInputMaxlength: [String, Number],
    usjInputPlaceholder: String
  },
  data: function () { return ({
    debounce: false
  }); },
  methods: {
    fireCloseEvent: function fireCloseEvent(type) {
      if (!this.debounce) {
        this.$emit('close', type);
      }
    },
    open: function open() {
      var this$1 = this;

      this.$emit('open');
      this.debounce = false;
      this.$refs.dialog.open();
      window.setTimeout(function () {
        this$1.$refs.input.$el.focus();
      });
    },
    close: function close(type) {
      this.fireCloseEvent(type);
      this.debounce = true;
      this.$refs.dialog.close();
    },
    confirmValue: function confirmValue() {
      this.$emit('input', this.$refs.input.$el.value);
      this.close('ok');
    }
  }
};

var usjDialogConfirm = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-dialog', { ref: "dialog", staticClass: "usj-dialog-confirm", on: { "close": function ($event) {
          _vm.fireCloseEvent('cancel');
        } } }, [_vm.usjTitle ? _c('usj-dialog-title', [_vm._v(_vm._s(_vm.usjTitle))]) : _vm._e(), _vm._v(" "), _vm.usjContentHtml ? _c('usj-dialog-content', { domProps: { "innerHTML": _vm._s(_vm.usjContentHtml) } }) : _c('usj-dialog-content', [_vm._v(_vm._s(_vm.usjContent))]), _vm._v(" "), _c('usj-dialog-actions', [_c('usj-button', { staticClass: "usj-primary", on: { "click": function ($event) {
          _vm.close('cancel');
        } } }, [_vm._v(_vm._s(_vm.usjCancelText))]), _vm._v(" "), _c('usj-button', { staticClass: "usj-primary", on: { "click": function ($event) {
          _vm.close('ok');
        } } }, [_vm._v(_vm._s(_vm.usjOkText))])], 1)], 1);
  }, staticRenderFns: [],
  name: 'usj-dialog-confirm',
  props: {
    usjTitle: String,
    usjContent: String,
    usjContentHtml: String,
    usjOkText: {
      type: String,
      default: 'Ok'
    },
    usjCancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  data: function () { return ({
    debounce: false
  }); },
  methods: {
    fireCloseEvent: function fireCloseEvent(type) {
      if (!this.debounce) {
        this.$emit('close', type);
      }
    },
    open: function open() {
      this.$emit('open');
      this.debounce = false;
      this.$refs.dialog.open();
    },
    close: function close(type) {
      this.fireCloseEvent(type);
      this.debounce = true;
      this.$refs.dialog.close();
    }
  },
  mounted: function mounted() {
    if (!this.usjContent && !this.usjContentHtml) {
      throw new Error('Missing usj-content or usj-content-html attributes');
    }
  }
};

function install$8(Vue) {
  Vue.component('usj-dialog', usjDialog);
  Vue.component('usj-dialog-content', usjDialogContent);
  Vue.component('usj-dialog-title', usjDialogTitle);
  Vue.component('usj-dialog-actions', usjDialogActions);

  Vue.component('usj-dialog-prompt', usjDialogPrompt);
  Vue.component('usj-dialog-confirm', usjDialogConfirm);
}

var usjDivider = {
  functional: true,
  render: function (h, context) {
    var classes = context.data.staticClass || '';

    return h('hr', {
      staticClass: 'usj-divider ' + classes
    }, context.children);
  }
};

require('./usjDivider.scss');

function install$9(Vue) {
  Vue.component('usj-divider', usjDivider);
}

var onClickWindow;

var usjDropdown = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-dropdown", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  data: function data() {
    return {
      opened: false
    };
  },
  computed: {
    classes: function classes() {
      var classes = [];

      if (this.opened) { classes.push('usj-dropdown--opened'); }

      return classes.join(' ');
    }
  },
  methods: {
    toggleDropdown: function toggleDropdown() {
      this.opened = !this.opened;
    },
    closeDropdown: function closeDropdown() {
      this.opened = false;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    onClickWindow = function (e) {
      if (this$1.opened) { this$1.closeDropdown(); }
    };
    window.addEventListener('mouseup', onClickWindow);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mouseup', onClickWindow);
  }
};

var usjDropdownButton = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-button', { staticClass: "usj-dropdown__button", on: { "click": function ($event) {
          _vm.onClick();
        } } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  methods: {
    onClick: function onClick() {
      this.$parent.toggleDropdown();
    }
  }
};

var usjDropdownMenu = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "usj-dropdown__menu" }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'usj-dropdown-menu'
};

var usjDropdownItemButton = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-dropdown__item usj-dropdown__item--button", on: { "click": function ($event) {
          _vm.$emit('click', $event);
        } } }, [_c('div', { staticClass: "usj-dropdown__item-container" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: []
};

var usjDropdownItemDefault = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-dropdown__item" }, [_c('span', [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'usj-dropdown-item'
};

var usjDropdownItem = {
  functional: true,
  render: function render(h, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    function selectComponent(props, data) {
      var componentEvents = [];
      var btnEvents = ['click'];

      if (data.on) {
        componentEvents = Object.keys(data.on);
      }

      var hasBtnEvent = btnEvents.filter(function (eventName) { return componentEvents.indexOf(eventName) !== -1; }).length > 0;

      if (hasBtnEvent) {
        return usjDropdownItemButton;
      }

      return usjDropdownItemDefault;
    }

    // select component base on props values
    return h(selectComponent(props, data), Object.assign({ props: props }, data), children);
  }
};

function install$10(Vue) {
  Vue.component('usj-dropdown', usjDropdown);
  Vue.component('usj-dropdown-button', usjDropdownButton);
  Vue.component('usj-dropdown-menu', usjDropdownMenu);
  Vue.component('usj-dropdown-item', usjDropdownItem);
}

var usjFile = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-file", on: { "click": _vm.openPicker } }, [_c('usj-input', { ref: "textInput", attrs: { "readonly": "readonly", "required": _vm.required, "placeholder": _vm.placeholder, "disabled": _vm.disabled }, model: { value: _vm.filename, callback: function ($$v) {
          _vm.filename = $$v;
        }, expression: "filename" } }), _vm._v(" "), _c('usj-icon', [_vm._v("attach_file")]), _vm._v(" "), _c('input', { ref: "fileInput", attrs: { "type": "file", "id": _vm.id, "name": _vm.name, "disabled": _vm.disabled, "multiple": _vm.multiple, "accept": _vm.accept }, on: { "change": _vm.onFileSelected } })], 1);
  }, staticRenderFns: [],
  name: 'usj-file',
  props: {
    value: String,
    id: String,
    name: String,
    disabled: Boolean,
    required: Boolean,
    placeholder: String,
    accept: String,
    multiple: Boolean,
    uploadProgress: Number,
    uploading: Boolean
  },
  data: function data() {
    return {
      filename: this.value
    };
  },
  watch: {
    value: function value() {
      this.filename = this.value;
    }
  },
  methods: {
    getMultipleName: function getMultipleName(files) {
      var names = [];
      return names.join(', ');
    },
    openPicker: function openPicker() {
      if (!this.disabled) {
        this.resetFile();
        this.$refs.fileInput.click();
        this.$refs.textInput.$el.focus();
      }
    },
    resetFile: function resetFile() {
      this.parentContainer.value = '';
      this.$refs.fileInput.value = '';
    },
    onFileSelected: function onFileSelected($event) {
      var files = $event.target.files || $event.dataTransfer.files;
      if (files) {
        if (files.length > 1) {
          this.filename = this.getMultipleName(files);
        } else if (files.length === 1) {
          this.filename = files[0].name;
        } else {
          this.filename = null;
        }
      } else {
        this.filename = $event.target.value.split('\\').pop();
      }
      this.$emit('selected', files || $event.target.value);
      this.$emit('input', this.filename);
    }
  },
  mounted: function mounted() {
    this.parentContainer = getClosestVueParent(this.$parent, 'usj-input-container');
    if (!this.parentContainer) {
      this.$destroy();
      throw new Error('You should wrap the usj-file in a usj-input-container');
    }
    this.parentContainer.hasFile = true;
  },
  beforeDestroy: function beforeDestroy() {
    this.parentContainer.hasFile = false;
  }
};

function install$11(Vue) {
  Vue.component('usj-file', usjFile);
}

var registeredIcons = {};

var usjIcon = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.svgContent ? _c('i', { staticClass: "usj-icon", domProps: { "innerHTML": _vm._s(_vm.svgContent) } }) : _vm.imageSrc ? _c('usj-image', { staticClass: "usj-icon", attrs: { "usj-src": _vm.imageSrc } }) : _c('i', { staticClass: "usj-icon", class: [_vm.usjIconset], attrs: { "aria-hidden": !!_vm.usjIconset } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    usjSrc: String,
    usjIconset: {
      type: String,
      default: 'material-icons'
    }
  },
  data: function () { return ({
    svgContent: null,
    imageSrc: null
  }); },
  watch: {
    usjSrc: function usjSrc() {
      this.svgContent = null;
      this.imageSrc = null;
      this.checkSrc();
    }
  },
  methods: {
    isImage: function isImage(mimetype) {
      return mimetype.indexOf('image') >= 0;
    },
    isSVG: function isSVG(mimetype) {
      return mimetype.indexOf('svg') >= 0;
    },
    setSVGContent: function setSVGContent(value) {
      var this$1 = this;

      this.svgContent = value;

      this.$nextTick(function () {
        this$1.$el.children[0].removeAttribute('fill');
      });
    },
    loadSVG: function loadSVG() {
      if (!registeredIcons[this.usjSrc]) {
        var request = new XMLHttpRequest();
        var self = this;

        request.open('GET', this.usjSrc, true);

        request.onload = function () {
          var mimetype = this.getResponseHeader('content-type');

          if (this.status >= 200 && this.status < 400 && self.isImage(mimetype)) {
            if (self.isSVG(mimetype)) {
              registeredIcons[self.usjSrc] = this.response;
              self.setSVGContent(this.response);
            } else {
              self.loadImage();
            }
          } else {
            console.warn(("The file " + (self.usjSrc) + " is not a valid image."));
          }
        };

        request.send();
      } else {
        this.setSVGContent(registeredIcons[this.usjSrc]);
      }
    },
    loadImage: function loadImage() {
      this.imageSrc = this.usjSrc;
    },
    checkSrc: function checkSrc() {
      if (this.usjSrc) {
        if (this.usjSrc.indexOf('.svg') >= 0) {
          this.loadSVG();
        } else {
          this.loadImage();
        }
      }
    }
  },
  mounted: function mounted() {
    this.checkSrc();
  }
};

function install$12(Vue) {
  Vue.component('usj-icon', usjIcon);
}

var isArray = function (value) {
  return value && value.constructor === Array;
};

var usjInputContainer = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-input-container", class: [_vm.classes] }, [_vm._t("default"), _vm._v(" "), _vm.enableCounter ? _c('span', { staticClass: "usj-count" }, [_vm._v(_vm._s(_vm.inputLength) + " / " + _vm._s(_vm.counterLength))]) : _vm._e(), _vm._v(" "), _vm.usjHasPassword ? _c('usj-button', { staticClass: "usj-icon-button usj-toggle-password", nativeOn: { "click": function ($event) {
          _vm.togglePasswordType($event);
        } } }, [_c('usj-icon', [_vm._v(_vm._s(_vm.showPassword ? 'visibility_off' : 'visibility'))])], 1) : _vm._e()], 2);
  }, staticRenderFns: [],
  props: {
    usjInline: Boolean,
    usjHasPassword: Boolean,
    usjInvalid: Boolean
  },
  data: function data() {
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
    };
  },
  computed: {
    hasValue: function hasValue() {
      if (isArray(this.value)) {
        return this.value.length > 0;
      }

      return Boolean(this.value);
    },
    classes: function classes() {
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
      };
    }
  },
  methods: {
    isInput: function isInput() {
      return this.input && this.input.tagName.toLowerCase() === 'input';
    },
    togglePasswordType: function togglePasswordType() {
      if (this.isInput()) {
        if (this.input.type === 'password') {
          this.input.type = 'text';
          this.showPassword = true;
        } else {
          this.input.type = 'password';
          this.showPassword = false;
        }

        this.input.focus();
      }
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  },
  mounted: function mounted() {
    this.input = this.$el.querySelectorAll('input, textarea, select, .usj-file')[0];

    if (!this.input) {
      this.$destroy();

      throw new Error('Missing input/select/textarea inside usj-input-container');
    }
  }
};

var usjInput = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { staticClass: "usj-input", attrs: { "type": _vm.type, "disabled": _vm.disabled, "required": _vm.required, "placeholder": _vm.placeholder, "maxlength": _vm.maxlength }, domProps: { "value": _vm.value }, on: { "focus": _vm.onFocus, "blur": _vm.onBlur, "input": _vm.onInput, "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }_vm.onInput($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }_vm.onInput($event);
        }] } });
  }, staticRenderFns: [],
  mixins: [common],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.parentContainer = getClosestVueParent(this$1.$parent, 'usj-input-container');

      if (!this$1.parentContainer) {
        this$1.$destroy();

        throw new Error('You should wrap the usj-input in a usj-input-container');
      }

      this$1.setParentDisabled();
      this$1.setParentRequired();
      this$1.setParentPlaceholder();
      this$1.handleMaxLength();
      this$1.updateValues();
    });
  }
};

var autosize = require('autosize');
// import { autosize } from 'autosize'
var usjTextarea = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('textarea', { staticClass: "usj-input", attrs: { "disabled": _vm.disabled, "required": _vm.required, "placeholder": _vm.placeholder, "maxlength": _vm.maxlength }, domProps: { "value": _vm.value }, on: { "focus": _vm.onFocus, "blur": _vm.onBlur, "input": _vm.onInput } });
  }, staticRenderFns: [],
  mixins: [common],
  watch: {
    value: function value() {
      var this$1 = this;

      this.$nextTick(function () {
        autosize.update(this$1.$el);
      });
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.parentContainer = getClosestVueParent(this$1.$parent, 'usj-input-container');

      if (!this$1.parentContainer) {
        this$1.$destroy();

        throw new Error('You should wrap the usj-textarea in a usj-input-container');
      }

      this$1.setParentDisabled();
      this$1.setParentRequired();
      this$1.setParentPlaceholder();
      this$1.handleMaxLength();
      this$1.updateValues();

      if (!this$1.$el.getAttribute('rows')) {
        this$1.$el.setAttribute('rows', '1');
      }

      autosize(this$1.$el);
    });
  },
  beforeDestroy: function beforeDestroy() {
    autosize.destroy(this.$el);
  }
};

function install$13(Vue) {
  Vue.component('usj-input', usjInput);
  Vue.component('usj-input-container', usjInputContainer);
  Vue.component('usj-textarea', usjTextarea);
}

var usjLayout = {
  name: 'usj-layout',
  props: {
    usjTag: {
      type: String,
      default: 'div'
    },
    usjRow: Boolean,
    usjRowXsmall: Boolean,
    usjRowSmall: Boolean,
    usjRowMedium: Boolean,
    usjRowLarge: Boolean,
    usjRowXlarge: Boolean,
    usjColumn: Boolean,
    usjColumnXsmall: Boolean,
    usjColumnSmall: Boolean,
    usjColumnMedium: Boolean,
    usjColumnLarge: Boolean,
    usjColumnXlarge: Boolean,
    usjHideXsmall: Boolean,
    usjHideSmall: Boolean,
    usjHideMedium: Boolean,
    usjHideLarge: Boolean,
    usjHideXlarge: Boolean,
    usjHideXsmallAndUp: Boolean,
    usjHideSmallAndUp: Boolean,
    usjHideMediumAndUp: Boolean,
    usjHideLargeAndUp: Boolean,
    usjHideXlargeAndUp: Boolean,
    usjGutter: [String, Number, Boolean],
    usjAlign: String,
    usjAlignXsmall: String,
    usjAlignSmall: String,
    usjAlignMedium: String,
    usjAlignLarge: String,
    usjAlignXlarge: String,
    usjVerticalAlign: String,
    usjVerticalAlignXsmall: String,
    usjVerticalAlignSmall: String,
    usjVerticalAlignMedium: String,
    usjVerticalAlignLarge: String,
    usjVerticalAlignXlarge: String,
    usjFlex: [String, Number, Boolean],
    usjFlexXsmall: [String, Number, Boolean],
    usjFlexSmall: [String, Number, Boolean],
    usjFlexMedium: [String, Number, Boolean],
    usjFlexLarge: [String, Number, Boolean],
    usjFlexXlarge: [String, Number, Boolean],
    usjFlexOffset: [String, Number, Boolean],
    usjFlexOffsetXsmall: [String, Number, Boolean],
    usjFlexOffsetSmall: [String, Number, Boolean],
    usjFlexOffsetMedium: [String, Number, Boolean],
    usjFlexOffsetLarge: [String, Number, Boolean],
    usjFlexOffsetXlarge: [String, Number, Boolean]
  },
  computed: {
    classes: function classes() {
      var classes = {
        'usj-row': this.usjRow,
        'usj-row-xsmall': this.usjRowXsmall,
        'usj-row-small': this.usjRowSmall,
        'usj-row-medium': this.usjRowMedium,
        'usj-row-large': this.usjRowLarge,
        'usj-row-xlarge': this.usjRowXlarge,
        'usj-column': this.usjColumn,
        'usj-column-xsmall': this.usjColumnXsmall,
        'usj-column-small': this.usjColumnSmall,
        'usj-column-medium': this.usjColumnMedium,
        'usj-column-large': this.usjColumnLarge,
        'usj-column-xlarge': this.usjColumnXlarge,
        'usj-hide-xsmall': this.usjHideXsmall,
        'usj-hide-small': this.usjHideSmall,
        'usj-hide-medium': this.usjHideMedium,
        'usj-hide-large': this.usjHideLarge,
        'usj-hide-xlarge': this.usjHideXlarge,
        'usj-hide-xsmall-and-up': this.usjHideXsmallAndUp,
        'usj-hide-small-and-up': this.usjHideSmallAndUp,
        'usj-hide-medium-and-up': this.usjHideMediumAndUp,
        'usj-hide-large-and-up': this.usjHideLargeAndUp,
        'usj-hide-xlarge-and-up': this.usjHideXlargeAndUp
      };
      if (this.usjGutter) {
        if (typeof this.usjGutter === 'boolean') {
          classes['usj-gutter'] = true;
        } else if (this.usjGutter) {
          classes['usj-gutter-' + this.usjGutter] = true;
        }
      }
      /* Flex */
      this.generatePropClasses('usj-flex', '', 'usjFlex', classes);
      this.generatePropClasses('usj-flex', 'xsmall', 'usjFlexXsmall', classes);
      this.generatePropClasses('usj-flex', 'small', 'usjFlexSmall', classes);
      this.generatePropClasses('usj-flex', 'medium', 'usjFlexMedium', classes);
      this.generatePropClasses('usj-flex', 'large', 'usjFlexLarge', classes);
      this.generatePropClasses('usj-flex', 'xlarge', 'usjFlexXlarge', classes);
      /* Flex Offset */
      this.generatePropClasses('usj-flex-offset', '', 'usjFlexOffset', classes);
      this.generatePropClasses('usj-flex-offset', 'xsmall', 'usjFlexOffsetXsmall', classes);
      this.generatePropClasses('usj-flex-offset', 'small', 'usjFlexOffsetSmall', classes);
      this.generatePropClasses('usj-flex-offset', 'medium', 'usjFlexOffsetMedium', classes);
      this.generatePropClasses('usj-flex-offset', 'large', 'usjFlexOffsetLarge', classes);
      this.generatePropClasses('usj-flex-offset', 'xlarge', 'usjFlexOffsetXlarge', classes);
      /* Horizontal Alignment */
      this.generatePropClasses('usj-align', '', 'usjAlign', classes);
      this.generatePropClasses('usj-align', 'xsmall', 'usjAlignXsmall', classes);
      this.generatePropClasses('usj-align', 'small', 'usjAlignSmall', classes);
      this.generatePropClasses('usj-align', 'medium', 'usjAlignMedium', classes);
      this.generatePropClasses('usj-align', 'large', 'usjAlignLarge', classes);
      this.generatePropClasses('usj-align', 'xlarge', 'usjAlignXlarge', classes);
      /* Vertical Alignment */
      this.generatePropClasses('usj-vertical-align', '', 'usjVerticalAlign', classes);
      this.generatePropClasses('usj-vertical-align', 'xsmall', 'usjVerticalAlignXsmall', classes);
      this.generatePropClasses('usj-vertical-align', 'small', 'usjVerticalAlignSmall', classes);
      this.generatePropClasses('usj-vertical-align', 'medium', 'usjVerticalAlignMedium', classes);
      this.generatePropClasses('usj-vertical-align', 'large', 'usjVerticalAlignLarge', classes);
      this.generatePropClasses('usj-vertical-align', 'xlarge', 'usjVerticalAlignXlarge', classes);
      return classes;
    }
  },
  methods: {
    generatePropClasses: function generatePropClasses(prop, size, name, object) {
      if (size) {
        size = '-' + size;
      }
      if (this[name]) {
        if (typeof this[name] === 'boolean') {
          if (!this[name]) {
            object[prop + size + '-none'] = true;
          } else {
            object[prop + size] = true;
          }
        } else {
          object[prop + size + '-' + this[name]] = true;
        }
      }
    }
  },
  render: function render(createElement) {
    return createElement(this.usjTag, {
      staticClass: 'usj-layout',
      class: this.classes
    }, this.$slots.default);
  }
};

function install$14(Vue) {
  Vue.component('usj-layout', usjLayout);
}

var usjList = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { staticClass: "usj-list" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var UsjListItemButton = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-item", class: _vm.classes }, [_c('div', { staticClass: "usj-list-item-container usj-button" }, [_vm._t("default")], 2), _vm._v(" "), _c('usj-button', { staticClass: "usj-button-ghost", attrs: { "type": "button", "disabled": _vm.disabled }, on: { "click": function ($event) {
          _vm.$emit('click', $event);
        } } })], 1);
  }, staticRenderFns: [],
  name: 'usj-list-item',
  props: {
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'usj-disabled': this.disabled
      };
    }
  }
};

var UsjListItemLink = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-item", class: _vm.classes }, [_c('a', { staticClass: "usj-list-item-container usj-button", attrs: { "href": _vm.href, "target": _vm.target, "disabled": _vm.disabled } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'usj-list-item',
  props: {
    href: String,
    target: String,
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'usj-disabled': this.disabled
      };
    }
  }
};

var UsjListItemRouter = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-item", class: _vm.classes, attrs: { "disabled": _vm.disabled } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'usj-list-item',
  props: {
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'usj-disabled': this.disabled
      };
    }
  }
};

var usjListItemExpand = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-item usj-list-item-expand", class: _vm.classes }, [_c('div', { staticClass: "usj-list-item-container usj-button" }, [_vm._t("default"), _vm._v(" "), _c('usj-icon', { staticClass: "usj-list-expand-indicator" }, [_vm._v("keyboard_arrow_down")])], 2), _vm._v(" "), _c('usj-button', { staticClass: "usj-button-ghost", attrs: { "type": "button", "disabled": _vm.disabled }, nativeOn: { "click": function ($event) {
          _vm.toggleExpandList($event);
        } } }), _vm._v(" "), _c('div', { ref: "expand", staticClass: "usj-list-expand", class: _vm.expandClasses, style: _vm.expandStyles }, [_vm._t("expand")], 2)], 1);
  }, staticRenderFns: [],
  name: 'usj-list-item',
  props: {
    disabled: Boolean,
    usjExpandMultiple: Boolean
  },
  data: function data() {
    return {
      parentList: false,
      active: false,
      height: 0,
      contentObserver: null,
      transitionOff: true
    };
  },
  computed: {
    classes: function classes() {
      return {
        'usj-disabled': this.disabled,
        'usj-active': this.active
      };
    },
    expandClasses: function expandClasses() {
      return {
        'usj-transition-off': this.transitionOff
      };
    },
    expandStyles: function expandStyles() {
      return {
        'margin-bottom': this.height
      };
    }
  },
  methods: {
    resetSiblings: function resetSiblings() {
      var this$1 = this;

      this.parentList.$children.forEach(function (child) {
        if (child.$el !== this$1.$el && child.$el.classList.contains('usj-list-item-expand')) {
          child.active = false;
        }
      });
    },
    calculatePadding: function calculatePadding() {
      var this$1 = this;

      window.requestAnimationFrame(function () {
        this$1.height = -this$1.$el.scrollHeight + 'px';

        window.setTimeout(function () {
          this$1.transitionOff = false;
        });
      });
    },
    toggleExpandList: function toggleExpandList() {
      if (!this.usjExpandMultiple) {
        this.resetSiblings();
      }

      this.calculatePadding();
      this.active = !this.active;
    },
    recalculateAfterChange: function recalculateAfterChange() {
      this.transitionOff = true;
      this.calculatePadding();
    },
    observeChildChanges: function observeChildChanges() {
      this.contentObserver = new MutationObserver(this.recalculateAfterChange);
      this.contentObserver.observe(this.$refs.expand, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.parentList = getClosestVueParent(this$1.$parent, 'usj-list');
      this$1.calculatePadding();
      this$1.observeChildChanges();
      window.addEventListener('resize', this$1.recalculateAfterChange);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.contentObserver) {
      this.contentObserver.disconnect();
    }

    window.removeEventListener('resize', this.recalculateAfterChange);
  }
};

var UsjListItemDefault = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-item" }, [_c('div', { staticClass: "usj-list-item-container" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  name: 'usj-list-item'
};

var usjListItem = {
  functional: true,
  props: {
    href: String,
    disabled: Boolean
  },
  render: function render(createElement, ref) {
    var children = ref.children;
    var data = ref.data;
    var props = ref.props;

    var getItemComponent = function () {
      var on = data.on;
      var interactionEvents = ['contextmenu', 'dblclick', 'dragend', 'mousedown', 'touchstart', 'click'];
      var childrenCount = children.length;

      if (props.href) {
        return UsjListItemLink;
      }

      if (on) {
        var counter = interactionEvents.length;

        while (counter--) {
          if (on[interactionEvents[counter]]) {
            return UsjListItemButton;
          }
        }
      }

      while (childrenCount--) {
        var options = children[childrenCount].componentOptions;

        if (options) {
          if (options.tag === 'usj-list-expand') {
            var expandComponent = children[childrenCount];

            data.scopedSlots = {
              expand: function () { return expandComponent; }
            };

            children.splice(childrenCount, 1);

            return usjListItemExpand;
          } else if (options.tag === 'router-link') {
            children[childrenCount].data.staticClass = 'usj-list-item-container';

            return UsjListItemRouter;
          }
        }
      }

      return UsjListItemDefault;
    };

    return createElement(getItemComponent(), Object.assign({ props: props }, data), children);
  }
};

var usjListExpand = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-list-expand-container" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

function install$15(Vue) {
  Vue.component('usj-list', usjList);
  Vue.component('usj-list-item', usjListItem);
  Vue.component('usj-list-expand', usjListExpand);
}

var LIST_CLASS = 'usj-list-view-list';
var LIST_ACTIONS_CLASS = 'usj-list-actions';
var DETAILS_CLASS = 'usj-list-view-details';
var DETAILS_ACTIONS_CLASS = 'usj-details-actions';

var usjListView = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-list-view", class: [_vm.listActionsClass] }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: ['usjItems'],
  data: function data() {
    return {
      listActionComponent: null,
      listComponent: null,
      detailsComponent: null
    };
  },
  mounted: function mounted() {
    this.listComponent = this.$children.filter(function (child) { return child.$el.classList.contains(LIST_CLASS); })[0];
    this.detailsComponent = this.$children.filter(function (child) { return child.$el.classList.contains(DETAILS_CLASS); })[0];

    this.listActionComponent = this.$el.querySelectorAll('.' + LIST_ACTIONS_CLASS)[0];
    this.detailsActionComponent = this.$el.querySelectorAll('.' + DETAILS_ACTIONS_CLASS)[0];

    // add only <usj-list-actions> exists
    if (this.listActionComponent) { this.listComponent.setBottomEl(this.listActionComponent); }

    // add only <usj-details-actions> exists
    if (this.detailsActionComponent) { this.detailsComponent.setBottomEl(this.detailsActionComponent); }

    this.updateItems();
  },
  methods: {
    updateItems: function updateItems() {
      this.listComponent.items = this.usjItems || new Array(5);
    }
  },
  watch: {
    usjItems: function () {
      this.updateItems();
    }
  },
  computed: {
    listActionsClass: function () {
      return {
        'usj-list-view--has-list-actions': this.listActionComponent
      };
    }
  }
};

var usjListViewDetails = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-list-view-details" }, [_c('div', { staticClass: "usj-list-view__details" }, [_c('div', { staticClass: "usj-list-view__details-inner" }, [_vm._t("default")], 2)]), _vm._v(" "), _c('div', { ref: "bottom-placeholder", staticClass: "usj-list-view__details-bottom" })]);
  }, staticRenderFns: [],
  methods: {
    setBottomEl: function setBottomEl(el) {
      this.$refs['bottom-placeholder'].appendChild(el);
    }
  }
};

var usjListViewList = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-list-view-list" }, [_c('div', { staticClass: "usj-list-view__list-wrapper" }, [_c('ul', { staticClass: "usj-list-view__list" }, [_vm._l(_vm.items, function (item) {
      return _vm._t("default", [_vm._v(" Test content ")], { data: item });
    })], 2)]), _vm._v(" "), _c('div', { ref: "bottom-placeholder", staticClass: "usj-list-view__list-bottom" })]);
  }, staticRenderFns: [],
  data: function data() {
    return {
      items: []
    };
  },
  methods: {
    setBottomEl: function setBottomEl(el) {
      this.$refs['bottom-placeholder'].appendChild(el);
    }
  }
};

var usjListViewItem = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "usj-list-view-item", on: { "click": function ($event) {
          _vm.$emit('click');
        } } }, [_vm._t("default", [_c('div', { staticClass: "usj-list-view-item__line1--placeholder" }), _vm._v(" "), _c('div', { staticClass: "usj-list-view-item__line2--placeholder" })])], 2);
  }, staticRenderFns: []
};

var usjListActions = {
  functional: true,
  render: function (h, context) {
    var classes = context.data.staticClass || '';

    return h('div', {
      staticClass: 'usj-list-actions ' + classes
    }, context.children);
  }
};

var usjDetailsActions = {
  functional: true,
  render: function (h, context) {
    var classes = context.data.staticClass || '';

    return h('div', {
      staticClass: 'usj-details-actions ' + classes
    }, context.children);
  }
};

function install$16(Vue) {
  Vue.component('usj-list-view', usjListView);
  Vue.component('usj-list-view-details', usjListViewDetails);
  Vue.component('usj-list-view-list', usjListViewList);
  Vue.component('usj-list-view-item', usjListViewItem);

  Vue.component('usj-list-actions', usjListActions);
  Vue.component('usj-details-actions', usjDetailsActions);
}

function transitionEndEventName() {
  var el = document.createElement('span');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (var transition in transitions) {
    if (el.style[transition] !== undefined) {
      return transitions[transition];
    }
  }
}

var transitionEndEventName$1 = transitionEndEventName();

var margin = 8;

var isAboveOfViewport = function (element, position) {
  return position.top <= margin - parseInt(getComputedStyle(element).marginTop, 10);
};

var isBelowOfViewport = function (element, position) {
  return position.top + element.offsetHeight + margin >= window.innerHeight - parseInt(getComputedStyle(element).marginTop, 10);
};

var isOnTheLeftOfViewport = function (element, position) {
  return position.left <= margin - parseInt(getComputedStyle(element).marginLeft, 10);
};

var isOnTheRightOfViewport = function (element, position) {
  return position.left + element.offsetWidth + margin >= window.innerWidth - parseInt(getComputedStyle(element).marginLeft, 10);
};

var getInViewPosition = function (element, position) {
  var computedStyle = getComputedStyle(element);

  if (isAboveOfViewport(element, position)) {
    position.top = margin - parseInt(computedStyle.marginTop, 10);
  }

  if (isOnTheLeftOfViewport(element, position)) {
    position.left = margin - parseInt(computedStyle.marginLeft, 10);
  }

  if (isOnTheRightOfViewport(element, position)) {
    position.left = window.innerWidth - margin - element.offsetWidth - parseInt(computedStyle.marginLeft, 10);
  }

  if (isBelowOfViewport(element, position)) {
    position.top = window.innerHeight - margin - element.offsetHeight - parseInt(computedStyle.marginTop, 10);
  }

  return position;
};

var usjMenu = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-menu" }, [_vm._t("default"), _vm._v(" "), _c('usj-backdrop', { ref: "backdrop", staticClass: "usj-menu-backdrop usj-transparent usj-active", on: { "close": _vm.close } })], 2);
  }, staticRenderFns: [],
  props: {
    usjSize: {
      type: [Number, String],
      default: 0
    },
    usjDirection: {
      type: String,
      default: 'bottom right'
    },
    usjAlignTrigger: {
      type: Boolean,
      default: false
    },
    usjOffsetX: {
      type: [Number, String],
      default: 0
    },
    usjOffsetY: {
      type: [Number, String],
      default: 0
    },
    usjCloseOnSelect: {
      type: Boolean,
      default: true
    }
  },
  data: function () { return ({
    active: false
  }); },
  watch: {
    usjSize: function usjSize(current, previous) {
      if (current >= 1 && current <= 7) {
        this.removeLastSizeMenuContentClass(previous);
        this.addNewSizeMenuContentClass(current);
      }
    },
    usjDirection: function usjDirection(current, previous) {
      this.removeLastDirectionMenuContentClass(previous);
      this.addNewDirectionMenuContentClass(current);
    },
    usjAlignTrigger: function usjAlignTrigger(trigger) {
      this.handleAlignTriggerClass(trigger);
    }
  },
  methods: {
    validateMenu: function validateMenu() {
      if (!this.menuContent) {
        this.$destroy();

        throw new Error('You must have a usj-menu-content inside your menu.');
      }

      if (!this.menuTrigger) {
        this.$destroy();

        throw new Error('You must have an element with a usj-menu-trigger attribute inside your menu.');
      }
    },
    removeLastSizeMenuContentClass: function removeLastSizeMenuContentClass(size) {
      this.menuContent.classList.remove('usj-size-' + size);
    },
    removeLastDirectionMenuContentClass: function removeLastDirectionMenuContentClass(direction) {
      this.menuContent.classList.remove('usj-direction-' + direction.replace(/ /g, '-'));
    },
    addNewSizeMenuContentClass: function addNewSizeMenuContentClass(size) {
      this.menuContent.classList.add('usj-size-' + size);
    },
    addNewDirectionMenuContentClass: function addNewDirectionMenuContentClass(direction) {
      this.menuContent.classList.add('usj-direction-' + direction.replace(/ /g, '-'));
    },
    handleAlignTriggerClass: function handleAlignTriggerClass(trigger) {
      if (trigger) {
        this.menuContent.classList.add('usj-align-trigger');
      }
    },
    getPosition: function getPosition(vertical, horizontal) {
      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();

      var top = vertical === 'top' ? menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight : menuTriggerRect.top;

      var left = horizontal === 'left' ? menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width : menuTriggerRect.left;

      top += parseInt(this.usjOffsetY, 10);
      left += parseInt(this.usjOffsetX, 10);

      if (this.usjAlignTrigger) {
        if (vertical === 'top') {
          top -= menuTriggerRect.height + 11;
        } else {
          top += menuTriggerRect.height + 11;
        }
      }

      return { top: top, left: left };
    },
    calculateMenuContentPos: function calculateMenuContentPos() {
      var position;

      if (!this.usjDirection) {
        position = this.getPosition('bottom', 'right');
      } else {
        position = this.getPosition.apply(this, this.usjDirection.trim().split(' '));
      }

      position = getInViewPosition(this.menuContent, position);

      this.menuContent.style.top = position.top + window.pageYOffset + 'px';
      this.menuContent.style.left = position.left + window.pageXOffset + 'px';
    },
    recalculateOnResize: function recalculateOnResize() {
      window.requestAnimationFrame(this.calculateMenuContentPos);
    },
    open: function open() {
      if (document.body.contains(this.menuContent)) {
        document.body.removeChild(this.menuContent);
      }

      document.body.appendChild(this.menuContent);
      document.body.appendChild(this.backdropElement);
      window.addEventListener('resize', this.recalculateOnResize);

      this.calculateMenuContentPos();

      getComputedStyle(this.menuContent).top;
      this.menuContent.classList.add('usj-active');
      this.menuContent.focus();
      this.active = true;
      this.$emit('open');
    },
    close: function close() {
      var this$1 = this;

      var close = function (event) {
        if (this$1.menuContent && event.target === this$1.menuContent) {
          var activeRipple = this$1.menuContent.querySelector('.usj-ripple.usj-active');

          this$1.menuContent.removeEventListener(transitionEndEventName$1, close);
          this$1.menuTrigger.focus();
          this$1.active = false;

          if (activeRipple) {
            activeRipple.classList.remove('usj-active');
          }

          document.body.removeChild(this$1.menuContent);
          document.body.removeChild(this$1.backdropElement);
          window.removeEventListener('resize', this$1.recalculateOnResize);
        }
      };

      this.menuContent.addEventListener(transitionEndEventName$1, close);
      this.menuContent.classList.remove('usj-active');
      this.$emit('close');
    },
    toggle: function toggle() {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.menuTrigger = this$1.$el.querySelector('[usj-menu-trigger]');
      this$1.menuContent = this$1.$el.querySelector('.usj-menu-content');
      this$1.backdropElement = this$1.$refs.backdrop.$el;
      this$1.validateMenu();
      this$1.handleAlignTriggerClass(this$1.usjAlignTrigger);
      this$1.addNewSizeMenuContentClass(this$1.usjSize);
      this$1.addNewDirectionMenuContentClass(this$1.usjDirection);
      this$1.$el.removeChild(this$1.$refs.backdrop.$el);
      this$1.menuContent.parentNode.removeChild(this$1.menuContent);
      this$1.menuTrigger.addEventListener('click', this$1.toggle);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (document.body.contains(this.menuContent)) {
      document.body.removeChild(this.menuContent);
      document.body.removeChild(this.backdropElement);
    }

    this.menuTrigger.removeEventListener('click', this.toggle);
    window.removeEventListener('resize', this.recalculateOnResize);
  }
};

if (!Element.prototype.scrollIntoViewIfNeeded) {
  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

    var parent = this.parentNode,
        parentComputedStyle = window.getComputedStyle(parent, null),
        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
        overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
        alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
    }

    if ((overLeft || overRight) && centerIfNeeded) {
      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
    }

    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
      this.scrollIntoView(alignWithTop);
    }
  };
}

var usjMenuItem = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-list-item', { staticClass: "usj-menu-item", class: _vm.classes, attrs: { "href": _vm.href, "target": _vm.target, "disabled": _vm.disabled }, on: { "click": _vm.close } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    href: String,
    target: String,
    disabled: Boolean
  },
  data: function () { return ({
    parentContent: {},
    index: 0
  }); },
  computed: {
    classes: function classes() {
      return {
        'usj-highlighted': this.highlighted
      };
    },
    highlighted: function highlighted() {
      if (this.index === this.parentContent.highlighted) {
        if (this.disabled) {
          if (this.parentContent.oldHighlight > this.parentContent.highlighted) {
            this.parentContent.highlighted--;
          } else {
            this.parentContent.highlighted++;
          }
        }

        if (this.index === 1) {
          this.parentContent.$el.scrollTop = 0;
        } else if (this.index === this.parentContent.itemsAmount) {
          this.parentContent.$el.scrollTop = this.parentContent.$el.scrollHeight;
        } else {
          this.$el.scrollIntoViewIfNeeded(false);
        }

        return true;
      }

      return false;
    }
  },
  methods: {
    close: function close($event) {
      if (!this.disabled) {
        if (this.parentMenu.usjCloseOnSelect) {
          this.parentContent.close();
        }

        this.$emit('click', $event);
        this.$emit('selected', $event);
      }
    }
  },
  mounted: function mounted() {
    this.parentContent = getClosestVueParent(this.$parent, 'usj-menu-content');
    this.parentMenu = getClosestVueParent(this.$parent, 'usj-menu');

    if (!this.parentContent) {
      this.$destroy();

      throw new Error('You must wrap the usj-menu-item in a usj-menu-content');
    }

    this.parentContent.itemsAmount++;
    this.index = this.parentContent.itemsAmount;
  }
};

var usjMenuContent = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-menu-content", attrs: { "tabindex": "-1" }, on: { "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) {
            return null;
          }$event.preventDefault();_vm.close($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9, $event.key)) {
            return null;
          }$event.preventDefault();_vm.close($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
            return null;
          }$event.preventDefault();_vm.highlightItem('up');
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
            return null;
          }$event.preventDefault();_vm.highlightItem('down');
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }$event.preventDefault();_vm.fireClick($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) {
            return null;
          }$event.preventDefault();_vm.fireClick($event);
        }] } }, [_c('usj-list', [_vm._t("default")], 2)], 1);
  }, staticRenderFns: [],
  data: function data() {
    return {
      oldHighlight: false,
      highlighted: false,
      itemsAmount: 0
    };
  },
  methods: {
    close: function close() {
      this.highlighted = false;
      this.$parent.close();
    },
    highlightItem: function highlightItem(direction) {
      this.oldHighlight = this.highlighted;

      if (direction === 'up') {
        if (this.highlighted === 1) {
          this.highlighted = this.itemsAmount;
        } else {
          this.highlighted--;
        }
      }

      if (direction === 'down') {
        if (this.highlighted === this.itemsAmount) {
          this.highlighted = 1;
        } else {
          this.highlighted++;
        }
      }
    },
    fireClick: function fireClick() {
      if (this.highlighted > 0) {
        this.$children[0].$children[this.highlighted - 1].$el.click();
      }
    }
  },
  mounted: function mounted() {
    if (!this.$parent.$el.classList.contains('usj-menu')) {
      this.$destroy();

      throw new Error('You must wrap the usj-menu-content in a usj-menu');
    }
  }
};

function install$17(Vue) {
  Vue.component('usj-menu', usjMenu);
  Vue.component('usj-menu-item', usjMenuItem);
  Vue.component('usj-menu-content', usjMenuContent);
}

var usjPage = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-page" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageMenu = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "usj-page-menu" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageHeader = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { staticClass: "usj-page-header" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageContent = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "usj-page-content" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageFooter = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('footer', { staticClass: "usj-page-footer" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageSideNav = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "usj-page-side-nav" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

var usjPageSideContent = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "usj-page-side-content" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

function buildComponent(elName, elClass) {
  return {
    functional: true,
    render: function (h, context) { return h(elName, {
      staticClass: elClass + ' ' + context.data.staticClass
    }, context.children); }
  };
}

function install$18(Vue) {
  Vue.component('usj-page', usjPage);
  Vue.component('usj-page-menu', usjPageMenu);
  Vue.component('usj-page-header', usjPageHeader);
  Vue.component('usj-page-content', usjPageContent);
  Vue.component('usj-page-footer', usjPageFooter);
  Vue.component('usj-page-side-nav', usjPageSideNav);
  Vue.component('usj-page-side-content', usjPageSideContent);

  Vue.component('usj-page-title', buildComponent('div', 'usj-page-header__title'));

  Vue.component('usj-page-control', buildComponent('div', 'usj-page-control'));
  Vue.component('usj-page-control-item', buildComponent('div', 'usj-page-control__item'));
}

var usjRadio = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-radio", class: [_vm.classes] }, [_c('div', { staticClass: "usj-radio-container", on: { "click": function ($event) {
          $event.stopPropagation();_vm.toggleCheck($event);
        } } }, [_c('input', { attrs: { "type": "radio", "name": _vm.name, "id": _vm.id, "disabled": _vm.disabled }, domProps: { "value": _vm.value } })]), _vm._v(" "), _vm.$slots.default ? _c('label', { staticClass: "usj-radio-label", attrs: { "for": _vm.id || _vm.name }, on: { "click": _vm.toggleCheck } }, [_vm._t("default")], 2) : _vm._e()]);
  }, staticRenderFns: [],
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
    classes: function classes() {
      return {
        'usj-checked': typeof this.value !== 'undefined' && this.value !== null && this.usjValue.toString() === this.value.toString(),
        'usj-disabled': this.disabled
      };
    }
  },
  methods: {
    toggleCheck: function toggleCheck($event) {
      if (!this.disabled) {
        this.$emit('input', this.usjValue, $event);
        this.$emit('change', this.usjValue, $event);
      }
    }
  }
};

function install$19(Vue) {
  Vue.component('usj-radio', usjRadio);
}

var usjSelect = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-select", class: [_vm.classes] }, [_c('usj-menu', { attrs: { "usj-close-on-select": !_vm.multiple }, on: { "opened": function ($event) {
          _vm.$emit('open');
        }, "closed": function ($event) {
          _vm.$emit('close');
        } } }, [_c('span', { ref: "value", staticClass: "usj-select-value", attrs: { "usj-menu-trigger": "" } }, [_vm._v(_vm._s(_vm.selectedText || _vm.placeholder))]), _vm._v(" "), _c('usj-menu-content', { staticClass: "usj-select-content", class: [_vm.contentClasses] }, [_vm._t("default")], 2)], 1), _vm._v(" "), _c('select', { attrs: { "name": _vm.name, "id": _vm.id, "required": _vm.required, "disabled": _vm.disabled, "tabindex": "-1" } }, [!_vm.multiple ? _c('option', { attrs: { "selected": "true" }, domProps: { "value": _vm.selectedValue } }, [_vm._v(_vm._s(_vm.selectedText))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.multipleOptions, function (option) {
      return option.value ? _c('option', { attrs: { "selected": "true" }, domProps: { "value": option.value } }, [_vm._v(_vm._s(option.text))]) : _vm._e();
    })], 2)], 1);
  }, staticRenderFns: [],
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
  data: function data() {
    return {
      selectedValue: null,
      selectedText: null,
      multipleOptions: {},
      options: {},
      optionsAmount: 0
    };
  },
  computed: {
    classes: function classes() {
      return {
        'usj-disabled': this.disabled
      };
    },
    contentClasses: function contentClasses() {
      if (this.multiple) {
        return 'usj-multiple ' + this.usjMenuClass;
      }
      return this.usjMenuClass;
    }
  },
  watch: {
    value: function value(value$1) {
      this.setTextAndValue(value$1);
    },
    disabled: function disabled() {
      this.setParentDisabled();
    },
    required: function required() {
      this.setParentRequired();
    },
    placeholder: function placeholder() {
      this.setParentPlaceholder();
    }
  },
  methods: {
    setParentDisabled: function setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled;
    },
    setParentRequired: function setParentRequired() {
      this.parentContainer.isRequired = this.required;
    },
    setParentPlaceholder: function setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder;
    },
    getSingleValue: function getSingleValue(value) {
      var this$1 = this;

      var output = {};
      Object.keys(this.options).forEach(function (index) {
        var options = this$1.options[index];
        if (options.value === value) {
          output.value = value;
          output.text = options.$refs.item.textContent;
        }
      });
      return output;
    },
    getMultipleValue: function getMultipleValue(modelValue) {
      var this$1 = this;

      if (isArray(this.value)) {
        var outputText = [];
        modelValue.forEach(function (value) {
          Object.keys(this$1.options).forEach(function (index) {
            var options = this$1.options[index];
            if (options.value === value) {
              var text = options.$refs.item.textContent;
              this$1.multipleOptions[index] = {
                value: value,
                text: text
              };
              outputText.push(text);
            }
          });
        });
        return {
          value: modelValue,
          text: outputText.join(', ')
        };
      }
      return {};
    },
    setTextAndValue: function setTextAndValue(modelValue) {
      var output = this.multiple ? this.getMultipleValue(modelValue) : this.getSingleValue(modelValue);
      this.selectedValue = output.value;
      this.selectedText = output.text;
      if (this.parentContainer) {
        this.parentContainer.setValue(this.selectedText);
      }
    },
    changeValue: function changeValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.$emit('selected', value);
    },
    selectMultiple: function selectMultiple(index, value, text) {
      var this$1 = this;

      var values = [];
      this.multipleOptions[index] = {
        value: value,
        text: text
      };
      for (var key in this$1.multipleOptions) {
        if (this$1.multipleOptions.hasOwnProperty(key) && this$1.multipleOptions[key].value) {
          values.push(this$1.multipleOptions[key].value);
        }
      }
      this.changeValue(values);
    },
    selectOption: function selectOption(value, text) {
      this.selectedText = text;
      this.setTextAndValue(value);
      this.changeValue(value);
    }
  },
  mounted: function mounted() {
    this.parentContainer = getClosestVueParent(this.$parent, 'usj-input-container');
    if (this.parentContainer) {
      this.setParentDisabled();
      this.setParentRequired();
      this.setParentPlaceholder();
      this.parentContainer.hasSelect = true;
    }
    this.setTextAndValue(this.value);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.setValue('');
      this.parentContainer.hasSelect = false;
    }
  }
};

var usjOption = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('usj-menu-item', { staticClass: "usj-option", class: _vm.classes, attrs: { "tabindex": "-1" }, on: { "click": _vm.selectOption } }, [_vm.parentSelect.multiple ? _c('usj-checkbox', { staticClass: "usj-primary", model: { value: _vm.check, callback: function ($$v) {
          _vm.check = $$v;
        }, expression: "check" } }, [_c('span', { ref: "item" }, [_vm._t("default")], 2)]) : _c('span', { ref: "item" }, [_vm._t("default")], 2)], 1);
  }, staticRenderFns: [],
  props: {
    value: [String, Boolean, Number, Object]
  },
  data: function () { return ({
    parentSelect: {},
    check: false,
    index: 0
  }); },
  computed: {
    isSelected: function isSelected() {
      if (this.value && this.parentSelect.value) {
        var thisValue = this.value.toString();

        if (this.parentSelect.multiple) {
          return this.parentSelect.value.indexOf(thisValue) >= 0;
        }

        return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
      }
      return false;
    },
    classes: function classes() {
      return {
        'usj-selected': this.isSelected,
        'usj-checked': this.check
      };
    }
  },
  methods: {
    isMultiple: function isMultiple() {
      return this.parentSelect.multiple;
    },
    setParentOption: function setParentOption() {
      if (!this.isMultiple()) {
        this.parentSelect.selectOption(this.value, this.$refs.item.textContent, this.$el);
      } else {
        this.check = !this.check;
      }
    },
    selectOption: function selectOption($event) {
      if (this.disabled) {
        return;
      }

      this.setParentOption();
      this.$emit('selected', $event);
    }
  },
  watch: {
    isSelected: function isSelected(selected) {
      if (this.isMultiple()) {
        this.check = selected;
      }
    },
    check: function check(check$1) {
      if (check$1) {
        this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
      } else {
        this.parentSelect.selectMultiple(this.index);
      }
    }
  },
  mounted: function mounted() {
    this.parentSelect = getClosestVueParent(this.$parent, 'usj-select');
    this.parentContent = getClosestVueParent(this.$parent, 'usj-menu-content');
    if (!this.parentSelect) {
      throw new Error('You must wrap the usj-option in a usj-select');
    }
    this.parentSelect.optionsAmount++;
    this.index = this.parentSelect.optionsAmount;
    this.parentSelect.multipleOptions[this.index] = {};
    this.parentSelect.options[this.index] = this;
    if (this.isMultiple() && this.parentSelect.value.indexOf(this.value) >= 0 || this.parentSelect.value === this.value) {
      this.setParentOption();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentSelect) {
      delete this.parentSelect.options[this.index];
      delete this.parentSelect.multipleOptions[this.index];
    }
  }
};

function install$20(Vue) {
  Vue.component('usj-select', usjSelect);
  Vue.component('usj-option', usjOption);
}

require('./usjSpinner.css');

function range(begin, end) {
  
}

var usjSpinner = {
  render: function (h) {
    var children = [];
    range(1, 13).forEach(function (i) {
      children.push(h('div', {
        class: ("sk-circle" + i + " sk-child")
      }));
    });

    return h(this.tag, {
      class: 'sk-circle usj-spinner'
    }, children);
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
};

function install$21(Vue) {
  Vue.component('usj-spinner', usjSpinner);
}

var ref = checkbox.MDCCheckboxFoundation.strings;
var ANIM_END_EVENT_NAME = ref.ANIM_END_EVENT_NAME;
var usjSwitch = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "usj-switch", class: _vm.classes }, [_c('input', { ref: "native", staticClass: "usj-switch__native-control", attrs: { "type": "checkbox", "id": _vm.id, "aria-labelledby": _vm.labelId }, domProps: { "checked": _vm.value }, on: { "change": _vm.fireEvent } }), _vm._v(" "), _vm._m(0)]);
  }, staticRenderFns: [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-switch__background" }, [_c('div', { staticClass: "usj-switch__knob" })]);
  }],
  props: ['id', 'labelId', 'value'],
  data: function data() {
    return {
      classes: {},
      changeHandlers: [],
      foundation: null
    };
  },
  mounted: function mounted() {
    var vm = this;
    this.foundation = new checkbox.MDCCheckboxFoundation({
      addClass: function addClass(className) {
        vm.$set(vm.classes, className, true);
      },
      removeClass: function removeClass(className) {
        vm.$delete(vm.classes, className);
      },
      registerChangeHandler: function registerChangeHandler(handler) {
        vm.changeHandlers.push(handler);
      },
      deregisterChangeHandler: function deregisterChangeHandler(handler) {
        var index = vm.changeHandlers.indexOf(handler);
        if (index >= 0) {
          vm.changeHandlers.splice(index, 1);
        }
      },
      registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
        vm.$refs.root.addEventListener(ANIM_END_EVENT_NAME, handler);
      },
      deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
        vm.$refs.root.removeEventListener(ANIM_END_EVENT_NAME, handler);
      },
      getNativeControl: function getNativeControl() {
        return vm.$refs.native;
      },
      isAttachedToDOM: function isAttachedToDOM() {
        return Boolean(vm.$el);
      }
    });
    this.foundation.init();
  },
  beforeUnmount: function beforeUnmount() {
    this.foundation.destroy();
  },
  methods: {
    fireEvent: function fireEvent(event) {
      this.changeHandlers.forEach(function (h) { return h(event); });
      this.$emit('input', event.target.checked);
    }
  }
};

var index = (function (Vue) {
  Vue.component('usj-switch', usjSwitch);
});

var updateBodyCellWidth;

var usjTable = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('table', { staticClass: "usj-table", class: _vm.classes }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    usjSortType: String,
    usjSort: String,
    usjScrollHeight: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      sortType: this.usjSortType,
      sortBy: this.usjSort,
      hasRowSelection: false,
      data: [],
      numberOfRows: 0,
      numberOfSelected: 0,
      selectedRows: {}
    };
  },
  methods: {
    emitSort: function emitSort(name) {
      this.sortBy = name;
      this.$emit('sort', {
        name: name,
        type: this.sortType
      });
    },
    emitSelection: function emitSelection() {
      this.$emit('select', this.selectedRows);
    },
    getScrollHeight: function getScrollHeight() {
      return this.usjScrollHeight;
    }
  },
  computed: {
    classes: function classes() {
      return { 'usj-table--scrollable': this.usjScrollHeight };
    }
  },
  watch: {
    data: function data() {
      this.numberOfRows = this.data.length;
    },
    selectedRows: function selectedRows() {
      this.numberOfSelected = Object.keys(this.selectedRows).length;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.parentCard = getClosestVueParent(this.$parent, 'usj-table-card');
    if (this.parentCard) {
      this.parentCard.tableInstance = this;
    }

    updateBodyCellWidth = function () {
      this$1.$el.querySelector('tbody').style.height = this$1.usjScrollHeight;
      //
      //        let elHead = this.$children
      //          .filter(child => child.headRow)[0]
      //
      //        let widthList = elHead.$children
      //          .map(child => {
      //            return child.$el.style.width
      //          })
      //
      //        this.$children
      //          .filter(child => !child.headRow)
      //          .forEach(child => {
      //            widthList.forEach((widthValue, index) => {
      //              let tdComponent = child.$children[index]
      //              tdComponent.style.width = widthValue
      //            })
      //          })
    };

    if (this.usjScrollHeight) {
      updateBodyCellWidth();
      window.addEventListener('resize', updateBodyCellWidth);
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', updateBodyCellWidth);
  }
};

var usjTableHead = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('th', { staticClass: "usj-table__head", class: _vm.classes, on: { "click": _vm.changeSort } }, [_c('div', { staticClass: "usj-table__head-container" }, [_c('div', { staticClass: "usj-table__head-text" }, [_vm.usjSortBy ? _c('usj-icon', { staticClass: "usj-sortable-icon" }, [_vm._v("arrow_downward")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.usjTooltip ? _c('usj-tooltip', [_vm._v(_vm._s(_vm.usjTooltip))]) : _vm._e()], 2)])]);
  }, staticRenderFns: [],
  components: { usjIcon: usjIcon },
  props: {
    usjNumeric: Boolean,
    usjSortBy: String,
    usjTooltip: String
  },
  data: function data() {
    return {
      sortType: null,
      sorted: false,
      parentTable: {}
    };
  },
  computed: {
    classes: function classes() {
      var matchSort = this.hasMatchSort();
      if (!matchSort) {
        this.sorted = false;
      }
      return {
        'usj-numeric': this.usjNumeric,
        'usj-sortable': this.usjSortBy,
        'usj-sorted': matchSort && this.sorted,
        'usj-sorted-descending': matchSort && this.sortType === 'desc'
      };
    }
  },
  methods: {
    hasMatchSort: function hasMatchSort() {
      return this.parentTable.sortBy === this.usjSortBy;
    },
    changeSort: function changeSort() {
      if (this.usjSortBy) {
        if (this.sortType === 'asc' && this.sorted) {
          this.sortType = 'desc';
        } else {
          this.sortType = 'asc';
        }
        this.sorted = true;
        this.parentTable.sortType = this.sortType;
        this.parentTable.emitSort(this.usjSortBy);
      }
    }
  },
  mounted: function mounted() {
    this.parentTable = getClosestVueParent(this.$parent, 'usj-table');
    if (this.hasMatchSort()) {
      this.sorted = true;
      this.sortType = this.parentTable.sortType;
    }
  }
};

var transitionClass = 'usj-transition-off';
var usjTableRow = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('tr', { staticClass: "usj-table__row", class: _vm.classes, style: { 'height': _vm.height }, on: { "click": _vm.autoSelect } }, [_vm.hasSelection ? _c('usj-table-cell', { staticClass: "usj-table-selection" }, [_c('usj-checkbox', { attrs: { "disabled": _vm.isDisabled }, on: { "change": _vm.select }, model: { value: _vm.checkbox, callback: function ($$v) {
          _vm.checkbox = $$v;
        }, expression: "checkbox" } })], 1) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    usjAutoSelect: Boolean,
    usjSelection: Boolean,
    usjItem: Object,
    height: ''
  },
  data: function data() {
    return {
      parentTable: {},
      headRow: false,
      checkbox: false,
      index: 0
    };
  },
  computed: {
    isDisabled: function isDisabled() {
      return !this.usjSelection && !this.headRow;
    },
    hasSelection: function hasSelection() {
      return this.usjSelection || this.headRow && this.parentTable.hasRowSelection;
    },
    classes: function classes() {
      return {
        'usj-selected': this.checkbox
      };
    }
  },
  watch: {
    usjItem: function usjItem(newValue, oldValue) {
      this.parentTable.data[this.index] = this.usjItem;
      this.handleMultipleSelection(newValue === oldValue);
    }
  },
  methods: {
    setSelectedRow: function setSelectedRow(value, index) {
      if (value) {
        this.parentTable.selectedRows[index] = this.parentTable.data[index];
        ++this.parentTable.numberOfSelected;
      } else {
        delete this.parentTable.selectedRows[index];
        --this.parentTable.numberOfSelected;
      }
    },
    handleSingleSelection: function handleSingleSelection(value) {
      this.setSelectedRow(value, this.index - 1);
      this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected === this.parentTable.numberOfRows;
    },
    handleMultipleSelection: function handleMultipleSelection(value) {
      var this$1 = this;

      if (this.parentTable.numberOfRows > 25) {
        this.parentTable.$el.classList.add(transitionClass);
      }
      this.parentTable.$children.forEach(function (row, index) {
        row.checkbox = value;
        if (!row.headRow) {
          this$1.setSelectedRow(value, index - 1);
        }
      });
      if (value) {
        this.parentTable.numberOfSelected = this.parentTable.numberOfRows;
      } else {
        this.parentTable.numberOfSelected = 0;
      }
      window.setTimeout(function () { return this$1.parentTable.$el.classList.remove(transitionClass); });
    },
    select: function select(value) {
      if (this.hasSelection) {
        if (this.headRow) {
          this.handleMultipleSelection(value);
        } else {
          this.handleSingleSelection(value);
        }
        this.parentTable.emitSelection();
      }
    },
    autoSelect: function autoSelect() {
      this.$emit('click', this.$el);

      if (this.usjAutoSelect && this.hasSelection) {
        this.checkbox = !this.checkbox;
        this.handleSingleSelection(this.checkbox);
        this.parentTable.emitSelection();
      }
    }
  },
  mounted: function mounted() {
    this.parentTable = getClosestVueParent(this.$parent, 'usj-table');
    if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
      this.headRow = true;
    } else {
      this.parentTable.numberOfRows++;
      this.index = this.parentTable.numberOfRows;
      if (this.usjSelection) {
        this.parentTable.hasRowSelection = true;
      }
      if (this.usjItem) {
        this.parentTable.data.push(this.usjItem);
      }
    }
  }
};

var usjTableCell = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('td', { staticClass: "usj-table__cell", class: _vm.classes, style: _vm.style }, [_c('div', { staticClass: "usj-table-cell-container" }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  props: {
    usjNumeric: Boolean
  },
  data: function () { return ({
    hasAction: false,
    style: {
      width: 'inherit'
    }
  }); },
  computed: {
    classes: function classes() {
      return {
        'usj-numeric': this.usjNumeric,
        'usj-has-action': this.hasAction
      };
    }
  },
  mounted: function mounted() {
    if (this.$children.length > 0) {
      this.hasAction = true;
    }
  }
};

var usjTableHeader = {
  functional: true,
  render: function (h, context) {
    var classes = context.data.staticClass || '';

    return h('thead', {
      staticClass: 'usj-table__header ' + classes
    }, context.children);
  }
};

var usjTableBody = {
  functional: true,
  render: function (h, context) {
    var classes = context.data.staticClass || '';

    return h('tbody', {
      staticClass: 'usj-table__body ' + classes
    }, context.children);
  }
};

function install$22(Vue) {
  Vue.component('usj-table', usjTable);
  Vue.component('usj-table-head', usjTableHead);
  Vue.component('usj-table-row', usjTableRow);
  Vue.component('usj-table-cell', usjTableCell);
  Vue.component('usj-table-header', usjTableHeader);
  Vue.component('usj-table-body', usjTableBody);
}

var debounce$2 = function (callback, limit) {
  var wait = false;

  return function () {
    if (!wait) {
      callback.call();
      wait = true;

      window.setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
};

var usjTabs = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-tabs", class: [_vm.tabClasses] }, [_c('div', { ref: "tabNavigation", staticClass: "usj-tabs-navigation", class: _vm.navigationClasses, attrs: { "usj-tag": "nav", "usj-elevation": _vm.usjElevation } }, [_vm._l(_vm.tabList, function (header) {
      return _c('button', { key: header.id, ref: "tabHeader", refInFor: true, staticClass: "usj-tab-header", class: _vm.getHeaderClass(header), attrs: { "type": "button", "disabled": header.disabled }, on: { "click": function ($event) {
            _vm.setActiveTab(header);
          } } }, [_c('div', { staticClass: "usj-tab-header-container" }, [header.icon ? _c('usj-icon', [_vm._v(_vm._s(header.icon))]) : _vm._e(), _vm._v(" "), header.label ? _c('span', [_vm._v(_vm._s(header.label))]) : _vm._e(), _vm._v(" "), header.tooltip ? _c('usj-tooltip', { attrs: { "usj-direction": header.tooltipDirection, "usj-delay": header.tooltipDelay } }, [_vm._v(_vm._s(header.tooltip))]) : _vm._e()], 1)]);
    }), _vm._v(" "), _c('span', { ref: "indicator", staticClass: "usj-tab-indicator", class: _vm.indicatorClasses })], 2), _vm._v(" "), _c('div', { ref: "tabContent", staticClass: "usj-tabs-content", style: { height: _vm.contentHeight } }, [_c('div', { staticClass: "usj-tabs-wrapper", style: { transform: ("translate3D(-" + (_vm.contentWidth) + ", 0, 0)") } }, [_vm._t("default")], 2)])]);
  }, staticRenderFns: [],
  props: {
    usjFixed: Boolean,
    usjCentered: Boolean,
    usjRight: Boolean,
    usjDynamicHeight: {
      type: Boolean,
      default: false
    },
    usjElevation: {
      type: [String, Number],
      default: 0
    }
  },
  data: function () { return ({
    tabList: {},
    activeTab: null,
    activeTabNumber: 0,
    hasIcons: false,
    hasLabel: false,
    transitionControl: null,
    transitionOff: true,
    contentHeight: '0px',
    contentWidth: '0px'
  }); },
  computed: {
    tabClasses: function tabClasses() {
      return {
        'usj-dynamic-height': this.usjDynamicHeight,
        'usj-transition-off': this.transitionOff
      };
    },
    navigationClasses: function navigationClasses() {
      return {
        'usj-has-icon': this.hasIcons,
        'usj-has-label': this.hasLabel,
        'usj-fixed': this.usjFixed,
        'usj-right': !this.usjCentered && this.usjRight,
        'usj-centered': this.usjCentered || this.usjFixed
      };
    },
    indicatorClasses: function indicatorClasses() {
      // let toLeft = this.lastIndicatorNumber > this.activeTabNumber
      // this.lastIndicatorNumber = this.activeTabNumber
      // return {
      //   'usj-transition-off': this.transitionOff,
      //   'usj-to-right': !toLeft,
      //   'usj-to-left': toLeft
      // }
    }
  },
  methods: {
    getHeaderClass: function getHeaderClass(header) {
      return {
        'usj-active': this.activeTab === header.id,
        'usj-disabled': header.disabled
      };
    },
    registerTab: function registerTab(tabData) {
      this.tabList[tabData.id] = tabData;
    },
    unregisterTab: function unregisterTab(tabData) {
      delete this.tabList[tabData.id];
    },
    updateTab: function updateTab(tabData) {
      this.registerTab(tabData);
      if (tabData.active) {
        if (!tabData.disabled) {
          this.setActiveTab(tabData);
        } else if (Object.keys(this.tabList).length) {
          var tabsIds = Object.keys(this.tabList);
          var targetIndex = tabsIds.indexOf(tabData.id) + 1;
          var target = tabsIds[targetIndex];
          if (target) {
            this.setActiveTab(this.tabList[target]);
          } else {
            this.setActiveTab(this.tabList[0]);
          }
        }
      }
    },
    observeElementChanges: function observeElementChanges() {
      this.parentObserver = new MutationObserver(debounce$2(this.calculateOnWatch, 50));
      this.parentObserver.observe(this.$refs.tabContent, {
        childList: true,
        attributes: true,
        subtree: true
      });
    },
    getTabIndex: function getTabIndex(id) {
      var idList = Object.keys(this.tabList);
      return idList.indexOf(id);
    },
    calculateIndicatorPos: function calculateIndicatorPos() {
      if (this.$refs.tabHeader && this.$refs.tabHeader[this.activeTabNumber]) {
        var tabsWidth = this.$el.offsetWidth;
        var activeTab = this.$refs.tabHeader[this.activeTabNumber];
        var left = activeTab.offsetLeft;
        var right = tabsWidth - left - activeTab.offsetWidth;
        this.$refs.indicator.style.left = left + 'px';
        this.$refs.indicator.style.right = right + 'px';
      }
    },
    calculateTabsWidthAndPosition: function calculateTabsWidthAndPosition() {
      var this$1 = this;

      var width = this.$el.offsetWidth;
      var index = 0;
      this.contentWidth = width * this.activeTabNumber + 'px';
      for (var tabId in this$1.tabList) {
        var tab = this$1.tabList[tabId];
        tab.ref.width = width + 'px';
        tab.ref.left = width * index + 'px';
        index++;
      }
    },
    calculateContentHeight: function calculateContentHeight() {
      var this$1 = this;

      this.$nextTick(function () {
        if (Object.keys(this$1.tabList).length) {
          var height = this$1.tabList[this$1.activeTab].ref.$el.offsetHeight;
          this$1.contentHeight = height + 'px';
        }
      });
    },
    calculatePosition: function calculatePosition() {
      var this$1 = this;

      window.requestAnimationFrame(function () {
        this$1.calculateIndicatorPos();
        this$1.calculateTabsWidthAndPosition();
        this$1.calculateContentHeight();
      });
    },
    debounceTransition: function debounceTransition() {
      var this$1 = this;

      window.clearTimeout(this.transitionControl);
      this.transitionControl = window.setTimeout(function () {
        this$1.calculatePosition();
        this$1.transitionOff = false;
      }, 200);
    },
    calculateOnWatch: function calculateOnWatch() {
      this.calculatePosition();
      this.debounceTransition();
    },
    calculateOnResize: function calculateOnResize() {
      this.transitionOff = true;
      this.calculateOnWatch();
    },
    setActiveTab: function setActiveTab(tabData) {
      this.hasIcons = !!tabData.icon;
      this.hasLabel = !!tabData.label;
      this.activeTab = tabData.id;
      this.activeTabNumber = this.getTabIndex(this.activeTab);
      this.calculatePosition();
      this.$emit('change', this.activeTabNumber);
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.observeElementChanges();
      window.addEventListener('resize', this$1.calculateOnResize);
      if (Object.keys(this$1.tabList).length && !this$1.activeTab) {
        var firstTab = Object.keys(this$1.tabList)[0];
        this$1.setActiveTab(this$1.tabList[firstTab]);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentObserver) {
      this.parentObserver.disconnect();
    }
    window.removeEventListener('resize', this.calculateOnResize);
  }
};

var usjTab = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-tab", style: _vm.styles, attrs: { "id": _vm.tabId } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  props: {
    id: [String, Number],
    usjLabel: [String, Number],
    usjIcon: String,
    usjActive: Boolean,
    usjDisabled: Boolean,
    usjTooltip: String,
    usjTooltipDelay: {
      type: String,
      default: '0'
    },
    usjTooltipDirection: {
      type: String,
      default: 'bottom'
    }
  },
  data: function data() {
    return {
      mounted: false,
      tabId: this.id || 'tab-' + uniqueId(),
      width: '0px',
      left: '0px'
    };
  },
  watch: {
    usjActive: function usjActive() {
      this.updateTabData();
    },
    usjDisabled: function usjDisabled() {
      this.updateTabData();
    },
    usjIcon: function usjIcon() {
      this.updateTabData();
    },
    usjLabel: function usjLabel() {
      this.updateTabData();
    },
    usjTooltip: function usjTooltip() {
      this.updateTabData();
    },
    usjTooltipDelay: function usjTooltipDelay() {
      this.updateTabData();
    },
    usjTooltipDirection: function usjTooltipDirection() {
      this.updateTabData();
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.width,
        left: this.left
      };
    }
  },
  methods: {
    getTabData: function getTabData() {
      return {
        id: this.tabId,
        label: this.usjLabel,
        icon: this.usjIcon,
        active: this.usjActive,
        disabled: this.usjDisabled,
        tooltip: this.usjTooltip,
        tooltipDelay: this.usjTooltipDelay,
        tooltipDirection: this.usjTooltipDirection,
        ref: this
      };
    },
    updateTabData: function updateTabData() {
      this.parentTabs.updateTab(this.getTabData());
    }
  },
  mounted: function mounted() {
    var tabData = this.getTabData();
    this.parentTabs = getClosestVueParent(this.$parent, 'usj-tabs');
    if (!this.parentTabs) {
      throw new Error('You must wrap the usj-tab in a usj-tabs');
    }
    this.mounted = true;
    this.parentTabs.updateTab(tabData);
    if (this.usjActive) {
      this.parentTabs.setActiveTab(tabData);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentTabs.unregisterTab(this.getTabData());
  }
};

function install$23(Vue) {
  Vue.component('usj-tabs', usjTabs);
  Vue.component('usj-tab', usjTab);
}

var usjTextfield = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticStyle: { "width": "100%" } }, [!_vm.float ? _c('span', [_c('div', { staticClass: "usj-textfield" }, [_c('input', { ref: "native", staticClass: "usj-textfield-input", attrs: { "type": "text", "id": _vm.id, "placeholder": _vm.placeholder }, domProps: { "value": _vm.value }, on: { "keyup": _vm.keyupEvent } })])]) : _vm._e(), _vm._v(" "), _vm.float ? _c('span', [_c('div', { ref: "textfield", staticClass: "usj-textfield", class: _vm.classes }, [_c('input', { ref: "native", staticClass: "usj-textfield-input", attrs: { "type": "text", "id": _vm.id }, domProps: { "value": _vm.value }, on: { "keyup": _vm.keyupEvent } }), _vm._v(" "), _c('label', { ref: "label", staticClass: "usj-textfield__label", class: _vm.labelClasses, attrs: { "for": _vm.id } }, [_vm._v(" " + _vm._s(_vm.placeholder) + " ")])]), _vm._v(" "), _c('p', { ref: "helptext", staticClass: "usj-textfield-helptext", class: _vm.helptextClasses, attrs: { "slot": "usjHelptext", "id": _vm.id + '-helptext', "aria-hidden": "true" }, slot: "usjHelptext" }, [_vm._t("helptext")], 2)]) : _vm._e()]);
  }, staticRenderFns: [],
  props: {
    id: String,
    labelId: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    float: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  data: function data() {
    return {
      hasValue: false,
      classes: {},
      helptextClasses: {}
    };
  },
  methods: {
    keyupEvent: function keyupEvent(event) {
      this.hasValue = !!event.target.value;
      this.$emit('input', event.target.value);
      this.$emit('change', event.target.value);
    }
  },
  mounted: function mounted() {
    this.$refs.native.value = this.value;
    this.hasValue = !!this.value;
  },
  computed: {
    labelClasses: function labelClasses() {
      return {
        'usj-textfield__label--float-above': this.hasValue
      };
    }
  }
};

function install$24(Vue) {
  Vue.component('usj-textfield', usjTextfield);
}

var usjToolbar = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "usj-toolbar" }, [_vm._t("default")], 2);
  }, staticRenderFns: []
};

function install$25(Vue) {
  Vue.component('usj-toolbar', usjToolbar);
}

// import usjAutocomplete from './usjAutocomplete'
// import usjFormField from './usjFormField'
// import usjGrid from './usjGrid'
// import usjTextarea from './usjTextarea'

exports.usjAdvanceSelect = install;
exports.usjAvatar = install$1;
exports.usjBackdrop = install$2;
exports.usjButton = install$3;
exports.usjButtonToggle = install$4;
exports.usjCheckbox = install$5;
exports.usjChips = install$6;
exports.usjDatetimePicker = install$7;
exports.usjDialog = install$8;
exports.usjDivider = install$9;
exports.usjDropdown = install$10;
exports.usjFile = install$11;
exports.usjIcon = install$12;
exports.usjInputContainer = install$13;
exports.usjLayout = install$14;
exports.usjList = install$15;
exports.usjListView = install$16;
exports.usjMenu = install$17;
exports.usjPage = install$18;
exports.usjRadio = install$19;
exports.usjSelect = install$20;
exports.usjSpinner = install$21;
exports.usjSwitch = index;
exports.usjTable = install$22;
exports.usjTabs = install$23;
exports.usjTextfield = install$24;
exports.usjToolbar = install$25;
