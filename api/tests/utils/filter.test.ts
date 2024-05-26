import { describe, expect, it } from '@jest/globals'

import { filter } from '../../src/utils/filter'

describe('filter function', () => {
  it('should remove special characters', () => {
    const text = 'Hello, world!'
    const result = filter(text)
    expect(result).toBe('Helloworld')
  })
})
