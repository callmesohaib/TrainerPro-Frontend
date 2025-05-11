import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const API_URL = "http://localhost:5000";

    // Validation functions
    const validateName = (name) => {
        if (!name.trim()) return "Name is required";
        if (name.length < 3) return "Name must be at least 3 characters";
        if (!/^[a-zA-Z ]+$/.test(name)) return "Name can only contain letters and spaces";
        return "";
    };

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
            return "Password must contain uppercase, lowercase, and number";
        return "";
    };

    const validatePhoneNumber = (phoneNumber) => {
        if (!phoneNumber.trim()) return "Phone number is required";
        if (!/^[0-9]{10,15}$/.test(phoneNumber)) return "Please enter a valid phone number";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate on change
        switch (name) {
            case "name":
                setErrors({ ...errors, name: validateName(value) });
                break;
            case "email":
                setErrors({ ...errors, email: validateEmail(value) });
                break;
            case "password":
                setErrors({ ...errors, password: validatePassword(value) });
                break;
            case "phoneNumber":
                setErrors({ ...errors, phoneNumber: validatePhoneNumber(value) });
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            phoneNumber: validatePhoneNumber(formData.phoneNumber),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${API_URL}/api/user/register`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response from server:", response.data);

            if (response.data.success) {
                navigate("/login", { state: { registrationSuccess: true } });
            }
        } catch (error) {
            console.error("Error during registration:", error);

            let errorMessage = "Registration failed. Please try again.";
            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.status === 400) {
                    errorMessage = "Validation error. Please check your input.";
                } else if (error.response.status === 409) {
                    errorMessage = "Email already exists. Please use a different email.";
                }
            }

            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

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
            transition: { duration: 0.3 },
        },
        tap: { scale: 0.98 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 mt-15">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl p-8 border border-gray-600"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
                >
                    Trainer Registration
                </motion.h2>

                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-200 text-sm"
                    >
                        {submitError}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                            Name
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="Your full name"
                            required
                            autoComplete="name"
                            className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border ${errors.name ? "border-red-500" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            id="email"
                            required
                            autoComplete="email"
                            name="email"
                            placeholder="your.email@example.com"
                            className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border ${errors.email ? "border-red-500" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                    </motion.div>

                    {/* Phone Number */}
                    <motion.div variants={itemVariants}>
                        <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="tel"
                            onChange={handleChange}
                            value={formData.phoneNumber}
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            placeholder="1234567890"
                            className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border ${errors.phoneNumber ? "border-red-500" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>
                        )}
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={itemVariants}>
                        <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                required
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border ${errors.password ? "border-red-500" : "border-gray-600"
                                    } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-400 hover:text-amber-400"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="h-5 w-5" />
                                ) : (
                                    <FaEye className="h-5 w-5" />
                                )}

                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-400">
                            Password must contain:
                            <ul className="list-disc list-inside">
                                <li className={formData.password.length >= 8 ? "text-green-400" : ""}>
                                    At least 8 characters
                                </li>
                                <li className={/[A-Z]/.test(formData.password) ? "text-green-400" : ""}>
                                    One uppercase letter
                                </li>
                                <li className={/[a-z]/.test(formData.password) ? "text-green-400" : ""}>
                                    One lowercase letter
                                </li>
                                <li className={/\d/.test(formData.password) ? "text-green-400" : ""}>
                                    One number
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="pt-2">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-lg shadow-md transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : "Register"}
                        </motion.button>
                    </motion.div>
                </form>

                {/* Redirect to Login */}
                <motion.p variants={itemVariants} className="text-gray-400 text-center mt-6 text-sm">
                    Already have an account?{" "}
                    <NavLink
                        to="/login"
                        className="text-amber-400 font-medium hover:underline hover:text-amber-300 transition-colors"
                    >
                        Sign In
                    </NavLink>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Register;