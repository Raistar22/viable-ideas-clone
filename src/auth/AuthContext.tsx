import { createContext, useContext, useMemo, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const defaultAuth: AuthContextValue = {
  accessToken: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/drive.readonly",
    onSuccess: (tokenResponse) => {
      if (tokenResponse && tokenResponse.access_token) {
        setAccessToken(tokenResponse.access_token);
      }
    },
    onError: () => {
      // no-op; UI can show banner from consumers
    },
  });

  const signOut = () => {
    setAccessToken(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ accessToken, isAuthenticated: Boolean(accessToken), signIn: login, signOut }),
    [accessToken, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  return ctx ?? defaultAuth;
}


