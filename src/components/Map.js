import React from 'react'

// example map
// [[1,1,1,1,0],
//  [1,0,0,0,0],
//  [1,0,1,1,1],
//  [1.0,0,0,1],
//  [1,1,1,0,1]]

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

class Map extends React.Component {
  createEmptyMap (num, dimensions) {
    let mapArray = []

    for (var i = 0; i < dimensions; i++) {
      mapArray.push([])
      for (var j = 0; j < dimensions; j++) {
        mapArray[i].push(num)
      }
    }

    return mapArray
  }

  populateMap () {
    let maxTunnels = this.props.maxTunnels

    let map = this.createEmptyMap(1, this.props.dimensions)

    let currentRow = Math.floor(Math.random() * this.props.dimensions)

    let currentColumn = Math.floor(Math.random() * this.props.dimensions)

    let lastDirection = []

    let randomDirection // next turn/direction - holds a value from directions

    while (maxTunnels) {
      do {
        randomDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
      } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]))

      let randomLength = Math.ceil(Math.random() * this.props.maxLength)

      let tunnelLength = 0 // current length of tunnel being created

      while (tunnelLength < randomLength) {
        if (((currentRow === 0) && (randomDirection[0] === -1)) ||
          ((currentColumn === 0) && (randomDirection[1] === -1)) ||
          ((currentRow === this.props.dimensions - 1) && (randomDirection[0] === 1)) ||
          ((currentColumn === this.props.dimensions - 1) && (randomDirection[1] === 1))) {
          break
        } else {
          map[currentRow][currentColumn] = 0
          currentRow += randomDirection[0]
          currentColumn += randomDirection[1]
          tunnelLength++
        }
      }

      if (tunnelLength) {
        lastDirection = randomDirection
        maxTunnels--
      }
    }

    return map
  }

  renderMap () {
    let grid = this.populateMap()

    return (
      <table cellSpacing={0} cellPadding={0} >
        <tbody>
          { grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                row.map((cell, cellIndex) => (
                  <td className={cell === 1 ? 'wall' : 'tunnel'} key={cellIndex} />
                ))
              }
            </tr>
          )) }
        </tbody>
      </table>
    )
  }

  render () {
    return this.renderMap()
  }
}

export default Map
