import { motion } from "framer-motion";
import bannerImg from "../assets/images/banner.png"; 

const Banner = () => {
 
  return (
    <div
      className="flex flex-row-reverse bg-teal-50 items-center justify-center relative min-h-[90vh] bg-cover bg-center"
>
      <motion.div
initial={{ x: 0 }}          // start at original position
        animate={{ x: 70 }}        
        transition={{               // smooth spring transition
          type: "spring",
          stiffness: 100,
          damping: 10,
        //   duration: 2,
        }}      >
        <img src={bannerImg} alt="" />
      </motion.div>
      

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-2xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl  font-bold mb-4 text-teal-700">
          Find the Fastest Delivery Service
        </h1>
        <p className="text-lg md:text-xl mb-8 text-teal-700">
          Book your parcel delivery in just a few clicks.
        </p>

        {/* Search bar */}
        <motion.div
          className="bg-white rounded-full shadow-lg flex items-center px-4 py-2 transition-all duration-500 hover:shadow-xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <input
            type="text"
            placeholder="Search for a city, delivery zone..."
            className="flex-1 outline-none text-black px-4 py-2 rounded-full"
          />
          <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors duration-300">
            Search
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};


export default Banner;
