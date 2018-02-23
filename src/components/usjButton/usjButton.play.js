import { play } from 'vue-play'

import usjButton from './usjButton.vue'
import usjIcon from '../usjIcon/usjIcon.vue'

play('USJ Button')
  .add('basic', {
    components: { usjButton },
    template: `
<div>
<usj-button class="usj-primary" :disabled="true">Primary Disabled button</usj-button>
<usj-button :disabled="true">Default Disabled button</usj-button>
<usj-button class="usj-button--raised usj-button--accent" @click="$log('Clicked !')">Click me</usj-button>
</div>
    `
  })
  .add('icon button', {
    components: { usjIcon, usjButton },
    template: `
      <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <p> Default <usj-button class="usj-icon-button"><usj-icon>home</usj-icon></usj-button></p>
      <p> Background <usj-button class="usj-icon-button usj-icon-background"><usj-icon>home</usj-icon></usj-button></p>
      <p> Inverse <usj-button class="usj-icon-button usj-inverse"><usj-icon>home</usj-icon></usj-button></p>
      </div>
    `
  })
