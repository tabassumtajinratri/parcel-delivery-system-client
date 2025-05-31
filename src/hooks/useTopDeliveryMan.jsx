import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../axiosInstance/useAxiosPublic';

const useTopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();

  const fetchTopDeliveryMan = async () => {
    const res = await axiosPublic.get('/api/delivery/top');
    return res.data;
  };

  return useQuery({
    queryKey: ['topDeliveryMan'],
    queryFn: fetchTopDeliveryMan,
  });
};

export default useTopDeliveryMan;
