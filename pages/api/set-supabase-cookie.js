import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
  return supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
