import React, { useState } from "react";

import "./styles/main.scss";
import Header from "./containers/header/Header";
import Form from "./components/form/Form";

function App() {
  const [user, setUser] = useState(false);

  const searchForUserHandler = () => {
    setUser(true);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <Header />
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
}

export default App;
