import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaDumbbell, FaRunning, FaSwimmer, FaBiking, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Schedule = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const [activeTab, setActiveTab] = useState("upcoming");

    const workoutIcons = {
        strength: <FaDumbbell className="text-amber-400 h-6 w-6" />,
        cardio: <FaRunning className="text-blue-400 h-6 w-6" />,
        swimming: <FaSwimmer className="text-cyan-400 h-6 w-6" />,
        cycling: <FaBiking className="text-green-400 h-6 w-6" />,
        default: <FaDumbbell className="text-gray-400 h-6 w-6" />,
    };

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    return navigate("/login");

                }

                const response = await axios.get(`${API_URL}api/workouts/all-workouts`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    const workoutsWithDates = response.data.workouts.map((workout) => ({
                        ...workout,
                        date: new Date(workout.date),
                    }));
                    setWorkouts(workoutsWithDates);
                }
            } catch (error) {
                console.error("Error fetching workouts:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkouts();
    }, [navigate]);

    const handleMarkAsCompleted = async (workoutId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.patch(
                `${API_URL}api/workouts/${workoutId}/complete`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                setWorkouts((prevWorkouts) =>
                    prevWorkouts.map((workout) =>
                        workout._id === workoutId
                            ? { ...workout, completed: true }
                            : workout
                    )
                );
            }
        } catch (error) {
            console.error("Error marking workout as completed:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    const handleStartNow = (workoutId) => {
        navigate(`/workouts/${workoutId}`);
    };

    const filteredWorkouts = workouts.filter((workout) => {
        if (activeTab === "upcoming") {
            const workoutDay = new Date(workout.date).getDay();
            return workoutDay === selectedDay && !workout.completed;
        } else {
            return workout.completed;
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const cardVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-6xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Workout
                        </span>{" "}
                        Schedule
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Plan and track your fitness journey with personalized workouts
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex mb-8 border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`px-6 py-3 font-medium cursor-pointer ${activeTab === "upcoming"
                                ? "text-amber-400 border-b-2 border-amber-400"
                                : "text-gray-400 hover:text-gray-300"
                            }`}
                    >
                        Upcoming Workouts
                    </button>
                    <button
                        onClick={() => setActiveTab("completed")}
                        className={`px-6 py-3 font-medium cursor-pointer ${activeTab === "completed"
                                ? "text-amber-400 border-b-2 border-amber-400"
                                : "text-gray-400 hover:text-gray-300"
                            }`}
                    >
                        Completed Workouts
                    </button>
                </motion.div>

                {activeTab === "upcoming" && (
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="grid grid-cols-7 gap-2">
                            {daysOfWeek.map((day, index) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(index)}
                                    className={`py-3 rounded-lg ${selectedDay === index
                                            ? "bg-amber-500 text-gray-900 font-bold cursor-pointer"
                                            : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
                                        }`}
                                >
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {isLoading ? (
                    <motion.div variants={itemVariants} className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </motion.div>
                ) : filteredWorkouts.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredWorkouts.map((workout) => (
                            <motion.div
                                key={workout._id}
                                variants={itemVariants}
                                whileHover="hover"
                                className="bg-gray-800/50 p-6 rounded-xl border border-gray-600"
                            >
                                <div className="flex items-start mb-4">
                                    <div className="bg-gray-700 p-3 rounded-lg mr-4">
                                        {workoutIcons[workout.type] || workoutIcons.default}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{workout.name}</h3>
                                        <p className="text-gray-400 capitalize">{workout.type} workout</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-300">
                                        <FaCalendarAlt className="mr-2 text-gray-400 h-5 w-5" />
                                        {new Date(workout.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <FaClock className="mr-2 text-gray-400 h-5 w-5" />
                                        {workout.duration} minutes
                                    </div>
                                    <div className="pt-3">
                                        <p className="text-gray-400">Exercises:</p>
                                        <ul className="list-disc list-inside text-gray-300">
                                            {workout.exercises.slice(0, 3).map((exercise, i) => (
                                                <li key={i}>{exercise.name}</li>
                                            ))}
                                            {workout.exercises.length > 3 && (
                                                <li className="text-gray-500">
                                                    +{workout.exercises.length - 3} more
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {activeTab === "upcoming" && (
                                    <div className="mt-6 flex space-x-3">
                                        <button
                                            onClick={() => handleStartNow(workout._id)}
                                            className="px-4 py-2 bg-amber-500/10 cursor-pointer text-amber-400 rounded-lg border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                                        >
                                            Start Now
                                        </button>
                                        <button
                                            onClick={() => handleMarkAsCompleted(workout._id)}
                                            className="px-4 py-2 bg-green-500/10 cursor-pointer text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/20 transition-colors flex items-center"
                                        >
                                            <FaCheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={itemVariants}
                        className="text-center py-12 bg-gray-800/30 rounded-xl"
                    >
                        <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-xl font-medium text-gray-300 mb-2">
                            {activeTab === "upcoming"
                                ? "No workouts scheduled for this day"
                                : "No completed workouts yet"}
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {activeTab === "upcoming"
                                ? "Add new workouts to your schedule to get started"
                                : "Complete some workouts to see them here"}
                        </p>
                        {activeTab === "upcoming" && (
                            <NavLink to="/create-workout">
                                <button className="mt-6 px-6 py-3 bg-gradient-to-r cursor-pointer from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg">
                                    Create New Workout
                                </button>
                            </NavLink>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Schedule;