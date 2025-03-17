import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

const useUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  console.log(data);
  console.log(isLoading);
  console.log(isError);

  return;
};

export default useUser;
