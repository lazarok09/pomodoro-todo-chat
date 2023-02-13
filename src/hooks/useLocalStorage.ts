import { useMemo } from "react";

export const useDataFromLocalStorage = <T>(key: string) => {
  const data: T = useMemo(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem(key) as string);

      if (!data) return [];
      
      return data;
    }
    return [];
  }, [key]);

  return { data };
};
