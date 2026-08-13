import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";

export type UserRole = "admin" | "marketing"

import api,{setAuthFailureHandler} from "../utils/api";
import { AuthContext, type authStatusType } from "./AuthContext";


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
  const [authStatus, setAuthStatus] = useState<authStatusType>("loading");
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

const [loading, setLoading] = useState({
  auth: true,
  fetching: true,
  submitting: false,
});

  const isLoggedIn = !!user;

useEffect(() => {
  async function loadAuth() {
    try {
      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        setAuthStatus("unauthenticated");
        return;
      }

      setToken(accessToken);

      const { data } =
        await api.get("/auth/checkAuth");

      setUser(data.user);
      setAuthStatus("authenticated");
    } catch (error: any) {
      console.error(
        "Auth initialization failed:",
        error
      );

      // Do NOT clear tokens here.
      // A network/DB/server failure does not mean
      // the user's authentication is invalid.
      setAuthStatus("unavailable");
    } finally {
      setLoading(prev => ({
        ...prev,
        auth: false,
      }));
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
      setAuthStatus("authenticated");
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
    setAuthStatus("unauthenticated");
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
      setAuthStatus("unauthenticated");
      navigate("/login", {
        replace: true,
      });
    });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authStatus,
        token,
        isLoggedIn,
        loading,
        login,
        logout,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}