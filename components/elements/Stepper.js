import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stepper({
  handleIncrease,
  handleDecrease,
  handleChange,
  value,
}) {
  return (
    <div className="flex gap-1">
      <button className="button-secondary" onClick={handleDecrease}>
        <FontAwesomeIcon icon={faMinus} size="sm" />
      </button>
      <input
        type="number"
        value={value}
        className="w-20 text-center pl-5"
        onChange={handleChange}
      />
      <button className="button-secondary" onClick={handleIncrease}>
        <FontAwesomeIcon icon={faPlus} size="sm" />
      </button>
    </div>
  );
}
