import React, { useState, createContext } from "react";

export const LoggedContext = createContext();

export const LoggedProvider = props => {
  const [logged, setLogged] = useState(localStorage.length > 0);
  return (
    <LoggedContext.Provider value={[logged, setLogged]}>
      {props.children}
    </LoggedContext.Provider>
  );
};
