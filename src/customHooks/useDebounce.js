import { useEffect, useState } from "react";

const useDebounce = (text, delay) => {
  const [debounceText, setDebounceText] = useState("");
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceText(text);
    }, delay);
    return () => clearTimeout(timerId);
  }, [text]);
  return debounceText;
};

export default useDebounce;
