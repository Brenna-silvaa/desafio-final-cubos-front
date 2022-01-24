import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthProvider";
import { useLocalStorage } from "react-use";

function useAuthProvider() {
  const [user, setUser, removeUser] = useLocalStorage("user", {});
  const [token, setToken] = useState(user ? user.token : "");
  const [novoUsuario, setNovoUsuario] = useState({});

  return {
    novoUsuario,
    setNovoUsuario,
    token,
    setToken,
    user,
    setUser,
    removeUser,
  };
}

function useAuth() {
  return useContext(authContext);
}

export { useAuthProvider, useAuth };
