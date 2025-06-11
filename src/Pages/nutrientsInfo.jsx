import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUtensils, FaCarrot, FaDrumstickBite, FaLeaf } from 'react-icons/fa';
import { MdLocalDining, MdTimer, MdOutlineFoodBank, MdFreeBreakfast } from 'react-icons/md';

const NutritionInfo = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_NINGA_API_KEY;
    const apiUrl = import.meta.env.VITE_NINGA_API_URL;


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

    const getNutritionData = async () => {
        if (!query.trim()) {
            setError('Please enter a food item');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `${apiUrl}?query=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'X-Api-Key': apiKey
                    }
                }
            );
            setNutritionData(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError('Failed to fetch nutrition data. Please try again later.');
            console.error(err);
            setNutritionData([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = (data) => {
        if (!Array.isArray(data)) return {
            calories: 0,
            protein_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0
        };

        return data.reduce((acc, item) => {
            acc.calories += Number(item.calories) || 0;
            acc.protein_g += Number(item.protein_g) || 0;
            acc.fat_total_g += Number(item.fat_total_g) || 0;
            acc.fat_saturated_g += Number(item.fat_saturated_g) || 0;
            acc.carbohydrates_total_g += Number(item.carbohydrates_total_g) || 0;
            acc.fiber_g += Number(item.fiber_g) || 0;
            acc.sugar_g += Number(item.sugar_g) || 0;
            acc.sodium_mg += Number(item.sodium_mg) || 0;
            acc.potassium_mg += Number(item.potassium_mg) || 0;
            acc.cholesterol_mg += Number(item.cholesterol_mg) || 0;
            return acc;
        }, {
            calories: 0,
            protein_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0
        });
    };

    const safeToFixed = (value, decimals = 1) => {
        const num = Number(value);
        return isNaN(num) ? '0' : num.toFixed(decimals);
    };

    const renderNutritionCard = (title, value, unit = '', highlight = false) => {
        return (
            <div className={`bg-gray-800/50 p-4 rounded-lg border border-gray-700 ${highlight ? 'border-amber-500/50' : ''}`}>
                <p className="text-gray-400 text-sm mb-1">{title}</p>
                <p className={`font-bold text-lg ${highlight ? 'text-amber-500' : 'text-gray-100'}`}>
                    {safeToFixed(value, value % 1 === 0 ? 0 : 1)}{unit}
                </p>
            </div>
        );
    };

    const totals = calculateTotals(nutritionData);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 sm:px-6 mt-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-6xl mx-auto"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="inline-block px-4 py-2 mb-4 bg-gray-800 rounded-full border border-gray-700">
                        <p className="text-sm font-medium text-amber-400">
                            NUTRITION ANALYZER
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Detailed
                        </span>{" "}
                        Nutrition Information
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Get comprehensive nutritional data for any food item or meal.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center mb-16 gap-4">
                    <div className="w-full max-w-md">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter food item (e.g., '1lb brisket', '2 eggs')"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-100"
                            onKeyPress={(e) => e.key === 'Enter' && getNutritionData()}
                        />
                    </div>
                    <button
                        onClick={getNutritionData}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <MdTimer className="animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <MdLocalDining />
                                Get Nutrition Data
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

                {nutritionData.length > 0 && (
                    <>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold mb-8 text-center">
                                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                    Detailed
                                </span>{" "}
                                Breakdown
                            </h2>

                            <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                                {nutritionData.map((item, index) => (
                                    <div key={index} className="mb-8 last:mb-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FaUtensils className="text-amber-500 text-xl" />
                                            <h3 className="text-xl font-bold">{item.name || 'Unknown Food'}</h3>

                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            {renderNutritionCard("Total Fat", item.fat_total_g, "g")}
                                            {renderNutritionCard("Carbs", item.carbohydrates_total_g, "g")}
                                            {renderNutritionCard("Saturated Fat", item.fat_saturated_g, "g")}
                                            {renderNutritionCard("Fiber", item.fiber_g, "g")}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                                            {renderNutritionCard("Sugar", item.sugar_g, "g")}
                                            {renderNutritionCard("Sodium", item.sodium_mg, "mg")}
                                            {renderNutritionCard("Potassium", item.potassium_mg, "mg")}
                                            {renderNutritionCard("Cholesterol", item.cholesterol_mg, "mg")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}

                {nutritionData.length === 0 && !loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700/50 rounded-xl p-12 text-center border border-gray-600 max-w-3xl mx-auto"
                    >
                        <MdOutlineFoodBank className="text-5xl text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No Nutrition Data Yet</h3>
                        <p className="text-gray-300 mb-4">Enter a food item above to get detailed nutritional information</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <MdFreeBreakfast className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">Accurate Data</p>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <FaDrumstickBite className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">Detailed Breakdown</p>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <FaCarrot className="text-amber-500 text-xl mb-2 mx-auto" />
                                <p className="text-sm text-gray-300">Common Foods</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default NutritionInfo;