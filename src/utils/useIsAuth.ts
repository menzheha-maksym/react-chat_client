import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  //remove later
  /*useQuery({
    query: MeQuery,
    requestPolicy: "network-only",
  });*/
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetching && !data?.me) {
      navigate("/login", { replace: true });
    }
  }, [fetching, data, navigate]);
};
