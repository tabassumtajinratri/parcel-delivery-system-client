import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck } from 'react-icons/fa';
import DeliveryManCard from './DeliveryManCard';
import useTopDeliveryMan from '../hooks/useTopDeliveryMan';

const TopDeliveryMan = () => {
  const { data: deliveryMen, isLoading, error } = useTopDeliveryMan();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse"></div>
        ))}
      </div>
    );
  }
  if(deliveryMen && deliveryMen.length === 0) {
    return <div className="text-gray-500">No delivery experts found</div>;
  }

  if (error) {
    return  console.log(error);
  }

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaTruck className="mr-2 text-teal-500" />
        Top Delivery Experts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deliveryMen?.map((deliveryMan, index) => (
          <DeliveryManCard
            key={deliveryMan._id}
            deliveryMan={deliveryMan}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;
