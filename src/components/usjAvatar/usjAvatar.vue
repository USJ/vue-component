<template>
  <div class="usj-avatar">
    <slot></slot>
  </div>
</template>

<style lang="postcss">
  @import '../../style/variables.css';

  :root {
    --avatar-size: 40px;
    --avatar-large-size: 64px;
    --avatar-large-icon: 40px;
  }

  .usj-avatar {
    width: var(--avatar-size);
    min-width: var(--avatar-size);
    height: var(--avatar-size);
    min-height: var(--avatar-size);
    margin: auto;
    display: inline-block;
    overflow: hidden;
    user-select: none;
    position: relative;
    border-radius: var(--avatar-size);
    vertical-align: middle;

    &.usj-large {
      width: var(--avatar-large-size);
      min-width: var(--avatar-large-size);
      height: var(--avatar-large-size);
      min-height: var(--avatar-large-size);
      border-radius: var(--avatar-large-size);

      .usj-icon {
        width: var(--avatar-large-icon);
        min-width: var(--avatar-large-icon);
        height: var(--avatar-large-icon);
        min-height: var(--avatar-large-icon);
        font-size: var(--avatar-large-icon);
        line-height: var(--avatar-large-icon);
      }
    }

    &.usj-avatar-icon {
      background-color: rgba(#000, 0.38);

      .usj-icon {
        color: #fff;
      }
    }

    .usj-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .usj-ink-ripple {
      border-radius: 50%;

      .usj-ripple.usj-active {
        animation-duration: 0.9s;
      }
    }
  }

  .usj-avatar-tooltip {
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

<script>
export default {
  name: 'usj-avatar'
}
</script>
