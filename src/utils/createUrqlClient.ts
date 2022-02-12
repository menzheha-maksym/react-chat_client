import { createClient } from "urql";
export const createUrqlClient = createClient({
  url: "http://localhost:3007/graphql",
  fetchOptions: () => {
    return {
      credentials: "include" as const,
    };
  },
});
