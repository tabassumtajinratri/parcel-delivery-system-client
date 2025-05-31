import React from 'react';

const DeliveryManCard = ({ deliveryMan, index }) => {
  const delay = index * 0.1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img 
              src={deliveryMan.profileImage || '/default-avatar.png'} 
              alt={deliveryMan.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-teal-400"
            />
            <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              #{index + 1}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{deliveryMan.name}</h3>
            <p className="text-sm text-gray-500">Delivery Expert</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-teal-50 rounded-lg p-3 text-center">
            <div className="text-teal-600 mb-1">
              <FaTruck className="inline-block" />
            </div>
            <p className="text-xs text-gray-500">Deliveries</p>
            <p className="font-bold text-teal-700">{deliveryMan.deliveriesCompleted}</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <div className="text-amber-500 mb-1">
              <FaStar className="inline-block" />
            </div>
            <p className="text-xs text-gray-500">Rating</p>
            <p className="font-bold text-amber-600">
              {deliveryMan.averageRating?.toFixed(1) || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryManCard;