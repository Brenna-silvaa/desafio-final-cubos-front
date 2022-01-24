import { createContext } from "react";
import { useAuthProvider } from "../hooks/useAuth";

const authContext = createContext();

function AuthProvider({ children }) {
  const value = useAuthProvider();
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export { authContext, AuthProvider };
