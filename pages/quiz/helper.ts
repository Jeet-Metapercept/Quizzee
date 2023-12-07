export function getValidQuizIdFromRouteParam(param: string | string[]): string | null {
  if (Array.isArray(param))
    return param.length > 0 ? param[0] : null

  if (typeof param === 'string')
    return param

  return null
}
