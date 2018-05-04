import usjMenu from '../usjMenu'
import usjList from '../usjList'
import usjBackdrop from '../usjBackdrop'

import usjSelect from './usjSelect.vue'

import { createLocalVue, shallow, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(usjBackdrop)
localVue.use(usjList)
localVue.use(usjMenu)

describe('usjSelect', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(usjSelect, {
      localVue
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(true).toBeTruthy()
  })
})
