import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserDataContext } from "../../store/UserDataProvider";
import { getRandomRgb } from "../../utils/UtilFunctions";
import chartData from "../../utils/ChartDataClass";

const allInfos = [];
const counts = {};

const githubStatusTitle = [
  "Top Languages",
  "Most Starred",
  "Stars per Language",
];

const Main = () => {
  const { data, repoData } = useContext(UserDataContext);
  const [barData, setBarData] = useState(chartData);

  const removeDuplicates = () => {
    allInfos.forEach(function (x) {
      counts[x.language] = (counts[x.language] || 0) + 1;
    });
    console.log(counts);
    return counts;
  };

  useEffect(() => {
    const barDataHandler = () => {
      const aux = [];
      const langCounted = removeDuplicates();
      for (let i = 0; i < githubStatusTitle.length; i++) {
        for (const [key, value] of Object.entries(langCounted)) {
          const keyArr = keyArr.push(key);
          const valueArr = valueArr.push(value);
          const backgroundColorArr = backgroundColorArr.push(getRandomRgb());
        }

        // CONTINUAR AQUI PORRA
      }

      setBarData(chartData);
    };

    const languageHandler = async () => {
      try {
        await axios.get(data.subscriptions_url).then((res) =>
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
        console.log(chartData);
      } catch (e) {
        console.log("Erro aqui no RESULTS", e);
      }
    };

    languageHandler();
  }, [data, repoData]);

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
