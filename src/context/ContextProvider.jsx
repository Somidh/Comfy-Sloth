import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router";
import { supabase } from "../../server/supabase";
import useProductStore from "../store/productStore";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("Session:", session);
  const { setUserId } = useProductStore((state) => ({
    setUserId: state.setUserId,
  }));

  const handleNavbarClick = () => {
    setShowNavbar((prev) => !prev);
  };

  useEffect(() => {
    let gotSession = localStorage.getItem("authSession");
   
    if (gotSession) {
      setUserId(gotSession.user?.id);
      console.log("Retrieved: ", gotSession);
      setSession(JSON.parse(gotSession));
      setUser(JSON.parse(gotSession));
    }
    async function getSession() {
      setLoading(false);
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("subscription", subscription);

          if (session) {
            console.log("New session: ", session);
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
    showNavbar,
    setShowNavbar,
    handleNavbarClick,
    cartCount,
    setCartCount,
  };
  // const [token, setToken] = useState(false)

  // token && sessionStorage.setItem('token', JSON.stringify(token))

  // useEffect(() => {
  //     if (sessionStorage.getItem('token')) {
  //         let data = JSON.parse(sessionStorage.getItem('token'))
  //         setToken(data)
  //     }
  // }, [])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
