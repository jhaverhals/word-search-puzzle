export enum Direction {
  LtR = 'Left to right',
  RtL = 'Right to left',
  TopDown = 'Top down',
  BottumUp = 'Bottom up',
  TopLBottomR = 'Top left to bottom right',
  BottomRTopL = 'Bottom right to top left',
  BottomLTopR = 'Bottom left to top right',
  TopRBottomL = 'Top right to bottom left',
}

export const ALL_DIRECTIONS = Object.values(Direction);
