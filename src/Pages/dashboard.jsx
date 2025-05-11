import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FaDumbbell, FaChartLine, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [stats, setStats] = useState({ totalWorkouts: 0, totalCalories: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token)
                    return navigate("/login");

                const response = await axios.get(`${API_URL}api/workouts/all-workouts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    const workouts = response.data.workouts;
                    const totalWorkouts = workouts.length;
                    const totalCalories = workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0);
                    setStats({ totalWorkouts, totalCalories });
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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

    const featureVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="inline-block px-4 py-2 mb-4 bg-gray-800 rounded-full border border-gray-700">
                                <p className="text-sm font-medium text-amber-400">
                                    WELCOME BACK
                                </p>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                Your Fitness
                            </span>{" "}
                            Dashboard
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                        >
                            Track your progress, manage your workouts, and achieve your goals with real-time insights.
                        </motion.p>

                        {isLoading ? (
                            <motion.div variants={itemVariants} className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                            </motion.div>
                        ) : (
                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                    <h3 className="text-lg font-bold text-amber-400">Total Workouts</h3>
                                    <p className="text-3xl font-bold">{stats.totalWorkouts}</p>
                                </div>
                                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                    <h3 className="text-lg font-bold text-amber-400">Calories Burned</h3>
                                    <p className="text-3xl font-bold">{stats.totalCalories}</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                <div className="absolute inset-0 -z-10 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Your{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                Dashboard
                            </span>{" "}
                            Overview
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Access your workout history, track progress, and plan your next session.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaDumbbell className="h-8 w-8" />,
                                title: "Workout History",
                                desc: "View and review all your past workouts.",
                                link: "/schedule",
                            },
                            {
                                icon: <FaChartLine className="h-8 w-8" />,
                                title: "Progress Analytics",
                                desc: "Analyze your performance trends over time.",
                                link: "/progress",
                            },
                            {
                                icon: <FaCalendarAlt className="h-8 w-8" />,
                                title: "Scheduled Workouts",
                                desc: "Check and manage your upcoming sessions.",
                                link: "/schedule",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover="hover"
                                variants={featureVariants}
                                className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-amber-500/30 transition-all"
                            >
                                <div className="text-amber-400 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-300 mb-4">{feature.desc}</p>
                                <NavLink
                                    to={feature.link}
                                    className="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    View Details
                                </NavLink>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready for Your Next Workout?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Kickstart your session or explore new fitness challenges today.
                        </p>
                        <motion.div variants={buttonVariants} className="inline-block">
                            <NavLink
                                to="/create-workout"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Start New Workout
                            </NavLink>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;