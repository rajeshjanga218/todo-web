import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value]);
  return debounceValue;
};

export default useDebounce;
