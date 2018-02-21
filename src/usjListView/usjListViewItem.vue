<template>
  <li class="usj-list-view-item" @click="$emit('click')">
    <slot>
      <div class="usj-list-view-item__line1--placeholder"></div>
      <div class="usj-list-view-item__line2--placeholder"></div>
    </slot>
  </li>
</template>
