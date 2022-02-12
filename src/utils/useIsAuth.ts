import { gql, useQuery } from "urql";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MeQuery = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const useIsAuth = () => {
  const [{ data, fetching }] = useQuery({
    query: MeQuery,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetching && !data.me) {
      navigate("/login", { replace: true });
    }
  }, [fetching, data, navigate]);
};
