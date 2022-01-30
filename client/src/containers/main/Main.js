import React, { useContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'

import { UserDataContext } from '../../store/UserDataProvider'
import ChartData from '../../components/chart/Chart'
import { getRandomRgb } from '../../utils/UtilFunctions'

const chartData = []

let flag = false

const githubStatusTitle = [
  'Top Languages',
  'Most Starred',
  'Stars per Language',
]

const Main = () => {
  const { data } = useContext(UserDataContext)
  // Take previous chart and add to the new one
  const [test, setTest] = useState(null)

  const removeDuplicates = (allInfos) => {
    const counts = {}
    allInfos.forEach(function (x) {
      counts[x.language] = (counts[x.language] || 0) + 1
    })
    console.log(counts)
    return counts
  }

  const barDataHandler = (allInfos) => {
    const langCounted = removeDuplicates(allInfos)
    if (langCounted.null) delete langCounted.null

    const labelsArr = []
    const dataArr = []
    const backgroundColorArr = []
    const borderColorArr = []

    if (labelsArr.length < 3 || dataArr.length || 3 || backgroundColorArr < 3) {
      for (let i = 0; i < githubStatusTitle.length; i++) {
        for (const [key, value] of Object.entries(langCounted)) {
          labelsArr.push(key)
          dataArr.push(value)
          backgroundColorArr.push(getRandomRgb())
          borderColorArr.push(getRandomRgb())
        }

        const langCountedLenght = Object.keys(langCounted).length;
        console.log("TAMANHO DO LANGCOUNTED", langCountedLenght)
        labelsArr.length = langCountedLenght
        dataArr.length = langCountedLenght
        backgroundColorArr.length = langCountedLenght
        borderColorArr.length = langCountedLenght

        const payload = {
          labels: [...labelsArr],
          datasets: [{
            data: [...dataArr],
            label: githubStatusTitle[i],
            backgroundColor: [...backgroundColorArr],
            borderColor: [...borderColorArr],
            borderWidth: 1,
          }],
        }

        chartData.push(payload)
      }
    }
    chartData.length = 3
    setTest(chartData)
    console.log('UseEffect -> barDataHandler -> state: \n', chartData)
    if (flag === false) flag = true
  }

  const languageHandler = async () => {
    try {
      const allInfos = await axios.get(data.subscriptions_url).then((res) =>
        res.data.map((item) => {
          const test = {
            name: item.name,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks,
            description: item.description,
          }
          return test
        })
      )

      console.log('UseEffect -> languageHandler -> allInfos: \n', allInfos)
      barDataHandler(allInfos)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    languageHandler()
  }, [test])

  return (
    <main className='main'>
      <div className='big-status'>
        <div className='box-main box-main-margin'>
          {test ? <ChartData onData={test} index={0} /> : <span></span>}
        </div>
        <div className='box-main box-main-margin'></div>
        <div className='box-main'></div>
      </div>

      <div className='repo-cards'>
        <div className='repo-cards__title'>
          <div className='filter'>
            <h3>Top Repos</h3>
            <span>by</span>
            <select>
              <option value='stars'>stars</option>
              <option value='forks'>forks</option>
              <option value='size'>size</option>
            </select>
          </div>
        </div>
        <div className='top-repos'>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
          <div className='top-repos__cards'>CARDS</div>
        </div>
      </div>
    </main>
  )
}

export default Main
