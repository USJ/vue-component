<template>
  <div
    class="usj-select"
    :class="rootClasses"
    @keydown.up="handleUpKey"
    @keydown.down="handleDownKey"
    @keyup.enter="handleEnterKey"
  >
    <input type="hidden" :id="id" :name="name" ref="hiddenInput" :value="singleItem.value">
    <div class="usj-select__control" @click="handleControlClick">
      <div class="usj-select__value" v-if="!multiple && showValueEl">
        <slot v-bind="singleLabel" v-if="hasDefaultSlot"></slot>
        <span v-else>{{ singleLabel }}</span>
      </div>
      <div class="usj-select__multiple-value" v-if="showValueEl && multiple">
        <div class="item" v-for="(item, index) in multipleItems" :key="index">
          <div class="item__label">
            <slot v-bind="item" v-if="hasDefaultSlot"></slot>
            <span v-else>{{ item }}</span>
          </div>
          <div class="item__remove" @click.prevent.stop="removeItem(item, index)">
            <usj-icon>clear</usj-icon>
          </div>
        </div>
      </div>
      <div
        class="usj-select__placeholder"
        v-if="!hasSelected || showPlaceholderEl"
      >{{ placeholder }}</div>
      <div class="usj-select__input">
        <input
          type="text"
          ref="input"
          id="input-id"
          v-show="searchable"
          @focus="handleInputFocus"
          v-model="searchValue"
          @input="handleInputInput"
          @blur="handleInputBlur"
        >
        <div class="placeholder"></div>
      </div>
      <div class="usj-select__clear" v-if="clearable" @click.prevent.stop="clear">
        <usj-icon>clear</usj-icon>
      </div>
      <div class="usj-select__dropdown">
        <!--<usj-icon>arrow_drop_down</usj-icon>-->
      </div>
    </div>

    <div class="usj-select__menu-wrapper" v-show="showMenuEl">
      <ul class="usj-select__menu">
        <li
          class="usj-select__menu-item_disable_option"
          v-if="menuItems.length < 1 && !loading"
        >No options available</li>
        <li class="usj-select__menu-item_disable_option" v-if="loading">Loading...
          <usj-spinner></usj-spinner>
        </li>
        <li
          class="usj-select__menu-item"
          v-for="(item, index) in menuItems"
          :key="item.value"
          @mousedown="handleMenuItemClick(item)"
          @mouseover="handleMenuItemMouseOver(item, index)"
          :class="{ 'highlighted': index === highlightIdx }"
        >
          <slot v-bind="item" v-if="hasDefaultSlot"></slot>
          <span v-else>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="postcss">
@import "../../style/variables.css";

.usj-select {
  width: 100%;
  position: relative;
  /* //background-color: red; */
  &.is-disabled {
    cursor: not-allowed;

    .usj-select__control {
      cursor: not-allowed;
      background: color(white blackness(30%));
    }
  }

  & .usj-select__control {
    position: relative;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #ccc;
    border-radius: 0.2em;
  }

  & .usj-select__value {
    position: absolute 0;

    max-width: 100%;
    padding: 0 34px 0 10px;
    line-height: 34px;
  }

  & .usj-select__multiple-value {
    position: absolute 0;

    .is-multiple & {
      display: inline-block;
      position: inherit;
    }

    .item {
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 0.2em;
      margin-left: 0.2em;
      margin-top: 0.2em;

      &__label {
        display: inline;
        padding: 4px 2px 4px 5px;
        line-height: 1.1em;
        vertical-align: middle;
      }

      &__remove {
        display: inline;
        cursor: pointer;
        border-left: 1px solid #ccc;
        padding-bottom: 2px;
        & > i {
          font-size: 100%;
          margin-right: -4px;
          margin-left: 3px;
        }
      }
    }
  }

  & .usj-select__clear {
    position: absolute 15% 2em 0 auto;
    cursor: pointer;

    z-index: 1;
    //font-size: 50%;

    &:hover {
      color: blue;
    }
  }

  & .usj-select__dropdown {
    position: absolute 20% 0.5em 0 auto;
    cursor: pointer;
  }

  & .usj-select__placeholder {
    position: absolute 0;

    max-width: 100%;
    padding: 0 34px 0 10px;
    line-height: 34px;
  }

  & .usj-select__input {
    .is-multiple & {
      display: inline-block;
      position: inherit;

      input {
        display: inline;
      }
      .placeholder {
        display: inline;
      }
    }

    & input:focus {
      outline: none;
    }

    .placeholder {
      .is-searchable & {
        display: none;
      }

      height: 2em;
    }

    input,
    .placeholder {
      border: 0;
      line-height: 34px;

      font-size: 1em;
      padding-left: 10px;
    }
  }

  & .usj-select__menu-wrapper {
    z-index: 30;
    position: absolute;
    background: white;
    width: 100%;
    //display: none;
  }

  & .usj-select__menu {
    list-style-type: none;
    margin: 0;
    padding: 0;

    border-radius: 0.2em;
    border-style: solid;
    border-color: #ccc;
    border-width: 1px;
    max-height: 250px;

    overflow-y: scroll;
  }

  & .usj-select__menu-item {
    cursor: pointer;
    padding: 0.5em;
    z-index: 1;

    .usj-select__menu-item_disable_option {
      background: lightgrey;
      display: inline-flex;
      width: 100%;
      padding: 10px;
    }

    &:hover {
      background: color(white blackness(10%));
    }

    &.highlighted {
      background: color(white blackness(5%));
    }
  }
}
</style>
