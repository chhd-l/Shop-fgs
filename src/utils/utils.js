export function formatMoney (val) {
  val = val + ''
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}