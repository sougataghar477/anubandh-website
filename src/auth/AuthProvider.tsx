import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";

export type UserRole = "admin" | "marketting"

import api,{setAuthFailureHandler} from "../utils/api";
import { AuthContext } from "./AuthContext";


export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  profile_picture:string;
}


interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const navigate = useNavigate();

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    async function loadAuth() {
      try {
        const accessToken =
          localStorage.getItem("accessToken");

        if (!accessToken) {
          setLoading(false);
          return;
        }

        setToken(accessToken);

        const { data } =
          await api.get("/auth/checkAuth");

        setUser(data.user);
      } catch {
        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadAuth();
  }, []);

  const login = useCallback(
    async (
      user: User,
      accessToken: string,
      refreshToken: string
    ) => {
      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "refreshToken",
        refreshToken
      );

      setToken(accessToken);
      setUser(user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      await api.post("/auth/logout", {
        refreshToken,
      });
    } finally {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      setToken(null);
      setUser(null);

      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);

  useEffect(() => {
    setAuthFailureHandler(() => {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      setToken(null);
      setUser(null);

      navigate("/login", {
        replace: true,
      });
    });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}