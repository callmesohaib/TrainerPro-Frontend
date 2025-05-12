import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaStop, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { nav } from "framer-motion/client";

const WorkoutTimer = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    return navigate("/login");
                }

                const response = await axios.get(`${API_URL}api/workouts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {
                    setWorkout(response.data);
                    setTimeLeft(response.data.duration * 60);
                }
            } catch (error) {
                console.error("Error fetching workout:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkout();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [id, navigate]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                        handleCompleteWorkout(); // Auto-mark as completed
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(workout.duration * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleCompleteWorkout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.patch(
                `${API_URL}api/workouts/${id}/complete`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                setIsCompleted(true);
                setIsActive(false);
                navigate("/schedule");
            }
        } catch (error) {
            console.error("Error marking workout as completed:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-gray-300">
                <p>Workout not found</p>
            </div>
        );
    }

    const progressPercentage = ((workout.duration * 60 - timeLeft) / (workout.duration * 60)) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col mt-10">
            <div className="container mx-auto px-4 py-8 flex-grow">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-300 hover:text-amber-400 mb-6 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> Back to Schedule
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                    {/* Exercise Block */}
                    <div className="w-full max-w-md bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Exercises</h2>
                        <ul className="space-y-3 max-h-[400px] overflow-y-auto">
                            {workout.exercises.map((exercise, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50 transition-transform hover:scale-[1.02]"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-lg">{exercise.name}</h3>
                                        <span className="text-gray-400">
                                            {exercise.sets} sets × {exercise.reps} reps
                                        </span>
                                    </div>
                                    {exercise.notes && (
                                        <p className="text-gray-400 text-sm mt-1">{exercise.notes}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Timer Block */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80 mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    fill="transparent"
                                    stroke="#374151"
                                    strokeWidth="4"
                                />
                                {/* Progress circle - fixed implementation */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    fill="transparent"
                                    stroke="#f59e0b"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray="301.6"
                                    strokeDashoffset={301.6 * (1 - progressPercentage / 100)}
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl font-mono font-bold text-amber-400">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold mb-2 tracking-tight">{workout.name}</h1>
                            <p className="text-gray-400 capitalize text-lg">{workout.type} workout</p>
                        </div>

                        <div className="flex justify-center space-x-4 mb-8">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTimer}
                                className={`px-6 py-3 rounded-full font-bold flex items-center shadow-lg ${isActive
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
                                    } transition-colors`}
                            >
                                {isActive ? (
                                    <>
                                        <FaPause className="mr-2" /> Pause
                                    </>
                                ) : (
                                    <>
                                        <FaPlay className="mr-2" /> Start
                                    </>
                                )}
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={resetTimer}
                                className="px-6 py-3 bg-gray-700 rounded-full font-bold flex items-center border border-gray-600 shadow-lg hover:bg-gray-600/80 transition-colors"
                            >
                                <FaStop className="mr-2" /> Reset
                            </motion.button>
                        </div>

                        {isCompleted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center shadow-lg"
                            >
                                <p className="text-green-400 flex items-center justify-center text-lg">
                                    <FaCheckCircle className="mr-2" /> Workout completed!
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WorkoutTimer;