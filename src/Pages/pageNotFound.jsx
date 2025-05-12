import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
            scale: 1.03,
            transition: {
                duration: 0.3,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
            <div className="container mx-auto px-6 py-12 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-3xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full border border-gray-700 mb-6">
                            <FaExclamationTriangle className="text-amber-500 text-4xl" />
                        </div>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            404
                        </span>{" "}
                        Page Not Found
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-10">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            <FaArrowLeft />
                            Go Back
                        </motion.button>

                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition-colors"
                        >
                            <FaHome />
                            Return Home
                        </motion.button>
                    </motion.div>
                </motion.div>

                <div className="absolute inset-0 -z-10 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;