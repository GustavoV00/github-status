import React, { useState } from "react";

export const UserDataContext = React.createContext(null);

const UserDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <UserDataContext.Provider value={[data, setData]}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
