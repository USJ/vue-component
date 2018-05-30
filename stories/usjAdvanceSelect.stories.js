import Vue from 'vue'
import {
    storiesOf
} from '@storybook/vue';

import usjIcon from '../src/components/usjIcon'
import usjInputContainer from '../src/components/usjInputContainer'
import usjAdvanceSelect from '../src/components/usjAdvanceSelect'

Vue.use(usjAdvanceSelect)
Vue.use(usjIcon)
Vue.use(usjInputContainer)

storiesOf('usjAdvanceSelect', module)
    .add('Basic single select (disabled)', () => ({
        template: `
    <usj-input-container>
    <usj-advance-select :options="sampleOptions" disabled></usj-advance-select>
    </usj-input-container>
    `,
        data() {
            return {
                sampleOptions: [{
                    label: 'Option 1',
                    value: 'Option 1'
                }]
            }
        }
    }))