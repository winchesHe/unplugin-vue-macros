import { resolve } from 'node:path'
import { describe } from 'vitest'
import {
  RollupEsbuildPlugin,
  RollupEscapeNullCharacterPlugin,
  RollupRemoveVueFilePathPlugin,
  RollupVue,
  RollupVue2,
  rollupBuild,
  testFixtures,
} from '@vue-macros/test-utils'
import VueReactivityTransform from '../src/rollup'

describe('fixtures', async () => {
  await testFixtures(
    'tests/fixtures/**/*.{vue,js,ts}',
    (args, id) => {
      if (id.includes('vue2'))
        return rollupBuild(id, [
          VueReactivityTransform(),
          RollupVue2({
            compiler: require('vue2/compiler-sfc'),
          }),
          RollupRemoveVueFilePathPlugin(),
          RollupEscapeNullCharacterPlugin(),
          RollupEsbuildPlugin({
            target: 'esnext',
          }),
        ])
      else
        return rollupBuild(id, [
          VueReactivityTransform(),
          RollupVue({
            compiler: require('@vue/compiler-sfc'),
          }),
          RollupRemoveVueFilePathPlugin(),
          RollupEsbuildPlugin({
            target: 'esnext',
          }),
        ])
    },
    {
      cwd: resolve(__dirname, '..'),
      promise: true,
    }
  )
})
