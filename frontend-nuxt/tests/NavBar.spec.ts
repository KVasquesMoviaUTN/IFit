import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import NavBar from '../components/NavBar.vue'
import { createTestingPinia } from '@pinia/testing'

describe('NavBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            auth: { user: null },
            cart: { items: [] }
          }
        })],
        stubs: {
          NuxtLink: true,
          FontAwesomeIcon: true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
