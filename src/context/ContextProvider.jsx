import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../server/supabase";
import useProductStore from "../store/productStore";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUserId } = useProductStore((state) => ({
    setUserId: state.setUserId,
  }));

  useEffect(() => {
    let gotSession = localStorage.getItem("authSession");

    if (gotSession) {
      setUserId(gotSession.user?.id);
      setSession(JSON.parse(gotSession));
      setUser(JSON.parse(gotSession));
    }
    async function getSession() {
      setLoading(false);
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            setUser(session.user);
            setUserId(session.user?.id);
            localStorage.setItem("authSession", JSON.stringify(session));
            setSession(session);
          } else {
            localStorage.removeItem("authSession");
            setSession(null);
            setUser(null);
          }
          setLoading(false);
        }
      );
      return () => {
        subscription?.unsubscribe();
      };
    }
    getSession();
  }, []);

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    logIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
