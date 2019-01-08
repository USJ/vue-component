import Vue from 'vue'

import {
    storiesOf
} from '@storybook/vue';

storiesOf('USJ Input', module)
    .add('basic', () => ({
        template: `
    <usj-input-container class="usj-input-focused">
        <label>Input</label>
        <usj-input>
        </usj-input>
    </usj-input-container>
    `
    }))