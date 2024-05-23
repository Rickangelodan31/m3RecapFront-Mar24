import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (currentToken) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        setToken(currentToken);
      } else {
        window.localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const potentialToken = window.localStorage.getItem("authToken");
    if (potentialToken) {
      verifyToken(potentialToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Token updated:", token);
    if (token) {
      window.localStorage.setItem("authToken", token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
  };

  const withToken = async (endpoint, method = "GET", payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: payload ? JSON.stringify(payload) : undefined,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ token, setToken, logout, isLoading, withToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
