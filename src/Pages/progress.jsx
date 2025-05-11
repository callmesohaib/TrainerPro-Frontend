import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink , useNavigate} from "react-router-dom";
import { FaChartLine, FaDumbbell, FaClock, FaFire } from "react-icons/fa";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    avgDuration: 0,
    favoriteWorkout: "None",
  });
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login"); ;

        const response = await axios.get(`${API_URL}/api/workouts/all-workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const fetchedWorkouts = response.data.workouts;
          setWorkouts(fetchedWorkouts);

          // Calculate stats
          const totalWorkouts = fetchedWorkouts.length;
          const totalCalories = fetchedWorkouts.reduce(
            (sum, workout) => sum + (workout.calories || 0),
            0
          );
          const totalDuration = fetchedWorkouts.reduce(
            (sum, workout) => sum + (workout.duration || 0),
            0
          );
          const avgDuration = totalWorkouts
            ? Math.round(totalDuration / totalWorkouts)
            : 0;


          const workoutTypeCounts = {};
          fetchedWorkouts.forEach((workout) => {
            const type = workout.type || "Unknown";
            workoutTypeCounts[type] = (workoutTypeCounts[type] || 0) + 1;
          });
          const favoriteWorkout = Object.entries(workoutTypeCounts).reduce(
            (max, [type, count]) => (count > max.count ? { type, count } : max),
            { type: "None", count: 0 }
          ).type;

          setStats({
            totalWorkouts,
            totalCalories,
            avgDuration,
            favoriteWorkout,
          });

          // Prepare chart data
          setChartData(prepareChartData(fetchedWorkouts));
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const prepareChartData = (fetchedWorkouts) => {
    const sortedWorkouts = [...fetchedWorkouts].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Group by date if multiple workouts per day
    const dailyData = {};
    sortedWorkouts.forEach((workout) => {
      const dateStr = new Date(workout.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!dailyData[dateStr]) {
        dailyData[dateStr] = {
          calories: 0,
          types: new Set(),
          count: 0,
        };
      }
      dailyData[dateStr].calories += workout.calories || 0;
      dailyData[dateStr].types.add(workout.type || "Workout");
      dailyData[dateStr].count++;
    });

    const labels = Object.keys(dailyData);
    const caloriesData = labels.map((date) => dailyData[date].calories);
    const workoutTypes = labels.map(
      (date) =>
        `${Array.from(dailyData[date].types).join(", ")} ${
          dailyData[date].count > 1 ? `(${dailyData[date].count} sessions)` : ""
        }`
    );

    return {
      labels,
      datasets: [
        {
          label: "Calories Burned",
          data: caloriesData,
          backgroundColor: "rgba(255, 191, 0, 0.8)",
          borderColor: "rgba(255, 191, 0, 1)",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
      workoutTypes,
    };
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#d1d5db",
        },
      },
      title: {
        display: true,
        text: "Workout History & Calories Burned",
        color: "#d1d5db",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            return `Workouts: ${chartData.workoutTypes[context.dataIndex]}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d1d5db",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d1d5db",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.1)",
        },
        title: {
          display: true,
          text: "Calories",
          color: "#d1d5db",
        },
      },
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
                <p className="text-sm font-medium text-amber-400">YOUR PROGRESS</p>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Track Your
              </span>{" "}
              Fitness Journey
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Visualize your progress with detailed analytics and stay motivated.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
      </section>

      {/* Stats Section */}
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
                Progress
              </span>{" "}
              Overview
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Key metrics to keep you motivated and on track.
            </p>
          </motion.div>

          {isLoading ? (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    icon: <FaDumbbell className="h-8 w-8" />,
                    title: "Total Workouts",
                    value: stats.totalWorkouts,
                  },
                  {
                    icon: <FaFire className="h-8 w-8" />,
                    title: "Calories Burned",
                    value: stats.totalCalories,
                  },
                  {
                    icon: <FaClock className="h-8 w-8" />,
                    title: "Avg. Duration",
                    value: `${stats.avgDuration} mins`,
                  },
                  {
                    icon: <FaChartLine className="h-8 w-8" />,
                    title: "Favorite Workout",
                    value: stats.favoriteWorkout,
                  },
                ].map((stat, index) => (
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
                    <div className="text-amber-400 mb-4">{stat.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                    <p className="text-2xl text-gray-300">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 mb-12"
              >
                {workouts.length > 0 ? (
                  <Bar data={chartData} options={chartOptions} />
                ) : (
                  <p className="text-gray-300 text-center">
                    No workout data available. Start tracking your progress!
                  </p>
                )}
              </motion.div>

              {workouts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-700/50 rounded-xl p-8 border border-gray-600"
                >
                  <h3 className="text-xl font-bold mb-6 text-amber-400">
                    Recent Workouts
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Workout Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Duration
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Calories
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {[...workouts]
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .slice(0, 5)
                          .map((workout, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {new Date(workout.date).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {workout.type || "General"}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {workout.duration || 0} mins
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {workout.calories || 0}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </>
          )}
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
              Keep Up the Great Work!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Stay consistent and achieve your fitness goals with your next workout.
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

export default Progress;