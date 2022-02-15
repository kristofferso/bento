import { getServiceSupabase, supabase } from "../../utils/supabase";
import cookie from "cookie";

const handler = async (req, res) => {
  // Check if user is logged in
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  // Set the session token of the backend to the client cookie making the request
  const token = cookie.parse(req.headers.cookie)["sb:token"];
  supabase.auth.session = () => ({ access_token: token });

  const { anonError, anonData } = await supabase.rpc("anonymize_user_data");
  console.log("anonymize_user_data", anonError, anonData);

  if (!anonError) {
    const supabaseService = getServiceSupabase();
    const { data, error } = await supabaseService.auth.api.deleteUser(user.id);
    console.log("delete user", data, error);
    if (!error) return res.status(200).send("User anonymized and user deleted");
  }

  return res.status(401).send("Error");
};

export default handler;
