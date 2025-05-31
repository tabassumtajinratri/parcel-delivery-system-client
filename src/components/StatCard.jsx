import { motion } from "framer-motion";
import CountUp from "react-countup";
import {  FaBoxOpen } from "react-icons/fa";

const StatCard = ({ title, value, delay }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5, scale: 1.03 }}
  >
    <FaBoxOpen className="text-6xl text-teal-600 mx-auto " />
    <h3 className="text-xl font-semibold text-teal-700 mb-2;'">{title}</h3>
    <p className="text-4xl font-bold text-teal-900 my-2">
      <CountUp end={value} duration={2} separator="," />
    </p>
  </motion.div>
);

export default StatCard;
