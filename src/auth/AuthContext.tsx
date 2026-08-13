import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
export type UserRole = "admin" | "marketing"
export type authStatusType = "loading" | "authenticated" | "unauthenticated" | "unavailable";
export interface GlobalLoader{
  auth:boolean;
  fetching:boolean;
  submitting:boolean;
}
export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  profile_picture:string;
}
export interface AuthContextValue {
  user: User | null;
  authStatus:authStatusType;
  token: string | null;
  isLoggedIn: boolean;
  loading: GlobalLoader;
  setLoading:Dispatch<SetStateAction<GlobalLoader>>;

  setUser: Dispatch<SetStateAction<User | null>>;

  login: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);