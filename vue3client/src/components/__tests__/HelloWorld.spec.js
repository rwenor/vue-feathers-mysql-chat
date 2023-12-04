import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import { setActivePinia, createPinia } from 'pinia'
import {useCounterStore} from '../../stores/counter'

function factory() {
  setActivePinia(createPinia())
  const cntStore = useCounterStore()

  return mount(HelloWorld, { 
    props: { msg: 'Hello Vitest' },
    global: {
      //plugins: [cntStore]
      provide: {
        'cntStore': cntStore
      }
    } 
  })
}

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = factory()
    console.log(wrapper.wm)

    console.log(wrapper.html)
    
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
