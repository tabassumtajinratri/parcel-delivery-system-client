// src/hooks/useAllUsers.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosInstance/useAxiosSecure";

const useAllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log("Fetched users:", res.data); 
      return res.data.users; 
    },
  });

  return { users: data || [], isLoading, isError };
};

export default useAllUsers;
