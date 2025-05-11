import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setFormData({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
          phoneNumber: response.data.user.phoneNumber || ""
        });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubmitStatus("error: Profile endpoint not found - check backend");
      } else {
        setSubmitStatus(
          error.response?.data?.message
            ? `error: ${error.response.data.message}`
            : "error: Failed to load profile"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchProfile();
}, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name) return "error: Name is required";
        if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber))
            return "error: Phone number must be 11 digits";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const validationError = validateForm();
        if (validationError) {
            setSubmitStatus(validationError);
            setIsSubmitting(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setSubmitStatus("error: Please log in to update your profile");
                navigate("/login");
                setIsSubmitting(false);
                return;
            }

            const response = await axios.put(
                `${API_URL}api/user/me`,
                {
                    name: formData.name,
                    phoneNumber: formData.phoneNumber
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setSubmitStatus("success");
                setTimeout(() => setSubmitStatus(null), 5000);
                document.getElementById("name")?.focus();
            }
        } catch (error) {
            setSubmitStatus(
                error.response?.data?.message
                    ? `error: ${error.response.data.message}`
                    : "error: Failed to update profile"
            );
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
                            Your
                        </span>{" "}
                        Profile
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Manage your personal information and keep your details up to date.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Profile Information */}
                    <motion.div variants={itemVariants}>
                        <div className="space-y-8">
                            <motion.div
                                variants={cardVariants}
                                whileHover="hover"
                                className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
                            >
                                <div className="flex items-start">
                                    <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                                        <FaUser className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Full Name</h3>
                                        <p className="text-gray-300">{isLoading ? "Loading..." : formData.name || "Not set"}</p>
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
                                        <h3 className="text-xl font-bold mb-2">Email Address</h3>
                                        <p className="text-gray-300">{isLoading ? "Loading..." : formData.email || "Not set"}</p>
                                        <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
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
                                        <FaPhone className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Phone Number</h3>
                                        <p className="text-gray-300">{isLoading ? "Loading..." : formData.phoneNumber || "Not set"}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Profile Update Form */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-600 shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Update Your Profile</h3>

                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-6 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700 flex items-start"
                                >
                                    <FaCheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Profile updated successfully!</p>
                                        <p className="text-sm mt-1">Your information has been saved.</p>
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
                                        <p className="font-medium">Error updating profile</p>
                                        <p className="text-sm mt-1">
                                            {submitStatus.includes(":")
                                                ? submitStatus.split(":")[1]
                                                : "Please try again later."}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {isLoading ? (
                                <div className="text-center text-gray-300">Loading profile...</div>
                            ) : (
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
                                            disabled
                                            className="w-full px-4 py-3 bg-gray-classifier border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="Your phone number"
                                        />
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
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <FaEdit className="mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;