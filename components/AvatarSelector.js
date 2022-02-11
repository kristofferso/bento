import { useCallback, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { getAvatarUrl } from "../utils/avatars";

export default function AvatarSelector({ handleSelectAvatar }) {
  const [avatarOptions, setAvatarOptions] = useState({
    shirt: ["open"],
    mouth: ["pucker", "smirk", "laughing", "nervous"],
    baseColor: ["apricot"],
    hair: ["pixie"],
    hairColor: ["calm"],
    eyebrows: ["up"],
    glassesProbability: 0,
    earringsProbability: 0,
    hairProbability: 100,
    earrings: ["hoop"],
    earringColor: ["coast"],
    glassesColor: ["black"],
  });

  const getRandomAvatarUrls = useCallback(() => {
    return [...Array(6)].map(() => getAvatarUrl(Math.random(), avatarOptions));
  }, [avatarOptions]);

  const [avatarList, setAvatarList] = useState(getRandomAvatarUrls());

  useEffect(() => {
    setAvatarList(getRandomAvatarUrls());
  }, [getRandomAvatarUrls]);

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
      <div className="flex gap-4 flex-wrap">
        <SelectLabel
          label="Hår"
          name="avatarHair"
          id="avatarHair"
          onChange={(e) => {
            setAvatarOptions({
              ...avatarOptions,
              hair: [e.target.value],
            });
          }}
        >
          <option value="pixie">Halvlangt</option>
          <option value="dannyPhantom">Hockey</option>
          <option value="mrT">Mohawk</option>
          <option value="fonze">Kort sveis</option>
          <option value="full">Langt</option>
          <option value="mrClean">Ingen</option>
        </SelectLabel>

        <SelectLabel
          label="Hudfarge"
          id="avatarSkin"
          value={avatarOptions.baseColor}
          onChange={(e) => {
            setAvatarOptions({
              ...avatarOptions,
              baseColor: [e.target.value],
              facialHairColor:
                e.target.value === "topaz" ? ["black"] : ["topaz"],
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
        <SelectLabel
          label="Hårfarge"
          id="avatarHairColor"
          value={avatarOptions.hairColor}
          onChange={(e) => {
            setAvatarOptions({
              ...avatarOptions,
              hairColor: [e.target.value],
            });
          }}
        >
          <option value="calm">Lys lilla</option>
          <option value="canary">Gul</option>
          <option value="coast">Brun</option>
          <option value="topaz">Mørk brun</option>
          <option value="sky">Blå</option>
          <option value="salmon">Rosa</option>
          <option value="black">Svart</option>
          <option value="white">Hvit</option>
        </SelectLabel>
      </div>
      <div className="flex gap-4 flex-wrap">
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
                glasses: [val],
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
                facialHair: [val],
              });
            }
          }}
        >
          <option value="none">Ingen</option>
          <option value="beard">Fullt</option>
          <option value="scruff">Skjeggstubber</option>
        </SelectLabel>
        <SelectLabel
          label="Detaljer"
          id="avatarDetails"
          onChange={(e) => {
            switch (e.target.value) {
              case "earring":
                setAvatarOptions({
                  ...avatarOptions,
                  earringsProbability: 100,
                  eyebrows: ["up"],
                });
                break;
              case "lashes":
                setAvatarOptions({
                  ...avatarOptions,
                  earringsProbability: 0,
                  eyebrows: ["eyelashesUp"],
                });
                break;
              case "earring-lashes":
                setAvatarOptions({
                  ...avatarOptions,
                  earringsProbability: 100,
                  eyebrows: ["eyelashesUp"],
                });
                break;
              default:
                setAvatarOptions({
                  ...avatarOptions,
                  earringsProbability: 0,
                  eyebrows: ["up"],
                });
                break;
            }
          }}
        >
          <option value="none">Ingen</option>
          <option value="earring">Ørering</option>
          <option value="lashes">Vipper</option>
          <option value="earring-lashes">Ørering og vipper</option>
        </SelectLabel>
      </div>

      <hr className="my-4" />
      <ul className="flex list-none flex-wrap justify-around gap-4">
        {avatarList.map((url, i) => {
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
