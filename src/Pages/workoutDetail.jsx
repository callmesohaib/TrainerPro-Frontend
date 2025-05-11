import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDumbbell, FaCalendarAlt, FaClock, FaFire, FaArrowLeft, FaEdit, FaTrash, FaRunning, FaSwimmer, FaBiking } from "react-icons/fa";
import axios from "axios";

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const workoutIcons = {
    strength: <FaDumbbell className="text-amber-400 h-6 w-6" />,
    cardio: <FaRunning className="text-blue-400 h-6 w-6" />,
    swimming: <FaSwimmer className="text-cyan-400 h-6 w-6" />,
    cycling: <FaBiking className="text-green-400 h-6 w-6" />,
    default: <FaDumbbell className="text-gray-400 h-6 w-6" />,
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/workouts/${id}`);
        setWorkout({
          ...response.data,
          date: new Date(response.data.date),
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch workout details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/workouts/${id}`);
      navigate("/workouts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete workout");
    }
  };

  const handleEdit = () => {
    navigate(`/workouts/edit/${id}`);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-red-900/50 p-6 rounded-lg border border-red-700 max-w-md">
          <h3 className="text-xl font-medium mb-2">Error loading workout</h3>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/workouts")}
            className="px-4 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <FaDumbbell className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Workout not found</h3>
          <button
            onClick={() => navigate("/workouts")}
            className="mt-4 px-4 py-2 bg-amber-500 cursor-pointer text-gray-900 font-bold rounded-lg flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10"
    >
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/workouts")}
            className="flex items-center text-amber-400 cursor-pointer hover:text-amber-300 transition-colors"
          >
            <FaArrowLeft className="mr-2 h-5 w-5" /> Back to Workouts
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-lg flex items-center transition-colors"
            >
              <FaEdit className="mr-2 h-4 w-4" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 cursor-pointer hover:bg-red-500 rounded-lg flex items-center transition-colors"
            >
              <FaTrash className="mr-2 h-4 w-4" /> Delete
            </button>
          </div>
        </div>

        {/* Workout Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl border border-gray-600 overflow-hidden"
        >
          {/* Workout Header */}
          <div className="p-6 bg-gray-700/30 border-b border-gray-600">
            <div className="flex items-start">
              <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                {workoutIcons[workout.type] || workoutIcons.default}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{workout.name}</h1>
                <div className="flex flex-wrap items-center mt-2 gap-3">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm capitalize">
                    {workout.type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${workout.difficulty === "Beginner"
                        ? "bg-blue-900/50 text-blue-300"
                        : workout.difficulty === "Intermediate"
                          ? "bg-amber-900/50 text-amber-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                  >
                    {workout.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Workout Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-3 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p>{workout.date.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-3 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p>{workout.duration} minutes</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaFire className="text-gray-400 mr-3 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Calories</p>
                  <p>{workout.calories} burned</p>
                </div>
              </div>
            </div>

            {/* Exercises Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FaDumbbell className="mr-2 text-amber-400 h-5 w-5" /> Exercises
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="font-medium">{exercise.name || "Unnamed Exercise"}</p>
                    {exercise.sets && (
                      <p className="text-sm text-gray-400">Sets: {exercise.sets}</p>
                    )}
                    {exercise.reps && (
                      <p className="text-sm text-gray-400">Reps: {exercise.reps}</p>
                    )}
                    {exercise.duration && (
                      <p className="text-sm text-gray-400">Duration: {exercise.duration} min</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section (if available) */}
            {workout.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaEdit className="mr-2 text-gray-400 h-5 w-5" /> Notes
                </h3>
                <div className="bg-gray-700/50 p-4 rounded-lg whitespace-pre-line">
                  {workout.notes}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutDetails;