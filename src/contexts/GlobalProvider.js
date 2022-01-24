import { createContext } from "react";
import { useGlobalProvider } from "../hooks/useGlobal";

const globalContext = createContext();

function GlobalProvider({ children }) {
  const value = useGlobalProvider();
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
}

export { globalContext, GlobalProvider };
