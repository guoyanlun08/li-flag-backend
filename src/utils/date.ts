/** 判断是否是今天 */
export function isTody(date: Date) {
  const today = new Date().setHours(0, 0, 0, 0);

  return new Date(date).setHours(0, 0, 0, 0) === today;
}
