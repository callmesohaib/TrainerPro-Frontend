import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaTrash, FaArrowLeft, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const DeleteAccount = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const { value } = e.target;
        setPassword(value);

        if (errors.password) {
            setErrors({
                ...errors,
                password: null,
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!password) newErrors.password = "Password is required";
        if (!confirmation) newErrors.confirmation = "You must confirm account deletion";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${API_URL}api/user/delete-account`, {
                data: { password },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                localStorage.removeItem("token");
                localStorage.removeItem("rememberMe");
                navigate("/login");
            }
        } catch (error) {
            setErrors({
                server: error.response?.data?.message ||
                    "Account deletion failed. Please check your password and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.3,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const warningIconVariants = {
        pulse: {
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 mt-15">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 rounded-xl shadow-2xl p-8 border border-gray-600/50 backdrop-blur-sm"
                >
                    {/* Header with animated warning icon */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center mb-8"
                    >
                        <motion.div
                            variants={warningIconVariants}
                            animate="pulse"
                            className="mb-4"
                        >
                            <FaExclamationTriangle className="text-red-400 text-5xl drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            Delete Your Account
                        </h2>
                    </motion.div>

                    {/* Warning message with glow effect */}
                    <motion.div
                        variants={itemVariants}
                        className="relative mb-8"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-20"></div>
                        <div className="relative p-4 bg-gray-700/50 rounded-lg border border-red-900/50">
                            <p className="text-gray-300 text-center">
                                This will <span className="font-bold text-red-300">permanently delete</span> all your:
                            </p>
                            <ul className="mt-2 text-sm text-gray-400 text-center space-y-1">
                                <li>• Personal information</li>
                                <li>• Workout history</li>
                                <li>• Exercise data</li>
                                <li>• Account credentials</li>
                            </ul>
                            <p className="mt-3 text-red-300 font-medium text-center">
                                This action cannot be undone!
                            </p>
                        </div>
                    </motion.div>

                    {/* Error message */}
                    {errors.server && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 mb-6 text-sm text-red-300 bg-red-900/50 rounded-lg border border-red-700/50 flex items-center"
                        >
                            <FaTimesCircle className="mr-2 flex-shrink-0" />
                            {errors.server}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Password field */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <label
                                htmlFor="password"
                                className="block text-gray-300 text-sm font-medium"
                            >
                                Confirm Password
                                <span className="text-red-400 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <motion.input
                                    whileFocus={{
                                        scale: 1.01,
                                        boxShadow: "0 0 0 2px rgba(248, 113, 113, 0.5)"
                                    }}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700/70 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-1 text-sm text-red-300 flex items-center"
                                    >
                                        <FaExclamationCircle className="mr-1" /> {errors.password}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        {/* Confirmation checkbox */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start"
                        >
                            <div className="flex items-center h-5">
                                <input
                                    id="confirmation"
                                    name="confirmation"
                                    type="checkbox"
                                    checked={confirmation}
                                    onChange={() => setConfirmation(!confirmation)}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="confirmation"
                                    className="font-medium text-gray-300"
                                >
                                    I understand this action is irreversible
                                </label>
                                <p className="text-gray-400 mt-1">
                                    By checking this box, you acknowledge all your data will be permanently deleted.
                                </p>
                                {errors.confirmation && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-1 text-sm text-red-300 flex items-center"
                                    >
                                        <FaExclamationCircle className="mr-1" /> {errors.confirmation}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-3.5 bg-gray-600 hover:bg-gray-500 text-gray-200 font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <FaArrowLeft /> Cancel
                            </motion.button>

                            <motion.button
                                variants={buttonVariants}
                                whileHover={!isSubmitting ? "hover" : {}}
                                whileTap={!isSubmitting ? "tap" : {}}
                                type="submit"
                                disabled={isSubmitting || !confirmation}
                                className={`flex-1 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${isSubmitting || !confirmation ? "opacity-70 cursor-not-allowed" : "hover:shadow-red-500/30"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
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
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash /> Delete Account
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DeleteAccount;