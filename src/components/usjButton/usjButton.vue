<template>
  <button ref="root" class="usj-button" @click="fireEvent">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['usjValue'],
  methods: {
    fireEvent: function(e) {
      this.$emit('click', e)
    },
    getValue() {
      return this.usjValue
    }
  }
}
</script>

<style lang="scss">
  @import '../../style/variables.scss';
  @import '../../style/elevation';

  // TODO: need to migrate to postcss
  $gray6: #969696;

  $button-width: 88px;
  $button-height: 36px;
  $button-radius: 2px;

  $button-fab-size: 56px;
  $button-fab-size-mini: 40px;
  $button-fab-space: 24px;

  $button-dense-height: 32px;
  $button-icon-size: 40px;

  $button-font-size: 14px;
  .usj-button {
    font-family: $font-family;
    min-width: $button-width;
    //width:100%;
    min-height: $button-height;
    margin: 6px 8px;
    padding: 5px 16px;
    //margin: $button-margin;
    //padding: $button-padding;
    display: inline-block;
    position: relative;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
    outline: none;
    background: none;
    border: 0;
    border-radius: $button-radius;
    transition: $swift-ease-out;
    color: $gray6;
    font-size: $button-font-size;
    font-style: inherit;
    font-variant: inherit;
    font-weight: 500;
    letter-spacing: inherit;
    line-height: $button-height;
    text-align: center;
    // text-transform: uppercase;
    text-decoration: none;
    vertical-align: top;
    white-space: nowrap;

    &.large {
      font-size: $button-font-size * 1.3;
      padding: $button-height*0.35 0;
    }

    &.max-width {
      width: 100%;
    }

    &.normal {
      margin: 20px 0;
      padding: 5px 18px;
    }

    &.usj-primary {
      background-color: $usj-theme-orange;
      color: white;

      &:hover {
        background-color: darken($usj-theme-orange, 10) !important;
      }
      &[disabled] {
        background-color: #cfcfcf;
      }
    }

    &.usj-secondary {
      background-color: lighten(black, 70);
      color: white;
    }

    &.usj-danger {
      $bgcolor: lighten(red, 10);
      background-color: $bgcolor;
      color: white;

      &:hover {
        background-color: darken($bgcolor, 20) !important;
      }
    }

    &--raised {
      @include elevate(1);
    }

    &:focus {
      outline: none;
    }

    &::-moz-focus-inner {
      border: 0;
    }

    &:hover {
      &:not([disabled]) {
        &:not(.usj-raised) {
          background-color: rgba(#999, 0.2);
          text-decoration: none;
        }

        &.usj-raised {
          background-color: rgba(#000, 0.12);
        }
      }
    }

    &:active:not([disabled]) {
      background-color: rgba(#999, 0.4);
    }

    &.usj-raised:not([disabled]) {
      //@include mdc-elevation(4);

      // @extend .mdc-elevation-z4;
      // box-shadow: $material-shadow-2dp;
    }

    &.usj-dense {
      min-height: $button-dense-height;
      line-height: $button-dense-height;
      font-size: 13px;
    }

    &.usj-icon-button,
    &.usj-fab {
      .usj-icon {
        position: absolute;
        top: 1px;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &.usj-icon-button {
      width: $button-icon-size;
      min-width: $button-icon-size;
      height: $button-icon-size;
      margin: 0 6px;
      padding: 8px;
      border-radius: 50%;
      line-height: 24px;

      &:not([disabled]) {
        &:hover {
          background: hsla(0, 0%, 60%, 0.2);
        }
      }

      &.usj-icon-background {
        background: lightgrey;
        min-width: 36px;
        width: 36px;
        height: 30px;
      }

      &.usj-inverse {
        background: #969696;
        color: white;
        min-width: 36px;
        width: 36px;
        height: 30px;

        &:hover {
          background: #ff5520;
        }
      }

      &.usj-dense {
        width: $button-dense-height;
        min-width: $button-dense-height;
        height: $button-dense-height;
        min-height: $button-dense-height;
        padding: 4px;
        line-height: $button-dense-height;
      }

      .usj-ink-ripple {
        border-radius: 50%;

        .usj-ripple {
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
        }
      }

      .usj-ripple.usj-active {
        animation-duration: 0.9s;
      }
    }

    &.usj-fab {
      width: $button-fab-size;
      height: $button-fab-size;
      padding: 0;
      min-width: 0;
      overflow: hidden;
      //@include mdc-elevation(4);

      // box-shadow: $material-shadow-2dp;
      // @extend .mdc-elevation-z4;

      border-radius: $button-fab-size;
      line-height: $button-fab-size;
      background-clip: padding-box;
      transition: $swift-ease-out;
      transition-property: background-color, box-shadow, transform;

      &:hover,
      &:focus {
        //@include mdc-elevation(4);

        // @extend .mdc-elevation-z4;
        // box-shadow: $material-shadow-5dp;
      }

      &.usj-mini {
        width: $button-fab-size-mini;
        height: $button-fab-size-mini;
        line-height: $button-fab-size-mini;
      }

      .usj-ink-ripple {
        border-radius: $button-fab-size;
      }
    }

    &[disabled] {
      color: rgba(#000, 0.26);
      cursor: default;
      pointer-events: none;

      &.usj-raised,
      &.usj-fab {
        background-color: rgba(#000, 0.12);
      }

      &.usj-fab {
        box-shadow: none;
      }
    }

    &:after {
      transition: $swift-ease-out;
    }

    .usj-ink-ripple {
      border-radius: $button-radius;
      background-clip: padding-box;
      overflow: hidden;
    }
  }

  .usj-button.usj-button--default {
    background: $color-background-button-default;
    color: $usj-text-color;
  }

  .usj-button.usj-button--primary {
    background: $color-background-button-primary;
    color: $color-button-primary;
  }

  .usj-button.usj-icon-button,
  .usj-button.usj-fab {
    .usj-icon {
      display: block;
    }
  }

  .usj-fab,
  .usj-speed-dial {
    &.usj-fab-top-left,
    &.usj-fab-top-center,
    &.usj-fab-top-right,
    &.usj-fab-bottom-left,
    &.usj-fab-bottom-center,
    &.usj-fab-bottom-right {
      margin: 0;
      position: absolute;
      z-index: 10;
    }

    &.usj-fab-top-left {
      top: $button-fab-space;
      left: $button-fab-space;
    }

    &.usj-fab-top-center {
      top: $button-fab-space;
      left: 50%;
      transform: translateX(-50%);
    }

    &.usj-fab-top-right {
      top: $button-fab-space;
      right: $button-fab-space;
    }

    &.usj-fab-bottom-left {
      bottom: $button-fab-space;
      left: $button-fab-space;
    }

    &.usj-fab-bottom-center {
      bottom: $button-fab-space;
      left: 50%;
      transform: translateX(-50%);
    }

    &.usj-fab-bottom-right {
      right: $button-fab-space;
      bottom: $button-fab-space;
    }
  }

  .usj-button-tooltip {
    &.usj-tooltip-top {
      margin-top: -8px;
    }

    &.usj-tooltip-right {
      margin-left: 8px;
    }

    &.usj-tooltip-bottom {
      margin-top: 8px;
    }

    &.usj-tooltip-left {
      margin-left: -8px;
    }
  }
</style>

