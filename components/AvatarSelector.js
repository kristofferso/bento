import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { getAvatarUrl } from "../utils/avatars";

export default function AvatarSelector({ handleSelectAvatar }) {
  const [avatarOptions, setAvatarOptions] = useState({
    shirt: "open",
    baseColor: "apricot",
    hair: "pixie",
    glassesProbability: 0,
    glassesColor: "black",
    hairProbability: 100,
  });

  const getRandomAvatarUrls = () =>
    [...Array(6)].map(() => getAvatarUrl(Math.random(), avatarOptions));
  const [avatarList, setAvatarList] = useState(getRandomAvatarUrls());

  useEffect(() => {
    setAvatarList(getRandomAvatarUrls());
  }, [avatarOptions]);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="">Velg figur</h3>
        <button
          onClick={() => {
            setAvatarList(getRandomAvatarUrls());
          }}
        >
          Vis 6 nye
        </button>
      </div>
      <div className="flex gap-4">
        <SelectLabel
          label="Hår"
          name="avatarHair"
          id="avatarHair"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "none") {
              setAvatarOptions({
                ...avatarOptions,
                hairProbability: 0,
              });
            } else {
              setAvatarOptions({
                ...avatarOptions,
                hairProbability: 100,
                hair: val,
              });
            }
          }}
        >
          <option value="pixie">Halvlangt</option>
          <option value="fonze">Kort sveis</option>
          <option value="full">Langt</option>
          <option value="none">Ingen</option>
        </SelectLabel>

        <SelectLabel
          label="Hudfarge"
          id="avatarSkin"
          value={avatarOptions.baseColor}
          onChange={(e) => {
            setAvatarOptions({
              ...avatarOptions,
              baseColor: e.target.value,
            });
          }}
        >
          <option value="apricot">Lys beige</option>
          <option value="coast">Brun</option>
          <option value="topaz">Mørk brun</option>
          <option value="sky">Blå</option>
          <option value="salmon">Rosa</option>
          <option value="canary">Gul</option>
        </SelectLabel>
      </div>
      <div className="flex gap-4">
        <SelectLabel
          label="Briller"
          id="avatarGlasses"
          defaultValue="none"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "none") {
              setAvatarOptions({
                ...avatarOptions,
                glassesProbability: 0,
              });
            } else {
              setAvatarOptions({
                ...avatarOptions,
                glassesProbability: 100,
                glasses: val,
              });
            }
          }}
        >
          <option value="none">Ingen</option>
          <option value="round">Runde</option>
          <option value="square">Firkantet</option>
        </SelectLabel>
        <SelectLabel
          label="Skjegg"
          id="avatarFacialHair"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "none") {
              setAvatarOptions({
                ...avatarOptions,
                facialHairProbability: 0,
              });
            } else {
              setAvatarOptions({
                ...avatarOptions,
                facialHairProbability: 100,
                facialHair: val,
                facialHairColor:
                  avatarOptions.baseColor === "topaz" ? "black" : "topaz",
              });
            }
          }}
        >
          <option value="none">Ingen</option>
          <option value="beard">Fullt</option>
          <option value="scruff">Skjeggstubber</option>
        </SelectLabel>
      </div>

      <hr className="my-4" />
      <ul className="flex list-none flex-wrap justify-around gap-4">
        {avatarList.map((url, i) => {
          console.log(url, i);
          const avatar = console.log(avatar);
          return (
            <li key={i} className="flex flex-col items-center gap-2">
              <Avatar src={url} alt="Ny avatar" />
              <button
                onClick={() => {
                  handleSelectAvatar(url);
                }}
              >
                Velg
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const SelectLabel = ({ label, id, children, ...props }) => (
  <div className="flex flex-col gap-1 flex-1">
    <label htmlFor={id}>{label}</label>
    <select name={id} id={id} {...props}>
      {children}
    </select>
  </div>
);
