import { useQuery } from "urql";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MeQuery } from "../graphql/queries/Me.query";

export const useIsAuth = () => {
  const [{ data, fetching }] = useQuery({
    query: MeQuery,
    requestPolicy: "network-only",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetching && !data.me) {
      navigate("/login", { replace: true });
    }
  }, [fetching, data, navigate]);
};
