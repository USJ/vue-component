<style lang="scss">
    @import '../../style/variables';
    @import '../../style/mixins';
    /* Rows and Columns */

    .usj-layout {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;

        &.padded {
            // give some padding to inner content
            padding: 1em;
        }
    }

    @mixin layout($size: null) {
        @if $size == null {
            $size: '';
        }

        @if $size != '' {
            $size: '-#{$size}';
        }

        .usj-row#{$size} {
            flex-direction: row;
        }

        .usj-column#{$size} {
            flex-direction: column;
        }
    }

    @include layout();

    /* Container */

    .usj-layout.usj-container {
        width: 100%;
        max-width: 1200px;

        &.usj-centered {
            margin: 0 auto;
        }
    }

    /* Alignments */

    @mixin layout-align($size: null) {
        @if $size == null {
            $size: '';
        }

        @if $size != '' {
            $size: '-#{$size}';
        }

        .usj-align#{$size}-start {
            justify-content: flex-start;
        }

        .usj-align#{$size}-center {
            justify-content: center;
        }

        .usj-align#{$size}-end {
            justify-content: flex-end;
        }
    }

    @include layout-align();

    /* Vertical Alignments */

    @mixin layout-vertical-align($size: null) {
        @if $size == null {
            $size: '';
        }

        @if $size != '' {
            $size: '-#{$size}';
        }

        .usj-vertical-align#{$size}-start {
            align-items: flex-start;
            align-content: flex-start;
        }

        .usj-vertical-align#{$size}-center {
            align-items: center;
            align-content: center;
        }

        .usj-vertical-align#{$size}-end {
            align-items: flex-end;
            align-content: flex-end;
        }

        .usj-vertical-align#{$size}-stretch {
            align-items: stretch;
            align-content: stretch;
        }
    }

    @include layout-vertical-align();

    /* Gutter Size */

    @mixin layout-gutter($margin: -12px, $padding: 12px) {
        &:not(.usj-column) {
            margin-right: $margin;
            margin-left: $margin;

            > .usj-layout {
                padding-right: $padding;
                padding-left: $padding;
            }
        }

        .usj-column {
            margin-top: $margin;
            margin-bottom: $margin;

            > .usj-layout {
                padding-top: $padding;
                padding-bottom: $padding;
            }
        }
    }

    .usj-gutter {
        @include layout-gutter();

        @include layout-small {
            @include layout-gutter(-8px, 8px);
        }
    }

    $sizes: (
            8,
            16,
            24,
            40
    );

    @each $item in $sizes {
        $margin: -$item / 2 + px;
        $padding: $item / 2 + px;

        .usj-gutter-#{$item} {
            @include layout-gutter($margin, $padding);
        }
    }

    /* Flex Size */

    @mixin layout-flex($size: null) {
        @if $size == null {
            $size: '';
        }

        @if $size != '' {
            $size: '-#{$size}';
        }

        .usj-flex#{$size} {
            flex: 1 1;
        }

        .usj-flex#{$size}-33 {
            min-width: 33.33333%;
            flex: 0 1 33.33333%;
        }

        .usj-flex#{$size}-66 {
            min-width: 33.33333%;
            flex: 0 1 66.66666%;
        }

        .usj-flex-offset#{$size}-33 {
            margin-left: 33.33333%;
        }

        .usj-flex-offset#{$size}-66 {
            margin-left: 66.66666%;
        }

        @for $i from 1 through 20 {
            $counter: $i * 5;

            .usj-flex#{$size}-#{$counter} {
                min-width: #{$counter + '%'};
                flex: 0 1 #{$counter + '%'};
            }

            .usj-flex-offset#{$size}-#{$counter} {
                margin-left: #{$counter + '%'};
            }
        }
    }

    @include layout-flex();

    /* Responsive Breakpoints */

    @mixin breakpoint-layout($size) {
        @include layout($size);
        @include layout-flex($size);
        @include layout-align($size);

        .usj-hide-#{$size} {
            display: none;
        }
    }

    @include layout-xlarge {
        @include breakpoint-layout(xlarge);
    }

    @include layout-large {
        @include breakpoint-layout(large);
    }

    @include layout-medium {
        @include breakpoint-layout(medium);
    }

    @include layout-small {
        @include breakpoint-layout(small);
    }

    @include layout-xsmall {
        @include breakpoint-layout(xsmall);
    }

    @include layout-large-and-up {
        @include breakpoint-layout(large-and-up);
    }

    @include layout-medium-and-up {
        @include breakpoint-layout(medium-and-up);
    }

    @include layout-small-and-up {
        @include breakpoint-layout(small-and-up);
    }

    @include layout-xsmall-and-up {
        @include breakpoint-layout(xsmall-and-up);
    }
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
