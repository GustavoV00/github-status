import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__my-self">
        <div className="circle" />
        <h2 className="gvn">Nome Nome</h2>
        <h3 className="username">@Username</h3>
        <span className="date">Date</span>
      </div>
      <div className="generalInfos">
        <div className="box margin-box"></div>
        <div className="box margin-box"></div>
        <div className="box"></div>
      </div>
    </header>
  );
};

export default Header;
