<template>
  <div class="usj-toolbar">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import '../../style/variables.scss';

  .usj-toolbar {
    min-height: 64px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
    position: relative;
    transition: $swift-ease-out;
    transform: translate3D(0, 0, 0);

    &.usj-dense {
      min-height: 48px;

      &.usj-medium {
        min-height: 72px;
      }

      &.usj-large {
        min-height: 96px;
      }

      .usj-toolbar-container {
        height: 48px;
      }
    }

    &.usj-medium {
      min-height: 88px;

      .usj-toolbar-container:nth-child(2) {
        .usj-title:first-child {
          margin-left: 56px;
        }
      }
    }

    &.usj-large {
      min-height: 128px;
      align-content: inherit;

      .usj-toolbar-container:nth-child(2) {
        .usj-title:first-child {
          margin-left: 56px;
        }
      }
    }

    &.usj-account-header {
      min-height: 164px;

      .usj-ink-ripple {
        color: #fff;
      }

      .usj-list-item-container {
        &:hover:not([disabled]) {
          background-color: rgba(#fff, 0.12);
        }
      }

      .usj-avatar-list {
        margin: 16px 0 8px;

        .usj-list-item-container {
          align-items: flex-start;
        }

        .usj-avatar + .usj-avatar {
          margin-left: 16px;
        }
      }
    }

    .usj-toolbar-container {
      width: 100%;
      height: 64px;
      display: flex;
      align-items: center;
      align-self: flex-start;

      > .usj-button {
        &:first-child {
          margin-left: 0;
          margin-right: 16px;
        }

        + .usj-button {
          margin-left: 0;
        }
      }
    }

    > .usj-button {
      &:first-child {
        margin-left: 0;
        margin-right: 16px;
      }

      + .usj-button {
        margin-left: 0;
      }
    }

    .usj-button:hover {
      &:not([disabled]):not(.usj-raised):not(.usj-icon-button):not(.usj-fab) {
        background-color: rgba(#fff, 0.1);
      }
    }

    .usj-title {
      margin: 0;
      font-size: 20px;
      font-weight: 400;

      &:first-child {
        margin-left: 8px;
      }

      + .usj-input-container {
        margin-left: 24px;
      }
    }

    .usj-input-container {
      min-height: 32px;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
    }

    .usj-list {
      padding: 0;
      margin: 0 -8px;
      flex: 1;
    }
  }
</style>