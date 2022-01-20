import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { UserDataContext } from "../../store/UserDataProvider";

const Header = () => {
  const [repoAmount, setRepoAmount] = useState(0);
  const date = new Date();

  const [data, setData] = useContext(UserDataContext);

  function repositoriesHandler() {
    try {
      axios.get(data.repos_url).then((res) => {
        console.log(res);
        setRepoAmount(res.data.length);
      });
    } catch (error) {}
  }

  useEffect(() => {
    repositoriesHandler();
  }, [data]);

  return (
    <header className="header">
      <div className="header__my-self">
        <img src={data.avatar_url} className="circle" alt="user" />
        <h2 className="gvn">{data.name}</h2>
        <h3 className="username">@{data.login}</h3>
        <span className="date">1, January 2022</span>
      </div>
      <div className="generalInfos">
        <div className="box margin-box">
          <div>
            <h5>Repositories</h5>
            <span>{repoAmount}</span>
          </div>
        </div>
        <div className="box margin-box">
          <div>
            <h5>Followers</h5>
            <span>{data?.followers}</span>
          </div>
        </div>
        <div className="box">
          <div>
            <h5>Following</h5>
            <span>{data?.following}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
