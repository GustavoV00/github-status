import React, { useEffect } from 'react'

import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
Chart.register(CategoryScale, LinearScale, BarElement)

const ChartData = ({ onData, index }) => {
  console.log('Estou aqui porra: \n', onData[index])

  return (
    <div>
      <Bar data={onData[index]} />
    </div>
  )
}

export default ChartData
