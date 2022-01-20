import React, { useState } from "react";

import { IoReturnUpBack } from "react-icons/io5";

import Header from "./containers/header/Header";
import Main from "./containers/main/Main";
import Form from "./components/form/Form";
import UserDataProvider from "./store/UserDataProvider";

import "./styles/main.scss";

function App() {
  const [user, setUser] = useState(false);

  const searchForUserHandler = () => {
    setUser(true);
  };

  const returnHandler = () => {
    setUser(false);
  };

  return (
    <div className="App">
      <UserDataProvider>
        {user ? (
          <div>
            <IoReturnUpBack className="return" onClick={returnHandler} />
            <Header user={user} />
            <Main />
          </div>
        ) : (
          <Form searchUser={searchForUserHandler} />
        )}
      </UserDataProvider>
    </div>
  );
}

export default App;
