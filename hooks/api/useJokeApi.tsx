import React from "react";
import useCachedHttpQuery from "./useCachedHttpQuery";
import useApi from "./useApi";

interface JokesPayload {
  category: string[];
  flags?: string[];
  type?: string;
  search?: string;
  amount?: string;
}

export const useJokeApi = () => {
  const path = "joke/";
  const api = useApi();
  const useAll = (payload: JokesPayload) => {
    return useCachedHttpQuery(
      [
        payload.category,
        payload.flags,
        payload.type,
        payload.search,
        payload.amount,
      ],
      () => api.get()
    );
  };
  return { useAll };
};
