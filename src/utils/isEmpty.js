export default function (obj) {
  if (!obj) {
    return true
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
