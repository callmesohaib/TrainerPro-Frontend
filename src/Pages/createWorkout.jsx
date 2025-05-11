import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaDumbbell, FaRunning, FaSwimmer, FaBiking, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateWorkout = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return navigate("/login");
        }
    });
    const [formData, setFormData] = useState({
        name: "",
        type: "strength",
        date: new Date().toISOString().slice(0, 16),
        duration: 30,
        exercises: [{ name: "", sets: 3, reps: 10, duration: null }],
        notes: "",
        difficulty: "Beginner",
        calories: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(!!id);

    const workoutTypes = [
        { value: "strength", label: "Strength Training", icon: <FaDumbbell className="mr-2" /> },
        { value: "cardio", label: "Cardio", icon: <FaRunning className="mr-2" /> },
        { value: "swimming", label: "Swimming", icon: <FaSwimmer className="mr-2" /> },
        { value: "cycling", label: "Cycling", icon: <FaBiking className="mr-2" /> }
    ];

    const difficulties = ["Beginner", "Intermediate", "Advanced"];

    useEffect(() => {
        if (id) {
            const fetchWorkout = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        return navigate("/login");

                    }
                    const response = await axios.get(`${API_URL}/api/workouts/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const workout = response.data;
                    setFormData({
                        name: workout.name,
                        type: workout.type,
                        date: new Date(workout.date).toISOString().slice(0, 16),
                        duration: workout.duration,
                        exercises: workout.exercises.length > 0 ? workout.exercises : [{ name: "", sets: 3, reps: 10, duration: null }],
                        notes: workout.notes || "",
                        difficulty: workout.difficulty || "Beginner",
                        calories: workout.calories || 0
                    });
                } catch (error) {
                    console.error("Error fetching workout:", error);
                    setSubmitStatus(
                        error.response?.data?.message
                            ? `error: ${error.response.data.message}`
                            : "error: Failed to fetch workout"
                    );
                } finally {
                    setIsLoading(false);
                }
            };
            fetchWorkout();
        } else {
            setIsLoading(false);
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExerciseChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExercises = [...formData.exercises];
        updatedExercises[index][name] = name === "name" ? value : Number(value) || null;
        setFormData(prev => ({ ...prev, exercises: updatedExercises }));
    };

    const addExercise = () => {
        setFormData(prev => ({
            ...prev,
            exercises: [...prev.exercises, { name: "", sets: 3, reps: 10, duration: null }]
        }));
    };

    const removeExercise = (index) => {
        if (formData.exercises.length > 1) {
            const updatedExercises = formData.exercises.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, exercises: updatedExercises }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const workoutData = {
                ...formData,
                date: new Date(formData.date).toISOString(),
                exercises: formData.exercises.map(ex => ({
                    ...ex,
                    duration: formData.type === "cardio" || formData.type === "swimming" || formData.type === "cycling"
                        ? ex.duration || formData.duration
                        : null
                }))
            };

            let response;
            if (id) {
                response = await axios.put(`${API_URL}/api/workouts/${id}`, workoutData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                response = await axios.post(`${API_URL}/api/workouts`, workoutData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            if (response.data.success) {
                setSubmitStatus("success");
                navigate(id ? `/workouts/${id}` : "/schedule");
            }
        } catch (error) {
            console.error(`Error ${id ? "updating" : "creating"} workout:`, error);
            setSubmitStatus(
                error.response?.data?.message
                    ? `error: ${error.response.data.message}`
                    : `error: Failed to ${id ? "update" : "create"} workout`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    <p className="mt-4 text-gray-300">Loading workout details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            {id ? "Edit" : "Create New"}
                        </span>{" "}
                        Workout
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {id ? "Update your workout routine" : "Design your perfect workout routine"}
                    </p>
                </motion.div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700 flex items-start"
                    >
                        <FaCheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Workout {id ? "updated" : "created"} successfully!</p>
                            <p className="text-sm mt-1">Redirecting...</p>
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
                            <p className="font-medium">Error {id ? "updating" : "creating"} workout</p>
                            <p className="text-sm mt-1">
                                {submitStatus.includes(":")
                                    ? submitStatus.split(":")[1]
                                    : "Please try again later."}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Workout Form */}
                <motion.div variants={itemVariants}>
                    <form onSubmit={handleSubmit} className="bg-gray-800/50 p-8 rounded-xl border border-gray-600 shadow-lg">
                        <div className="space-y-6">
                            {/* Workout Basics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Workout Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Morning Routine, Leg Day, etc."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                                        Workout Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    >
                                        {workoutTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                                        Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                                        Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        min="1"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                                        Difficulty
                                    </label>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    >
                                        {difficulties.map((diff) => (
                                            <option key={diff} value={diff}>
                                                {diff}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="calories" className="block text-sm font-medium text-gray-300 mb-2">
                                        Calories Burned
                                    </label>
                                    <input
                                        type="number"
                                        id="calories"
                                        name="calories"
                                        min="0"
                                        value={formData.calories}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Exercises Section */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    <FaDumbbell className="mr-2 text-amber-400" />
                                    Exercises
                                </h3>

                                {formData.exercises.map((exercise, index) => (
                                    <motion.div
                                        key={exercise._id || index}
                                        variants={cardVariants}
                                        className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 mb-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Exercise Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={exercise.name}
                                                    onChange={(e) => handleExerciseChange(index, e)}
                                                    required
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                                                    placeholder="e.g., Bench Press, Running, etc."
                                                />
                                            </div>

                                            {formData.type === "strength" && (
                                                <>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            Sets
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="sets"
                                                            min="1"
                                                            value={exercise.sets || ""}
                                                            onChange={(e) => handleExerciseChange(index, e)}
                                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            Reps
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="reps"
                                                            min="1"
                                                            value={exercise.reps || ""}
                                                            onChange={(e) => handleExerciseChange(index, e)}
                                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {(formData.type === "cardio" || formData.type === "swimming" || formData.type === "cycling") && (
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                                        Duration (minutes)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="duration"
                                                        min="1"
                                                        value={exercise.duration || ""}
                                                        onChange={(e) => handleExerciseChange(index, e)}
                                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                                                    />
                                                </div>
                                            )}

                                            <div className="md:col-span-4 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeExercise(index)}
                                                    className="px-3 py-1 cursor-pointer bg-red-900/50 text-red-400 rounded-lg border border-red-700 hover:bg-red-800/50 transition-colors flex items-center"
                                                >
                                                    <FaTrash className="mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addExercise}
                                    className="px-4 py-2 bg-gray-700 cursor-pointer rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors flex items-center"
                                >
                                    <FaPlus className="mr-2" /> Add Exercise
                                </button>
                            </div>

                            {/* Notes Section */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                                    Additional Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="3"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Any special instructions or notes..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                while capacidades={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-3 bg-gradient-to-r cursor-pointer from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
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
                                        {id ? "Updating" : "Creating"} Workout...
                                    </>
                                ) : (
                                    id ? "Update Workout" : "Create Workout"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CreateWorkout;