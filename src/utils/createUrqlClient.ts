import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";
export const createUrqlClient = createClient({
  url: "http://localhost:3007/graphql",
  fetchOptions: () => {
    return {
      credentials: "include" as const,
    };
  },
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
});
