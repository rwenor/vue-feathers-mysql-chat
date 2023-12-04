import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

import {useCounterStore} from '../../stores/counter'

import { provide } from 'vue'

import { setActivePinia, createPinia } from 'pinia'

function factory() {
  setActivePinia(createPinia())
  const CounterStore = useCounterStore()

  return mount(HelloWorld, { 
    props: { msg: 'Hello Vitest' },
    global: {
      provide: {
        'CounterStore': CounterStore
      }
    }
  })
}

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
