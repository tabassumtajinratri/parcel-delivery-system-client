
import { motion } from "framer-motion";
import { 
  FaCalculator, 
  FaHandHolding, 
  FaBoxOpen, 
  FaShippingFast 
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Instant Quotes",
      description: "Get real-time pricing for your delivery with our transparent quoting system.",
      icon: <FaCalculator className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Careful Handling",
      description: "Expert handlers ensure your packages are treated with the utmost care.",
      icon: <FaHandHolding className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Secure Packaging",
      description: "Premium materials protect your items throughout the journey.",
      icon: <FaBoxOpen className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Express options available with real-time tracking updates.",
      icon: <FaShippingFast className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
            Our Delivery Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience seamless delivery with our premium services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 p-4 rounded-full text-teal-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;