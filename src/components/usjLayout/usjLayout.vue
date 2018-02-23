<style lang="scss" src="./usjLayout.scss">

</style>

<script>
export default {
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
    classes() {
      let classes = {
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
      }
      if (this.usjGutter) {
        if (typeof this.usjGutter === 'boolean') {
          classes['usj-gutter'] = true
        } else if (this.usjGutter) {
          classes['usj-gutter-' + this.usjGutter] = true
        }
      }
      /* Flex */
      this.generatePropClasses('usj-flex', '', 'usjFlex', classes)
      this.generatePropClasses('usj-flex', 'xsmall', 'usjFlexXsmall', classes)
      this.generatePropClasses('usj-flex', 'small', 'usjFlexSmall', classes)
      this.generatePropClasses('usj-flex', 'medium', 'usjFlexMedium', classes)
      this.generatePropClasses('usj-flex', 'large', 'usjFlexLarge', classes)
      this.generatePropClasses('usj-flex', 'xlarge', 'usjFlexXlarge', classes)
      /* Flex Offset */
      this.generatePropClasses('usj-flex-offset', '', 'usjFlexOffset', classes)
      this.generatePropClasses(
        'usj-flex-offset',
        'xsmall',
        'usjFlexOffsetXsmall',
        classes
      )
      this.generatePropClasses(
        'usj-flex-offset',
        'small',
        'usjFlexOffsetSmall',
        classes
      )
      this.generatePropClasses(
        'usj-flex-offset',
        'medium',
        'usjFlexOffsetMedium',
        classes
      )
      this.generatePropClasses(
        'usj-flex-offset',
        'large',
        'usjFlexOffsetLarge',
        classes
      )
      this.generatePropClasses(
        'usj-flex-offset',
        'xlarge',
        'usjFlexOffsetXlarge',
        classes
      )
      /* Horizontal Alignment */
      this.generatePropClasses('usj-align', '', 'usjAlign', classes)
      this.generatePropClasses('usj-align', 'xsmall', 'usjAlignXsmall', classes)
      this.generatePropClasses('usj-align', 'small', 'usjAlignSmall', classes)
      this.generatePropClasses('usj-align', 'medium', 'usjAlignMedium', classes)
      this.generatePropClasses('usj-align', 'large', 'usjAlignLarge', classes)
      this.generatePropClasses('usj-align', 'xlarge', 'usjAlignXlarge', classes)
      /* Vertical Alignment */
      this.generatePropClasses(
        'usj-vertical-align',
        '',
        'usjVerticalAlign',
        classes
      )
      this.generatePropClasses(
        'usj-vertical-align',
        'xsmall',
        'usjVerticalAlignXsmall',
        classes
      )
      this.generatePropClasses(
        'usj-vertical-align',
        'small',
        'usjVerticalAlignSmall',
        classes
      )
      this.generatePropClasses(
        'usj-vertical-align',
        'medium',
        'usjVerticalAlignMedium',
        classes
      )
      this.generatePropClasses(
        'usj-vertical-align',
        'large',
        'usjVerticalAlignLarge',
        classes
      )
      this.generatePropClasses(
        'usj-vertical-align',
        'xlarge',
        'usjVerticalAlignXlarge',
        classes
      )
      return classes
    }
  },
  methods: {
    generatePropClasses(prop, size, name, object) {
      if (size) {
        size = '-' + size
      }
      if (this[name]) {
        if (typeof this[name] === 'boolean') {
          if (!this[name]) {
            object[prop + size + '-none'] = true
          } else {
            object[prop + size] = true
          }
        } else {
          object[prop + size + '-' + this[name]] = true
        }
      }
    }
  },
  render(createElement) {
    return createElement(
      this.usjTag,
      {
        staticClass: 'usj-layout',
        class: this.classes
      },
      this.$slots.default
    )
  }
}
</script>
