<template>
  <ul class="usj-list">
    <slot></slot>
  </ul>
</template>

<style lang="scss">
  @import '../../style/variables.scss';

  .usj-list {
    margin: 0;
    padding: 8px 0;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    list-style: none;

    &.usj-dense {
      padding: 4px 0;

      .usj-list-item {
        &.usj-inset .usj-list-item-container {
          padding-left: 72px;
        }

        .usj-list-item-container {
          min-height: 40px;
          font-size: 13px;
          cursor: pointer;

          .usj-avatar,
          .usj-list-action {
            &:first-child {
              margin-right: 24px;
            }
          }
        }
      }

      .usj-avatar {
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
      }

      .usj-list-item-expand {
        min-height: 40px;
      }
    }

    &.usj-double-line {
      &.usj-dense {
        .usj-list-item {
          .usj-list-item-container {
            min-height: 60px;
          }

          .usj-avatar {
            width: 36px;
            min-width: 36px;
            height: 36px;
            min-height: 36px;

            .usj-avatar,
            .usj-list-action {
              &:first-child {
                margin-right: 20px;
              }
            }
          }
        }

        .usj-list-text-container {
          > :nth-child(1) {
            font-size: 13px;
          }

          > :nth-child(2) {
            font-size: 13px;
          }
        }
      }

      .usj-list-item {
        .usj-list-item-container {
          min-height: 72px;
        }
      }
    }

    &.usj-triple-line {
      &.usj-dense {
        .usj-list-item {
          .usj-list-item-container {
            min-height: 76px;
          }

          .usj-avatar {
            width: 36px;
            min-width: 36px;
            height: 36px;
            min-height: 36px;

            .usj-avatar,
            .usj-list-action {
              &:first-child {
                margin-right: 20px;
              }
            }
          }
        }

        .usj-list-text-container {
          > :nth-child(1) {
            font-size: 13px;
          }

          > :nth-child(2) {
            font-size: 13px;
          }
        }
      }

      .usj-list-item {
        .usj-list-item-container {
          min-height: 88px;
        }
      }

      .usj-avatar {
        margin: 0;
      }
    }

    .usj-subheader {
      &.usj-inset {
        padding-left: 72px;
      }
    }

    > .usj-subheader:first-of-type {
      margin-top: -8px;
    }
  }

  .usj-list-item {
    height: auto;
    position: relative;
    z-index: 2;

    &.usj-disabled {
      cursor: default;
      pointer-events: none;
    }

    &.usj-inset {
      .usj-list-item-container {
        padding-left: 72px;
      }
    }

    .badge{
      display: inline-block;
      min-width: 10px;
      padding: 3px 7px;
      /*font-size: 12px;*/
      font-weight: 500;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      background-color: #777;
      border-radius: 10px;
    }

    &.usj-active {
      background-color: rgba(#000, 0.12);
    }

    .usj-button-ghost {
      width: 100%;
      height: 100%;
      margin: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      border-radius: 0;
    }

    .usj-button:not(.usj-button-ghost):not(.usj-list-item-container) {
      position: relative;
      z-index: 2;

      .usj-icon {
        position: relative;
      }
    }

    .usj-list-item-container {
      min-height: 48px;
      margin: 0;
      padding: 0 16px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      position: relative;
      font-size: 16px;
      font-weight: 400;
      text-align: left;
      text-transform: none;

      &.usj-button {
        padding-top: 7px !important;
      }

      &:hover {
        text-decoration: none;
      }

      > .usj-icon:first-child {
        margin-right: 32px;
      }

      .usj-avatar,
      .usj-list-action {
        &:first-child {
          margin-right: 16px;
        }
      }

      .usj-list-action {
        margin: 0 -10px 0 0;

        &:nth-child(3) {
          margin: 0 -10px 0 16px;
        }
      }
    }

    .usj-divider {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .usj-icon,
    .usj-avatar,
    .usj-list-action:first-child {
      margin: 0;

      &:first-of-type + * {
        flex: 1 1 auto;
      }
    }

    .usj-avatar {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .usj-icon {
      color: rgba(#000, 0.54);
    }

    .usj-ink-ripple {
      border-radius: 0;
    }
  }

  .usj-list-item-expand {
    min-height: 48px;
    flex-flow: column wrap;
    overflow: hidden;
    transform: translate3D(0, 0, 0);

    &:before,
    &:after {
      height: 1px;
      position: absolute;
      right: 0;
      left: 0;
      z-index: 3;
      transition: $swift-ease-out;
      content: ' ';
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }

    &.usj-active {
      position: relative;

      &:before,
      &:after {
        background-color: rgba(#000, 0.12);
      }

      &:first-of-type {
        &:before {
          background: none;
        }
      }

      &:last-of-type {
        &:after {
          background: none;
        }
      }

      &.usj-active + .usj-active:before {
        background: none;
      }

      > .usj-list-item-container .usj-list-expand-indicator {
        transform: rotateZ(180deg) translate3D(0, 0, 0);
      }

      > .usj-list-expand {
        margin-bottom: 0 !important;
      }
    }

    .usj-expansion-indicator,
    .usj-list-item-container,
    .usj-icon {
      transition: $swift-ease-out;
    }

    .usj-list-expand {
      position: relative;
      z-index: 1;
      transform: translate3D(0, 0, 0);
      will-change: margin-bottom;
      transition: $swift-ease-in-out;

      &.usj-transition-off {
        transition: none !important;
      }

      .usj-list {
        padding: 0;
      }
    }
  }

  .usj-list-text-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    overflow: hidden;
    line-height: 1.25em;
    white-space: normal;

    > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > :nth-child(1) {
      font-size: 16px;
    }

    > :nth-child(2),
    > :nth-child(3) {
      margin: 0;
      color: rgba(#000, 0.54);
      font-size: 14px;
    }

    > :nth-child(2):not(:last-child) {
      color: rgba(#000, 0.87);
    }
  }
</style>
