// 生成自增的长度为n的数组，从0开始
export const generateArray = function (n: number): number[] {
  return [...Array(n).keys()]
}
