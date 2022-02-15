import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loginWithApple = async () => {
    supabase.auth.signIn({ provider: "apple" });
  };

  const loginWithEmail = async (email) => {
    return supabase.auth.signIn({ email });
  };

  const logout = async (redirectUrl = "/") => {
    await supabase.auth.signOut();
    setUser(null);
    router.push(redirectUrl);
  };

  const getUserProfile = async () => {
    const sessionUser = supabase.auth.user();
    if (sessionUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sessionUser.id)
        .single();

      setUser({
        ...sessionUser,
        ...profile,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: user ? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    });
  }, [user]);

  const exposed = {
    user,
    loginWithApple,
    loginWithEmail,
    logout,
    getUserProfile,
    isLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
