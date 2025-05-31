import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
];

const quickLinks = [
  { name: "Home", to: "/Home" },
  { name: "Dashboard", to: "/dashboard" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Branding */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" width={40} />
            <Link to="/" className="text-xl lg:text-3xl font-bold tracking-tight">
              <span className="text-gray-800 dark:text-white">Track</span>
              <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-green-400 bg-clip-text text-transparent">
                NGo
              </span>
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            TrackNGo helps you manage your parcels with ease and transparency. Join our community and experience hassle-free delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white text-teal-700">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map(({ name, to }, idx) => (
              <li key={idx}>
                <Link
                  to={to}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition text-base"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white text-teal-700">Contact Us</h3>
          <div className="flex items-center space-x-3 mb-3">
            <FaEnvelope className="text-teal-600" />
            <a href="mailto:support@trackngo.com" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
              support@trackngo.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-teal-600" />
            <a href="tel:+1234567890" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
              +1 (234) 567-890
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white text-teal-700">Follow Us</h3>
          <div className="flex space-x-5">
            {socialLinks.map(({ icon, href, label }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-2xl text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} TrackNGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
