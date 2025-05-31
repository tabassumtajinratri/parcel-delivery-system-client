import useAllUsers from "./useAllUsers";

const useDeliveryMen = () => {
  const { users = [], isLoading, isError } = useAllUsers();

  const deliveryMen = Array.isArray(users)
    ? users.filter((user) => user.userType === "deliveryman")
    : [];

  return { deliveryMen, isLoading, isError };
};

export default useDeliveryMen;
