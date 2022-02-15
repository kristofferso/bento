import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Success() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-[30rem] mx-auto text-center">
      <div className="flex items-center justify-center rounded-full h-28 w-28 bg-green-100 text-green-700">
        <FontAwesomeIcon icon={faChampagneGlasses} size="3x" />
      </div>
      <h1 className="">Oppskriften din er mottatt!</h1>
      <p className="">
        Foreløpig godkjennes oppskrifter manuelt, så du vil få en varsel så
        snart den er tilgjengelig for andre.
      </p>
      <Link href="/">
        <a className="button button-secondary">Til forsiden</a>
      </Link>
    </div>
  );
}
