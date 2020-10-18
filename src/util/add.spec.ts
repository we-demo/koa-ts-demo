import { add } from './add' // from src
// import { add } from '../dist/add' // from dist

describe('add', () => {
  it('1+2=3', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('1+3=7 (failing)', () => {
    expect(add(1, 3)).toBe(7)
  })
})
