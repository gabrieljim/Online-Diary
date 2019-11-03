import React, { useState, createContext } from "react";

export const RegisteredContext = createContext();

export const RegisteredProvider = props => {
  const [registered, setRegistered] = useState(false);
  return (
    <RegisteredContext.Provider value={[registered, setRegistered]}>
      {props.children}
    </RegisteredContext.Provider>
  );
};

export default RegisteredProvider;
