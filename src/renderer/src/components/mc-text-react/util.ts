export function isString(val: unknown): val is string {
  return (
    typeof val === 'string' ||
    (!!val && typeof val === 'object' && Object.prototype.toString.call(val) === '[object String]')
  )
}
