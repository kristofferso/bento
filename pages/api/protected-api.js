import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  console.log("USER", user);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  res.send(user);
};

export default handler;
