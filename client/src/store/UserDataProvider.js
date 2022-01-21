import React, { useState } from "react";

export const UserDataContext = React.createContext(null);

const UserDataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [repoData, setRepoData] = useState([]);

  return (
    <UserDataContext.Provider value={{ data, setData, repoData, setRepoData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
