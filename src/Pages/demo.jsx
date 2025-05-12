import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaDumbbell, FaChartLine, FaCalendarAlt, FaUserFriends, FaMobileAlt } from "react-icons/fa";
import { MdFitnessCenter, MdTimer, MdOutlineSettingsInputComponent } from "react-icons/md";

const DemoPage = () => {
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

  const features = [
    {
      icon: <MdFitnessCenter className="text-amber-500 text-3xl" />,
      title: "Smart Workouts",
      description: "AI-generated workout plans tailored to your goals and fitness level"
    },
    {
      icon: <FaChartLine className="text-amber-500 text-3xl" />,
      title: "Progress Tracking",
      description: "Detailed analytics to monitor your improvement over time"
    },
    {
      icon: <MdTimer className="text-amber-500 text-3xl" />,
      title: "Workout Timer",
      description: "Built-in interval timer for HIIT and circuit training"
    },
    {
      icon: <FaCalendarAlt className="text-amber-500 text-3xl" />,
      title: "Schedule Management",
      description: "Plan and organize your training sessions"
    },
    {
      icon: <FaUserFriends className="text-amber-500 text-3xl" />,
      title: "Community Support",
      description: "Connect with other fitness enthusiasts"
    },
    {
      icon: <FaMobileAlt className="text-amber-500 text-3xl" />,
      title: "Mobile Friendly",
      description: "Access your workouts anywhere, anytime"
    }
  ];

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
                <p className="text-sm font-medium text-amber-400">
                  TRAINER PRO DEMO
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experience
              </span>{" "}
              The Future of Fitness
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Discover how Trainer Pro can transform your workout routine with intelligent planning and tracking.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors">
                <FaPlay /> Watch Demo Video
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <FaDumbbell /> Try Interactive Demo
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
      </section>

      {/* Features Showcase */}
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
              Key <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for effective training and progress tracking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-amber-500/30 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Try Our
                </span>{" "}
                Interactive Demo
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Experience a simulated version of Trainer Pro with sample data to explore all features.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <MdOutlineSettingsInputComponent className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold">Full Feature Access</h4>
                    <p className="text-gray-300">Explore all functionalities with sample data</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <FaDumbbell className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold">No Account Needed</h4>
                    <p className="text-gray-300">Try immediately without registration</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors">
                Launch Interactive Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="bg-gray-700/50 rounded-2xl overflow-hidden border border-gray-600 shadow-xl">
                <div className="bg-gray-800 p-3 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4">
                        <FaPlay className="text-xl text-gray-900" />
                      </div>
                      <p className="text-gray-300">Trainer Pro Demo Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users achieving their goals with Trainer Pro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;