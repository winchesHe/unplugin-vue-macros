import { readFile } from 'node:fs/promises'
import type { Plugin } from 'esbuild'

const rawRE = /[&?]raw(?:&|$)/
export const EsbuildRawPlugin = (): Plugin => ({
  name: 'raw-plugin',
  setup(build) {
    build.onLoad({ filter: /.*/ }, async ({ path, suffix }) => {
      if (!rawRE.test(suffix)) return

      let contents = await readFile(path, 'utf-8')
      const isTS = path.endsWith('.ts')
      if (isTS)
        contents = (
          await build.esbuild.transform(contents, {
            loader: isTS ? 'ts' : 'js',
            minifyWhitespace: true,
          })
        ).code

      return {
        contents: `export default ${JSON.stringify(contents)}`,
      }
    })
  },
})
