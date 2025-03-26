import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

const useUser = () => {
  const { data, isLoading, isError } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  // console.log(data);
  // console.log(isLoading);
  // console.log(isError);

  return {
    user: data,
    isLoading,
    isLoggedIn: !isError,
  };
};

export default useUser;
