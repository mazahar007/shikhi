// Small auth context: demo student auth persisted in localStorage only.
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, loginUser, logoutUser, registerUser, type DemoUser } from "./demo";

interface AuthCtx {
  user: DemoUser | null;
  ready: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  ready: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setUser(getUser());
    setReady(true);
  }, []);
  return (
    <Ctx.Provider
      value={{
        user,
        ready,
        login: (email, password) => setUser(loginUser(email, password)),
        register: (name, email, password) => setUser(registerUser(name, email, password)),
        logout: () => {
          logoutUser();
          setUser(null);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx);
}
