import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 5) strength += 1;
        if (password.length > 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
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
            const response = await axios.post(`${API_URL}api/user/login`, formData);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                }
                navigate("/");
            }
        } catch (error) {
            setErrors({
                server:
                    error.response?.data?.message || "Login failed. Please try again.",
            });
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
            transition: {
                duration: 0.3,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 mt-6">
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
                    Trainer Login
                </motion.h2>

                {errors.server && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 mb-4 text-sm text-red-300 bg-red-900/50 rounded-lg"
                    >
                        {errors.server}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-1 text-sm text-amber-300"
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label
                            htmlFor="password"
                            className="block text-gray-300 text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-amber-400"
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
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-1 text-sm text-amber-300"
                            >
                                {errors.password}
                            </motion.p>
                        )}
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full ${i <= passwordStrength
                                                ? i <= 2
                                                    ? "bg-red-500"
                                                    : i <= 4
                                                        ? "bg-amber-500"
                                                        : "bg-green-500"
                                                : "bg-gray-600"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <motion.a
                            whileHover={{ color: "#f59e0b" }}
                            href="/forgot-password"
                            className="text-sm text-amber-400 hover:underline"
                        >
                            Forgot password?
                        </motion.a>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            variants={buttonVariants}
                            whileHover={!isSubmitting ? "hover" : {}}
                            whileTap={!isSubmitting ? "tap" : {}}
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-lg shadow-md transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
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
                                    Processing...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                    </motion.div>
                </form>

                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 text-center mt-6 text-sm"
                >
                    Don't have an account?{" "}
                    <NavLink
                        whileHover={{ color: "#f59e0b" }}
                        to="/register"
                        className="text-amber-400 font-medium hover:underline"
                    >
                        Sign Up
                    </NavLink>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;