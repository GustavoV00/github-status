import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserDataContext } from "../../store/UserDataProvider";
import { getRandomRgb } from "../../utils/UtilFunctions";

const chartData = [{}];

const allInfos = [];
const githubStatusTitle = [
  "Top Languages",
  "Most Starred",
  "Stars per Language",
];

const Main = () => {
  const { data, repoData } = useContext(UserDataContext);
  const [barData, setBarData] = useState(chartData);

  const removeDuplicates = () => {
    return allInfos.language.reducer(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );
  };

  useEffect(() => {
    const barDataHandler = () => {
      const langCounted = removeDuplicates();
      for (let i = 0; i < githubStatusTitle.length; i++) {
        chartData[i].datasets.label = githubStatusTitle[i];
        for (const [key, value] of Object.entries(langCounted)) {
          chartData[i].labels.push(key);
          chartData[i].datasets[0].data.push(value);
          chartData[i].datasets[0].backgroundColor.push(getRandomRgb());
          chartData[i].datasets[0].borderWidth = 1;
        }
      }

      setBarData(chartData);
      console.log(chartData);
    };

    const languageHandler = () => {
      try {
        console.log(data.subscriptions_url);
        axios.get(data.subscriptions_url).then((res) =>
          res.data.map((item) => {
            const test = {
              name: item.name,
              language: item.language,
              stars: item.stargazers_count,
              forks: item.forks,
              description: item.description,
            };
            allInfos.push(test);
            return item;
          })
        );

        barDataHandler();
        console.log("ALL INFOS", allInfos);
        console.log(chartData);
      } catch (e) {
        console.log("Erro aqui no RESULTS", e);
      }
    };

    languageHandler();
  }, [data, githubStatusTitle, repoData]);

  return (
    <main className="main">
      <div className="big-status">
        <div className="box-main box-main-margin">{/* <Chart /> */}</div>
        <div className="box-main box-main-margin"></div>
        <div className="box-main"></div>
      </div>

      <div className="repo-cards">
        <div className="repo-cards__title">
          <div className="filter">
            <h3>Top Repos</h3>
            <span>by</span>
            <select>
              <option value="stars">stars</option>
              <option value="forks">forks</option>
              <option value="size">size</option>
            </select>
          </div>
        </div>
        <div className="top-repos">
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
          <div className="top-repos__cards">CARDS</div>
        </div>
      </div>
    </main>
  );
};

export default Main;
