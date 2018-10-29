import React from 'react'
import ReactDOM from 'react-dom'

import Map from './components/Map'

const title = 'Procedural map generation'

ReactDOM.render(
  <div>
    <h1>{title}</h1>
    <Map
      dimensions={20}
      maxTunnels={50}
      maxLength={8}
    />
  </div>
  ,
  document.getElementById('app')
)

module.hot.accept()
