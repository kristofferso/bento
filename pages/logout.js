import { faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logout() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-[30rem] mx-auto text-center">
      <div className="flex items-center justify-center rounded-full h-28 w-28 bg-blue-100 text-blue-700">
        <FontAwesomeIcon icon={faHandPeace} size="3x" />
      </div>
      <h1 className="">Sees snart igjen!</h1>
      <p className="">Du er blitt logget ut.</p>
    </div>
  );
}
