<template>
  <div class="usj-list-view-details">
    <div class="usj-list-view__details">
      <div class="usj-list-view__details-inner">
        <slot></slot>
      </div>
    </div>

    <div class="usj-list-view__details-bottom" ref="bottom-placeholder"></div>
  </div>
</template>

<script>
export default {
  methods: {
    setBottomEl(el) {
      this.$refs['bottom-placeholder'].appendChild(el)
    }
  }
}
</script>

<style lang="scss">
.usj-list-view-details {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 371px;
  overflow-y: auto;
}

.usj-list-view__details {
  bottom: 100px;
  left: 0;
}

.usj-list-view__action {
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  background: #f4f4f4;
  box-shadow: 0 -1px 4px 0;

  &__button {
    float: right;
    margin-right: 27px;
    margin-top: 22px;
  }
}
</style>
