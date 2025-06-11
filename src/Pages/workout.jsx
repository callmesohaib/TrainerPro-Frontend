import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaCalendarAlt, FaClock, FaFire, FaSearch, FaPlus, FaTimesCircle, FaRunning, FaSwimmer, FaBiking } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Workout = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const workoutIcons = {
    strength: <FaDumbbell className="text-amber-400 h-6 w-6" />,
    cardio: <FaRunning className="text-blue-400 h-6 w-6" />,
    swimming: <FaSwimmer className="text-cyan-400 h-6 w-6" />,
    cycling: <FaBiking className="text-green-400 h-6 w-6" />,
    default: <FaDumbbell className="text-gray-400 h-6 w-6" />,
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return navigate("/login");
        }

        const response = await axios.get(`${API_URL}api/workouts/all-workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const workoutsWithDates = response.data.workouts.map((workout) => ({
          ...workout,
          date: new Date(workout.date),
        }));
        setWorkouts(workoutsWithDates);
        setFilteredWorkouts(workoutsWithDates);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch workouts");
        console.error("Error fetching workouts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const filtered = workouts.filter(
      (workout) =>
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkouts(filtered);
  }, [searchTerm, workouts]);

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

  const viewWorkoutDetails = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  const addNewWorkout = () => {
    navigate("/create-workout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Workout
              </span>{" "}
              Management
            </h2>
            <p className="text-gray-300">Track and manage your workout routines</p>
          </div>

          <div className="flex space-x-4 w-full md:w-auto">
            <button
              onClick={addNewWorkout}
              className="px-4 py-2 bg-gradient-to-r cursor-pointer from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> Add Workout
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search workouts by name or type..."
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700 flex items-start"
          >
            <FaTimesCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error loading workouts</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <motion.div variants={itemVariants} className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-gray-300">Loading workouts...</p>
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
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-600 cursor-pointer"
                onClick={() => viewWorkoutDetails(workout._id)}
              >
                <div className="flex items-start mb-4">
                  <div className="bg-amber-500/10 p-3 rounded-lg mr-4">
                    {workoutIcons[workout.type] || workoutIcons.default}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{workout.name}</h3>
                    <p className="text-gray-400 capitalize">{workout.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <FaCalendarAlt className="mr-2 text-gray-400 h-5 w-5" />
                    <span>{workout.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaClock className="mr-2 text-gray-400 h-5 w-5" />
                    <span>{workout.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaFire className="mr-2 text-gray-400 h-5 w-5" />
                    <span>{workout.calories} calories burned</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 mb-1">Exercises:</p>
                    <div className="flex flex-wrap gap-2">
                      {workout.exercises.map((exercise, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 rounded-md text-xs"
                        >
                          {exercise.name || exercise}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workout.difficulty === "Beginner"
                        ? "bg-blue-900/50 text-blue-300"
                        : workout.difficulty === "Intermediate"
                        ? "bg-amber-900/50 text-amber-300"
                        : "bg-red-900/50 text-red-300"
                    }`}
                  >
                    {workout.difficulty}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewWorkoutDetails(workout._id);
                    }}
                    className="px-3 py-1 bg-gray-700 rounded-lg border cursor-pointer border-gray-600 hover:bg-gray-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-20 bg-gray-800/30 rounded-xl"
          >
            <FaDumbbell className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              {searchTerm ? "No workouts match your search" : "No workouts found"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? "Try a different search term"
                : "Add new workouts to get started"}
            </p>
            {!searchTerm && (
              <button
                onClick={addNewWorkout}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg"
              >
                Add Your First Workout
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Workout;