import { useMemo } from "react";

export const useDataFromLocalStorage = <T>(key: string) => {
  const data: T = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) as string);
    }
    return [];
  }, [key]);

  return { data };
};
