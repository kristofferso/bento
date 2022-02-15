import { supabase } from "../../utils/supabase";
import cookie from "cookie";

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const token = cookie.parse(req.headers.cookie)["sb:token"];
  supabase.auth.session = () => ({ access_token: token });

  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: "testname" })
    .eq("id", user.id);
  console.log(data, error);
  if (!error) {
    res.status(401).send(data);
  } else {
    res.status(401).send("Error");
  }
};

export default handler;
