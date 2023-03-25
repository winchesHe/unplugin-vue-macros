import { defineConfig } from 'tsup'
import { EsbuildRawPlugin } from '@vue-macros/test-utils'

export default defineConfig({
  entry: ['./src/*.ts'],
  format: ['cjs', 'esm'],
  target: 'node14',
  splitting: true,
  watch: !!process.env.DEV,
  dts: process.env.DEV
    ? false
    : {
        compilerOptions: {
          composite: false,
          customConditions: [],
        },
      },
  tsconfig: '../../tsconfig.lib.json',
  clean: true,
  define: {
    'import.meta.DEV': JSON.stringify(!!process.env.DEV),
  },
  esbuildPlugins: [EsbuildRawPlugin()],
})
