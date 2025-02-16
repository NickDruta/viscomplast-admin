import { useEffect, RefObject } from "react";

export const useClickAway = (
  ref: RefObject<HTMLElement>,
  onClickAway: () => void,
  excludeRef?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!excludeRef ||
          (excludeRef.current &&
            !excludeRef.current.contains(event.target as Node)))
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickAway, excludeRef]);
};
