import {expect} from '@esm-bundle/chai'
import {Direction} from '../direction'
import {LookupDirections} from '../grid-lookup-directions'
import {gridSide} from '../grid'

describe('Grid sides enum', function () {
  it('All grid sides exists', () => {
    expect(Object.keys(gridSide).includes('Left')).to.equal(true, 'Left is missing')
    expect(Object.keys(gridSide).includes('Top')).to.equal(true, 'Top is missing')
    expect(Object.keys(gridSide).includes('Right')).to.equal(true, 'Right is missing')
    expect(Object.keys(gridSide).includes('Bottom')).to.equal(true, 'Bottom is missing')
  })
})

describe('LookupDirections for grid side', function () {
  it('Lookup directions for Left side', () => {
    expect(LookupDirections.getDirections(gridSide.Left).length).to.equal(
      3,
      'Three directions should be returned for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Left).find((entry) => entry == Direction.LtR)).to.equal(
      Direction.LtR,
      'Direction LtR is missing for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Left).find((entry) => entry == Direction.BottomLTopR)).to.equal(
      Direction.BottomLTopR,
      'Direction BottomLTopR is missing for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Left).find((entry) => entry == Direction.TopLBottomR)).to.equal(
      Direction.TopLBottomR,
      'Direction TopLBottomR is missing for Left side'
    )
  })
  it('Lookup directions for Top side', () => {
    expect(LookupDirections.getDirections(gridSide.Top).length).to.equal(
      3,
      'Three directions should be returned for Top side'
    )
    expect(LookupDirections.getDirections(gridSide.Top).find((entry) => entry == Direction.TopBottom)).to.equal(
      Direction.TopBottom,
      'Direction TopBottom is missing for Top side'
    )
    expect(LookupDirections.getDirections(gridSide.Top).find((entry) => entry == Direction.TopRBottomL)).to.equal(
      Direction.TopRBottomL,
      'Direction TopRBottomL is missing for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Top).find((entry) => entry == Direction.TopLBottomR)).to.equal(
      Direction.TopLBottomR,
      'Direction TopLBottomR is missing for Left side'
    )
  })
  it('Lookup directions for Right  side', () => {
    expect(LookupDirections.getDirections(gridSide.Right).length).to.equal(
      3,
      'Three directions should be returned for Right side'
    )
    expect(LookupDirections.getDirections(gridSide.Right).find((entry) => entry == Direction.RtL)).to.equal(
      Direction.RtL,
      'Direction RtL is missing for Right side'
    )
    expect(LookupDirections.getDirections(gridSide.Right).find((entry) => entry == Direction.BottomRTopL)).to.equal(
      Direction.BottomRTopL,
      'Direction BottomRTopL is missing for Right side'
    )
    expect(LookupDirections.getDirections(gridSide.Right).find((entry) => entry == Direction.TopRBottomL)).to.equal(
      Direction.TopRBottomL,
      'Direction TopRBottomL is missing for Right side'
    )
  })
  it('Lookup directions for Bottom side', () => {
    expect(LookupDirections.getDirections(gridSide.Bottom).length).to.equal(
      3,
      'Three directions should be returned for Bottom side'
    )
    expect(LookupDirections.getDirections(gridSide.Bottom).find((entry) => entry == Direction.BottomUp)).to.equal(
      Direction.BottomUp,
      'Direction LtR is missing for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Bottom).find((entry) => entry == Direction.BottomLTopR)).to.equal(
      Direction.BottomLTopR,
      'Direction BottomLTopR is missing for Left side'
    )
    expect(LookupDirections.getDirections(gridSide.Bottom).find((entry) => entry == Direction.BottomRTopL)).to.equal(
      Direction.BottomRTopL,
      'Direction BottomRTopL is missing for Left side'
    )
  })
})
