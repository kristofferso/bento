export const getAvatarUrl = (seed, options = {}) => {
  const url = `https://avatars.dicebear.com/api/micah/${seed}&.svg?mouth=smile,pucker,smirk,laughing&${Object.keys(
    options
  )
    .map((key) => key + "=" + options[key])
    .join("&")}`;
  console.log(url, "URL");
  return url;
};
