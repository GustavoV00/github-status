import React, { useState } from "react";

import "./styles/main.scss";
import Header from "./containers/header/Header";

function App() {
  const [user, setUser] = useState(false);

  const searchForUserHandler = () => {
    setUser(true);
  };

  return (
    <div className="App">
      {!user && (
        <div>
          <Header />
        </div>
      )}
    </div>
  );
}

export default App;
