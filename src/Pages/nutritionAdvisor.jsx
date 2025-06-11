import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUtensils, FaCarrot, FaDrumstickBite, FaLeaf } from 'react-icons/fa';
import { MdLocalDining, MdTimer, MdOutlineFoodBank, MdFreeBreakfast } from 'react-icons/md';

const ImageWithLoader = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef(null);


    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
        img.onerror = () => setError(true);
    }, [src]);

    if (error) {
        return (
            <div className={`${className} bg-gray-800 flex items-center justify-center`}>
                <span className="text-gray-500">Image not available</span>
            </div>
        );
    }

    return (
        <div className={`${className} relative overflow-hidden`}>
            {!loaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gray-800 animate-pulse"
                />
            )}
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onError={() => setError(true)}
            />
        </div>
    );
};
const NutritionAdvisor = () => {
    const [meals, setMeals] = useState([]);
    const [nutrients, setNutrients] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apikey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const apiurl = import.meta.env.VITE_SPOONACULAR_API_URL;

    const getMealPlan = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `${apiurl}/mealplanner/generate?apiKey=${apikey}&timeFrame=day&targetCalories=2000`
            );
            setMeals(response.data.meals);
            setNutrients(response.data.nutrients);
        } catch (err) {
            setError('Failed to fetch meal plan. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const mealIcons = {
        breakfast: <MdFreeBreakfast className="text-amber-500 text-2xl" />,
        lunch: <FaDrumstickBite className="text-amber-500 text-2xl" />,
        dinner: <FaUtensils className="text-amber-500 text-2xl" />,
        snack: <FaCarrot className="text-amber-500 text-2xl" />,
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-6 mt-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-6xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="inline-block px-4 py-2 mb-4 bg-gray-800 rounded-full border border-gray-700">
                        <p className="text-sm font-medium text-amber-400">
                            NUTRITION ADVISOR
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Personalized
                        </span>{" "}
                        Meal Planning
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Get AI-generated meal plans tailored to your nutritional needs and preferences.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center mb-16">
                    <button
                        onClick={getMealPlan}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <MdTimer className="animate-spin" />
                                Generating Plan...
                            </>
                        ) : (
                            <>
                                <MdLocalDining />
                                Generate Today's Meal Plan
                            </>
                        )}
                    </button>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg mb-8 max-w-2xl mx-auto text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {meals.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                Your Daily
                            </span>{" "}
                            Meal Plan
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {meals.map((meal, index) => {
                                const mealTimes = ["breakfast", "lunch", "dinner"];
                                const timeOfDay = mealTimes[index] || "snack";
                                return (
                                    <motion.div
                                        key={meal.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-amber-500/30 transition-all h-full flex flex-col"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            {mealIcons[timeOfDay] || <FaLeaf className="text-amber-500 text-2xl" />}
                                            <h3 className="text-xl font-bold capitalize">{timeOfDay}</h3>
                                        </div>
                                        <h4 className="text-lg font-semibold mb-3">{meal.title}</h4>
                                        <div className="mb-4 flex-grow h-48">
                                            <ImageWithLoader
                                                src={`https://spoonacular.com/recipeImages/${meal.image}`}
                                                alt={meal.title}
                                                className="w-full h-full rounded-lg"
                                            />
                                        </div>
                                        <div className="mt-auto">
                                            <p className="text-sm text-gray-300 mb-2">Ready in: {meal.readyInMinutes} mins</p>
                                            <p className="text-sm text-gray-300">Servings: {meal.servings}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {nutrients && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 max-w-3xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                Daily Nutritional
                            </span>{" "}
                            Summary
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
                                <p className="text-amber-500 font-bold text-xl">{nutrients.calories}</p>
                                <p className="text-gray-300 text-sm">CALORIES</p>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
                                <p className="text-amber-500 font-bold text-xl">{nutrients.protein}g</p>
                                <p className="text-gray-300 text-sm">PROTEIN</p>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
                                <p className="text-amber-500 font-bold text-xl">{nutrients.fat}g</p>
                                <p className="text-gray-300 text-sm">FAT</p>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
                                <p className="text-amber-500 font-bold text-xl">{nutrients.carbohydrates}g</p>
                                <p className="text-gray-300 text-sm">CARBS</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {meals.length === 0 && !loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700/50 rounded-xl p-12 text-center border border-gray-600 max-w-3xl mx-auto"
                    >
                        <MdOutlineFoodBank className="text-5xl text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No Meal Plan Generated Yet</h3>
                        <p className="text-gray-300 mb-4">Click the button above to get your personalized daily meal plan</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <MdFreeBreakfast className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">Balanced Nutrition</p>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <FaDrumstickBite className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">2000 Calories</p>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <FaCarrot className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">Varied Recipes</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default NutritionAdvisor;