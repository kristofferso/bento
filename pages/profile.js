import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import Modal from "../components/elements/Modal";
import HorizontalLine from "../components/elements/HorizontalLine";
import Avatar from "../components/Avatar";
import AvatarSelector from "../components/AvatarSelector";

export default function Profile() {
  const { user, getUserProfile } = useUser();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [profileData, setProfileData] = useState({
    display_name: "",
    avatar_url: "",
  });

  const [formChanged, setFormChanged] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    setProfileData({ ...profileData, [name]: value });
    setFormChanged(true);
  };

  useEffect(() => {
    setProfileData({
      ...profileData,
      display_name: user?.display_name || "",
      avatar_url: user?.avatar_url || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", user.id);
    console.log(data, error);
    getUserProfile();
    setFormChanged(false);
  };

  return (
    <div className="flex flex-col gap-8 px-4">
      <h1 className="-mb-4">Din profil</h1>
      <HorizontalLine />
      <div className="flex flex-col flex-1 items-start">
        <h2 className="mb-2">Data om deg</h2>
        <div className="flex flex-col gap-2">
          <p className="">E-postadresse: {user?.email}</p>
          <p className="">
            Du registrerte deg
            {" " +
              new Date(user?.created_at).toLocaleDateString("no", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>
      </div>

      <div className="flex gap-x-12 gap-y-8 flex-wrap self-stretch">
        <div className="flex flex-col items-start flex-1 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="">Oppskriftsprofil</h2>
            <label htmlFor="display_name">Visningsnavn</label>
            <input
              type="text"
              name="display_name"
              id="display_name"
              value={profileData.display_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex p-4 bg-blue-50 rounded-md items-center gap-3">
            <div className="flex w-8 h-8 items-center text-xl justify-center bg-blue-300 text-blue-700 rounded-full">
              ℹ
            </div>
            <p className="flex-1 text-blue-700 text-md">
              Visningsnavnet og figuren din er offentlig og vises på
              oppskriftene du legger ut.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 pr-8">
          <div className="flex flex-col items-start gap-2">
            {profileData.avatar_url && (
              <Avatar src={profileData.avatar_url} alt="Din avatar" />
            )}

            <button
              onClick={() => {
                setShowAvatarModal(true);
              }}
            >
              Bytt din figur
            </button>
            {showAvatarModal && (
              <Modal
                setCloseModal={() => {
                  setShowAvatarModal(false);
                }}
              >
                <AvatarSelector
                  handleSelectAvatar={(avatar_url) => {
                    setShowAvatarModal(false);
                    handleChange({
                      target: {
                        name: "avatar_url",
                        value: avatar_url,
                      },
                    });
                  }}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4 items-start">
        <h2>Danger zone</h2>
        <div className="flex flex-col gap-4 items-start">
          <p className="">
            Vil du slette profilen din? Alle dine persondata og oppskrifter vil
            slettes.
          </p>
          <button disabled>Slett mine data</button>
        </div>
      </div>
      <HorizontalLine />
      <div className="flex gap-4 items-center">
        <button onClick={updateProfile} disabled={!formChanged}>
          Lagre
        </button>
        {formChanged && <p className="text-gray-600">← Husk å lagre!</p>}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permament: false,
        destination: "/?login=true",
      },
      props: {},
    };
  }

  return { props: {} };
};
