import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

const NotificationButton = () => {
  return (
    <motion.button
      whileHover={{
        scale: 1.2,
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6 },
      }}
      className="text-gray-600 hover:text-teal-600 cursor-pointer text-xl"
    >
      <FaBell />
    </motion.button>
  );
};
export default NotificationButton;