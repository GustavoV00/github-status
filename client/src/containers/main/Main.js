import React, { useContext, useEffect, useState } from "react";

import { UserDataContext } from "../../store/UserDataProvider";

const Main = () => {
  const { repoData } = useContext(UserDataContext);
  const [langauges, setLanguages] = useState([]);

  useEffect(() => {
    function countLanguageHandler() {
      const result = repoData.data.map((item) => item.language);
      console.log(result);
      setLanguages(result);
    }

    countLanguageHandler();
  }, [repoData]);

  return (
    <main className="main">
      <div className="big-status">
        <div className="box-main box-main-margin"></div>
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
