import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton({
  name,
  options,
  checkedValues,
  setOption,
  removeOption,
  unit = "",
}) {
  const [showFilter, setShowFilter] = useState(false);
  const element = useRef();
  const [offsetRight, setOffsetRight] = useState();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = document.body.clientWidth;
      const rightOffset = element.current.getBoundingClientRect().right;
      const offsetPercent = (screenWidth - rightOffset) / screenWidth;
      setOffsetRight(offsetPercent);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative"
      onClick={() => {
        setShowFilter(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setShowFilter(false);
        }
      }}
    >
      <button
        ref={element}
        onClick={(e) => {
          if (showFilter) {
            setShowFilter(false);
            e.stopPropagation();
          }
        }}
        className={`button-secondary ${checkedValues && "active"}`}
      >
        {name}
        <FontAwesomeIcon
          icon={showFilter ? faCaretUp : faCaretDown}
          className="ml-2"
          size="xs"
        />
      </button>
      {showFilter && (
        <div
          className={`flex flex-col absolute top-12 z-20 bg-white dark:bg-gray-800 border-2 border-black dark:border-white pl-4 pr-8 py-2 rounded-sm drop-shadow-lg ${
            offsetRight < 0.4 && "right-0"
          }`}
          tabIndex={0}
        >
          {options.map((option, i) => (
            <label
              key={i}
              htmlFor={option}
              className="flex gap-2 items-center cursor-pointer max-w-[12rem] w-max"
            >
              <input
                type="checkbox"
                name={option}
                id={option}
                checked={checkedValues && checkedValues.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setOption(option);
                  } else {
                    removeOption(option);
                  }
                }}
              />
              {option + " " + unit}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
