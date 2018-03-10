import React, { Component } from 'react'
import { Treemap, Tooltip } from 'recharts'

import './style.css'

const data = [
  {
    name: 'Huong',
    children: [
      { name: 'Test', size: 12 },
      { name: 'Post', size: 121 },
    ],
  },
  {
    name: 'Adimin',
    children: [
      { name: 'Test', size: 21 },
      { name: 'Post', size: 212 },
    ],
  },
  {
    name: 'Shovity',
    children: [
      { name: 'Test', size: 31 },
      { name: 'Post', size: 313 },
    ],
  },
  {
    name: 'Adimin2',
    children: [
      { name: 'Test', size: 21 },
      { name: 'Post', size: 212 },
    ],
  },
  {
    name: 'Shovity2',
    children: [
      { name: 'Test', size: 31 },
      { name: 'Post', size: 313 },
    ],
  },
]

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const CustomizedContent = (props) => {
  const { root, depth, x, y, width, height, index, payload, colors, rank, name, size } = props
  const style = {
    fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'rgba(0,0,0,0)',
    stroke: '#fff',
    strokeWidth: 2 / (depth + 1e-10),
    strokeOpacity: 1 / (depth + 1e-10),
  }

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={style}/>
      { depth === 1 &&
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" stroke="none" fill="#f1f0f0" fontSize={18}>
          {name}
        </text>
      }

      {
        depth === 1 &&
        <text x={x + 3} y={y + 13} stroke="none" fill="#fff" fontSize={12} fillOpacity={0.9}>
          {index + 1}
        </text>
      }
    </g>
  )
}


class Home extends Component {
  render() {
    return (
      <div id="home">
        <Treemap
          width={761}
          height={500}
          data={data}
          dataKey="size"
          ratio={4/3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={COLORS}/>}
        >
          <Tooltip content={<CustomizedTooltip />} />
        </Treemap>
      </div>
    )
  }
}

const CustomizedTooltip = ({ payload }) => {
  const pl = payload[0]
  const object = pl? pl.payload : {}
  return (
    <div className="tooltip">{object.name}: {object.value}</div>
  )
}

const Card = () => {
  return (
    <div className="card">
      Test item
    </div>
  )
}

export default Home
