import { createContext, useContext, useState, useEffect } from "react";
import { getToken, clearToken } from "../utils/storage";
import { getMe, login as apiLogin, register as apiRegister, logout as apiLogout } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (token) {
        try {
          const data = await getMe();
          setUser(data.user);
        } catch {
          clearToken();
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (info) => {
    const data = await apiRegister(info);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
