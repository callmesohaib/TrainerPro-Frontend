import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaDumbbell, FaRunning, FaFireAlt, FaHeartbeat, FaYinYang } from "react-icons/fa";
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";

const SmartWorkout = () => {
  const [muscle, setMuscle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_NINGA_API_KEY;
  const API_URL = import.meta.env.VITE_NINGA_API_URL;

  const muscleGroups = [
    "abdominals", "abductors", "adductors", "biceps", "calves",
    "chest", "forearms", "glutes", "hamstrings", "lats",
    "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"
  ];

  const fetchExercises = async () => {
    if (!muscle) {
      setError("Please select a muscle group");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/exercises?muscle=${muscle}`,
        { headers: { "X-Api-Key": API_KEY } }
      );

      setExercises(response.data || []);
    } catch (err) {
      setError("Failed to fetch exercises. Please try again.");
      console.error("API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const exerciseVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const getExerciseIcon = (type) => {
    switch (type) {
      case "cardio": return <FaRunning className="text-blue-400" />;
      case "strength": return <FaDumbbell className="text-amber-400" />;
      case "powerlifting": return <GiMuscleUp className="text-red-400" />;
      case "plyometrics": return <FaFireAlt className="text-orange-400" />;
      case "strongman": return <FaHeartbeat className="text-purple-400" />;
      case "stretching": return <FaYinYang className="text-green-400" />;
      default: return <GiWeightLiftingUp className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Muscle Focus Exercises
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a muscle group to find targeted exercises
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8 max-w-md mx-auto"
        >
          <div className="space-y-4">
            {/* Muscle Group */}
            <div>
              <label className="block text-gray-300 mb-2">Muscle Group</label>
              <select
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">Select Muscle Group</option>
                {muscleGroups.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle.charAt(0).toUpperCase() + muscle.slice(1).replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <motion.button
                onClick={fetchExercises}
                disabled={isLoading || !muscle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full px-8 py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${isLoading || !muscle
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-gray-900"
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaDumbbell />
                    Find Exercises
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg mb-8 text-center max-w-md mx-auto"
          >
            {error}
          </motion.div>
        )}

        {/* Results */}
        <motion.div variants={itemVariants} className="space-y-6">
          {exercises.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">
                {muscle.charAt(0).toUpperCase() + muscle.slice(1).replace("_", " ")} Exercises
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {exercises.map((exercise) => (
                    <motion.div
                      key={exercise.name}
                      variants={exerciseVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl pt-1">
                          {getExerciseIcon(exercise.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-amber-400">{exercise.name}</h3>
                            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                              {exercise.difficulty}
                            </span>
                          </div>

                          <div className="mt-3 space-y-3">
                            <div>
                              <p className="text-sm text-gray-400">Type</p>
                              <p className="font-medium">{exercise.type}</p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400">Equipment</p>
                              <p className="font-medium">{exercise.equipment || "None specified"}</p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400">Instructions</p>
                              <div
                                className="text-gray-300 mt-1 text-sm max-h-[4.5em] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                              >
                                {exercise.instructions}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-8 w-8 text-amber-500 mb-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Finding the best exercises for you...</p>
                </div>
              ) : (
                <p>Select a muscle group to discover exercises</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SmartWorkout;