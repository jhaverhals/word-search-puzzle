export function arrayToUpperCase(letterArray: string[]): string[] {
  for (var i = 0; i < letterArray.length; i++) {
    letterArray[i] = letterArray[i].toUpperCase()
  }
  return letterArray
}
