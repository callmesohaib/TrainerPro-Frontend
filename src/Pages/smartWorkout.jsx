import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const SmartWorkout = () => {
  const [goal, setGoal] = useState("strength");
  const [equipment, setEquipment] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [plan, setPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const WGER_API_KEY = import.meta.env.VITE_WGER_API_KEY;

  const isLikelyEnglish = (text) => {
    return !/[^a-zA-Z\s'-]/.test(text) || text.toLowerCase().includes("with") || text.toLowerCase().includes("swing");
  };

  const fetchWorkoutPlan = async () => {
    if (!WGER_API_KEY || WGER_API_KEY === "your-new-api-key-here") {
      console.error("wger API key is missing or invalid in .env");
      setPlan(["Error: wger API key is missing or invalid."]);
      return;
    }

    setIsLoading(true);
    setPlan([]);

    try {
      const queryParams = new URLSearchParams({
        language: 2,
        limit: 5,
        category: getCategoryForGoal(goal),
        ...(equipment && { equipment }),
        ...(muscleGroup && { muscles: muscleGroup }),
      });

      const response = await axios.get(
        `https://wger.de/api/v2/exerciseinfo/?${queryParams.toString()}`,
        {
          headers: { Authorization: `Token ${WGER_API_KEY}` },
        }
      );
      console.log("wger API response:", response.data);
      const exercises = response.data.results
        .map(ex => {
          console.log("Translations for exercise:", ex.translations);
          const englishTranslation = ex.translations.find(t => t.language === 2);
          let nameToUse = englishTranslation?.name || ex.translations[0]?.name || 'Unknown Exercise';
          if (!englishTranslation && !isLikelyEnglish(nameToUse)) {
            nameToUse = 'Exercise (Translation Not Available)';
          }
          return `${nameToUse}: 3 sets`;
        })
        .filter(exercise => exercise !== null);
      if (exercises.length === 0) throw new Error("No exercises found matching your criteria");
      setPlan(exercises);
    } catch (error) {
      console.error("wger API error:", error);
      setPlan(["No exercises found matching your criteria."]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryForGoal = (goal) => {
    switch (goal) {
      case "strength":
        return 10;
      case "weightLoss":
        return 9;
      case "flexibility":
        return 11;
      case "endurance":
        return 9;
      case "hypertrophy":
        return 10;
      default:
        return 10;
    }
  };

  // Animation variants for the form section
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for exercise list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8 mt-10">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-extrabold text-center text-amber-400 mb-10"
        >
          Smart Workouts
        </motion.h2>

        {/* Form Section */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Goal */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="strength">Strength</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="flexibility">Flexibility</option>
                <option value="endurance">Endurance</option>
                <option value="hypertrophy">Hypertrophy</option>
              </select>
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Equipment</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">Any</option>
                <option value="1">Barbell</option>
                <option value="3">Dumbbell</option>
                <option value="7">Bodyweight</option>
                <option value="10">Kettlebell</option>
              </select>
            </div>

            {/* Muscle Group */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Muscle Group</label>
              <select
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                className="w-full p-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">Any</option>
                <option value="2">Chest</option>
                <option value="4">Legs</option>
                <option value="14">Core</option>
                <option value="1">Arms</option>
                <option value="5">Back</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mt-6">
            <motion.button
              onClick={fetchWorkoutPlan}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05, opacity: isLoading ? 1 : 0.9 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
              }`}
            >
              {isLoading ? "Generating..." : "Generate Plan"}
            </motion.button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-400 text-sm mb-6"
        >
          Note: Consult a professional before starting any workout plan.
        </motion.div>

        {/* Exercise List */}
        <div className="space-y-4">
          <AnimatePresence>
            {plan.length > 0 ? (
              plan.map((exercise, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between transition-transform"
                >
                  <span className="text-gray-200">{exercise}</span>
                  <span className="text-amber-400 text-sm">#{index + 1}</span>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-400"
              >
                {isLoading ? "Loading your workout plan..." : "Select your preferences and generate a plan!"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SmartWorkout;