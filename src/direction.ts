export enum Direction {
  LtR = 'Left to right',
  RtL = 'Right to left',
  TopBottom = 'Top bottom',
  BottomUp = 'Bottom up',
  TopLBottomR = 'Top left to bottom right',
  BottomLTopR = 'Bottom left to top right',
  TopRBottomL = 'Top right to bottom left',
  BottomRTopL = 'Bottom right to top left',
}

export const ALL_DIRECTIONS = Object.values(Direction)
