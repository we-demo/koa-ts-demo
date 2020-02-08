import test from 'ava'
import { add } from './add' // from src
// import { add } from '../dist/add' // from dist

test('add', async t => {
  t.is(add(1, 2), 3)
})

test('failed', async t => {
  t.is(add(1, 3), 7)
})
