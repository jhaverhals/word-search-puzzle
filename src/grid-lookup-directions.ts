import {Direction} from './direction'
import {gridSide} from './grid'

type LookupDirectionsForGridSide = {
  side: gridSide
  directions: Direction[]
}

export class LookupDirections {
  static _lookupDirections: LookupDirectionsForGridSide[] = [
    {side: gridSide.Left, directions: [Direction.LtR, Direction.BottomLTopR, Direction.TopLBottomR]},
    {side: gridSide.Top, directions: [Direction.TopBottom, Direction.TopRBottomL, Direction.TopLBottomR]},
    {side: gridSide.Right, directions: [Direction.RtL, Direction.BottomRTopL, Direction.TopRBottomL]},
    {side: gridSide.Bottom, directions: [Direction.BottomUp, Direction.BottomLTopR, Direction.BottomRTopL]},
  ]

  public static getDirections(side: gridSide): Direction[] {
    const result = this._lookupDirections.find((entry) => entry.side == side)
    if (result) return result.directions
    else throw new Error(`Given side '${side}' not present in _lookupDirections`)
  }
}
