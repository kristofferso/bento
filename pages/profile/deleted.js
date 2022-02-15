import { faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Success() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-[30rem] mx-auto text-center">
      <div className="flex items-center justify-center rounded-full h-28 w-28 bg-blue-100 text-blue-700">
        <FontAwesomeIcon icon={faHandPeace} size="3x" />
      </div>
      <h1 className="">Takk for nå!</h1>
      <p className="">
        Profilen din og all dine persondata er blitt slettet. Hvis du logger inn
        med samme e-postadresse nå vil det opprettes en ny profil til deg.
      </p>
    </div>
  );
}
