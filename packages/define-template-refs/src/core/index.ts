import {
  DEFINE_TEMPLATE_REFS,
  MagicString,
  getTransformResult,
  isCallOf,
  parseSFC,
} from '@vue-macros/common'
import { helperCode, helperId } from './helper'

export function transformDefineTemplateRefs(code: string, id: string) {
  if (!code.includes(DEFINE_TEMPLATE_REFS)) return

  const { scriptSetup, getSetupAst } = parseSFC(code, id)
  if (!scriptSetup) return

  const s = new MagicString(code)

  for (const stmt of getSetupAst()!.body) {
    if (
      stmt.type === 'ExpressionStatement' &&
      isCallOf(stmt.expression, DEFINE_TEMPLATE_REFS)
    ) {
      s.overwriteNode(stmt, `/*${DEFINE_TEMPLATE_REFS}*/`, {
        offset: scriptSetup.loc.start.offset,
      })
    }
  }

  return getTransformResult(s, id)
}
