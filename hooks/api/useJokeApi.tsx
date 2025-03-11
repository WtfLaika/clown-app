import React from "react";
import useCachedHttpQuery from "./useCachedHttpQuery";
import useApi from "./useApi";

interface JokesPayload {
  categories: string[];
  flags?: string[];
  type?: string;
  search?: string;
  amount?: number;
}

interface Joke {
  error: boolean;
  category: string;
  type: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export const useJokeApi = () => {
  const path = "joke";
  const api = useApi();
  const useAll = (payload: JokesPayload) => {
    const categories = payload.categories.join(",");
    const query = new URLSearchParams({
      amount: payload.amount ? payload.amount.toString() : "",
    });
    return useCachedHttpQuery<Joke>(
      [
        payload.categories?.toString() || "",
        payload.flags?.toString() || "",
        payload.type?.toString() || "",
        payload.search,
        payload.amount?.toString() || "",
        path,
      ],
      async () => await api.get(`${path}/${categories}`, { params: query })
    );
  };
  return { useAll };
};
