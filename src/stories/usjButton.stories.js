import {
  storiesOf
} from '@storybook/vue'

import {
  action
} from '@storybook/addon-actions'

import usjButton from '../components/usjButton/usjButton.vue'
import usjIcon from '../components/usjIcon/usjIcon.vue'

storiesOf('USJ Button', module)
  .add('basic', () => ({
    components: {
      usjButton
    },
    methods: {
      action: action('clicked')
    },
    template: `
<div>
<usj-button class="usj-primary" :disabled="true">Primary Disabled button</usj-button>
<usj-button :disabled="true">Default Disabled button</usj-button>
<usj-button class="usj-button--raised usj-button--accent" @click="action">Click me</usj-button>
</div>
    `
  }))
  .add('icon button', () => ({
    components: {
      usjIcon,
      usjButton
    },
    template: `
      <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <p> Default <usj-button class="usj-icon-button"><usj-icon>home</usj-icon></usj-button></p>
      <p> Background <usj-button class="usj-icon-button usj-icon-background"><usj-icon>home</usj-icon></usj-button></p>
      <p> Inverse <usj-button class="usj-icon-button usj-inverse"><usj-icon>home</usj-icon></usj-button></p>
      </div>
    `
  }))