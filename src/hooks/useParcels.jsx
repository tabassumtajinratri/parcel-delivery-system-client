import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axiosInstance/useAxiosSecure";

const useParcels = (fromDate, toDate) => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["parcels", fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: { from: fromDate, to: toDate },
      });
      return res.data;
    },
  });

  return { parcels, refetch, isLoading, isError };
};

export default useParcels;
