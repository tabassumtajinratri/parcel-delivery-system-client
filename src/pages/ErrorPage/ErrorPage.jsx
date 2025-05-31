import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSadTear } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-4">
        <FaSadTear className="text-6xl text-red-500" />
      <motion.h1
        className="text-7xl font-extrabold text-red-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        404!
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl md:text-3xl font-semibold text-black transition-colors "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Sorry, the page you are looking for doesn’t exist.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md transition-all duration-300 hover:bg-gray-600 hover:scale-105"
        >
        <FaHome className="inline-block mr-2" />
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
