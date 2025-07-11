import {Direction} from './direction'
import {Position} from './position'

export class StringInGrid {
  string: string
  position: Position
  direction: Direction

  constructor(string: string, position: Position, direction: Direction) {
    this.string = string
    this.position = position
    this.direction = direction
  }
}
