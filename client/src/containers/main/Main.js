import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

import { UserDataContext } from "../../store/UserDataProvider";
import { getRandomRgb } from "../../utils/UtilFunctions";

const allInfos = [];
const chart = {
  data: {
    labels: [],
    datasets: {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  },
};

const githubStatusTitle = [
  "Top Languages",
  "Most Starred",
  "Stars per Language",
];

const reducerChart = (state, action) => {
  if (action.type === "increase") {
    chart.data.labels = [...action.payload.labels];
    chart.data.datasets.data = [...action.payload.data];
    chart.data.datasets.label = action.payload.label;
    chart.data.datasets.backgroundColor = [...action.payload.background];
    chart.data.datasets.borderColor = [...action.payload.border];

    state.push(chart);

    return state;
  } else {
    console.log("nothing to do");
  }
};

const Main = () => {
  const { data, repoData } = useContext(UserDataContext);
  // Take previous chart and add to the new one
  const [state, dispatch] = useReducer(reducerChart, []);

  const removeDuplicates = (allInfos) => {
    console.log(allInfos);
    const counts = {};
    allInfos.forEach(function (x) {
      counts[x.language] = (counts[x.language] || 0) + 1;
    });
    console.log(counts);
    return counts;
  };

  useEffect(() => {
    const barDataHandler = (allInfos) => {
      const langCounted = removeDuplicates(allInfos);
      if (langCounted.null) delete langCounted.null;

      const labelsArr = [];
      const dataArr = [];
      const backgroundColorArr = [];
      const borderColorArr = [];

      for (let i = 0; i < githubStatusTitle.length; i++) {
        for (const [key, value] of Object.entries(langCounted)) {
          labelsArr.push(key);
          dataArr.push(value);
          backgroundColorArr.push(getRandomRgb());
          borderColorArr.push(getRandomRgb());
        }

        dispatch({
          type: "increase",
          payload: {
            labels: labelsArr,
            data: dataArr,
            label: githubStatusTitle[i],
            background: backgroundColorArr,
            border: borderColorArr,
          },
        });

        labelsArr.length = 0;
        dataArr.length = 0;
        borderColorArr.length = 0;
        backgroundColorArr.length = 0;
      }
      state.splice(githubStatusTitle.length);
      console.log(state);
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

        barDataHandler(allInfos);
        allInfos.length = 0;
      } catch (e) {
        console.log(e);
      }
    };

    languageHandler();
  }, [data, repoData, state]);

  return (
    <main className="main">
      <div className="big-status">
        <div className="box-main box-main-margin">{}</div>
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
