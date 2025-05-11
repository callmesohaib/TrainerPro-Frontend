import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API_URL}api/contact`, formData);
      console.log(response.data);
      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
        document.getElementById("name")?.focus();
      }
    } catch (error) {
      setSubmitStatus(error.response?.data?.message
        ? `error: ${error.response.data.message}`
        : "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Contact
            </span>{" "}
            Our Team
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? Our support team is here to help you with any inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <div className="space-y-8">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-start">
                  <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                    <FaPhone className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-gray-300">+92 348 4538217</p>
                    <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9am-5pm UTC</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-start">
                  <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                    <FaEnvelope className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-300">sohaibikram249@gmail.com</p>
                    <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-start">
                  <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                    <p className="text-gray-300">Lahore, Pakistan</p>
                    <p className="text-gray-300">Mehboob Garden</p>
                    <p className="text-gray-400 text-sm mt-1">By appointment only</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-600 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700 flex items-start"
                >
                  <FaCheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus?.startsWith("error") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700 flex items-start"
                >
                  <FaTimesCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Error sending message</p>
                    <p className="text-sm mt-1">
                      {submitStatus.includes(":")
                        ? submitStatus.split(":")[1]
                        : "Please try again later."}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;