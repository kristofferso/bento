import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

// eslint-disable-next-line react/display-name
export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      console.log("ITEM", item, item.id);
      props.command({ id: item.id, label: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="flex flex-col gap-1 bg-gray-100 rounded-sm p-1">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`button-secondary-sm text-left !font-sans ${
              index === selectedIndex ? "!bg-gray-300" : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.name}
          </button>
        ))
      ) : (
        <div className="p-1">Ingen ingredienser</div>
      )}
    </div>
  );
});
