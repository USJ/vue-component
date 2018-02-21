<template>
  <div class="usj-list-view-list">
    <div class="usj-list-view__list-wrapper">
      <ul class="usj-list-view__list">
        <slot v-for="item in items" :data="item">
          <!-- fallback content here -->
          Test content
        </slot>
      </ul>
    </div>

    <div class="usj-list-view__list-bottom" ref="bottom-placeholder"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    methods: {
      setBottomEl (el) {
        this.$refs['bottom-placeholder'].appendChild(el)
      }
    }
  }
</script>
