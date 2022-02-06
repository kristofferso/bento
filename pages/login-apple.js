import { useEffect } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const LoginApple = () => {
  const { LoginWithApple } = useUser();
  useEffect(LoginWithApple, [LoginWithApple]);
  return <p>Redirecting to Apple...</p>;
};

export default Login;
