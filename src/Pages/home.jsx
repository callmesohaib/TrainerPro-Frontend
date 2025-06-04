import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaDumbbell, FaHeartbeat, FaChartLine, FaUserAlt } from "react-icons/fa";

const Home = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

        if (!hasVisitedBefore) {

            speakWelcomeMessage();

            localStorage.setItem('hasVisitedBefore', 'true');
        }
    }, []);

    const speakWelcomeMessage = () => {

        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = "Welcome to our AI Fitness Trainer! We're excited to help you transform your body with precision. Explore our features and start your fitness journey today!";
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.name.includes('English') ||
                voice.lang.includes('en-')
            );

            if (preferredVoice) {
                speech.voice = preferredVoice;
            }

            window.speechSynthesis.speak(speech);
        }
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
                                    AI-POWERED FITNESS
                                </p>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                Transform Your Body
                            </span>{" "}
                            with AI Precision
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                        >
                            Your personalized AI fitness coach that adapts to your goals,
                            tracks your progress, and optimizes every workout.
                        </motion.p>
                        {!isAuthenticated ? (
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
                                <motion.div variants={buttonVariants}>
                                    <NavLink
                                        to="/register"
                                        className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Get Started Free
                                    </NavLink>
                                </motion.div>
                                <motion.div variants={buttonVariants}>
                                    <NavLink
                                        to="/login"
                                        className="inline-block px-8 py-4 bg-gray-700 text-gray-100 font-bold rounded-lg border border-gray-600 hover:bg-gray-600 transition-all"
                                    >
                                        Trainer Login
                                    </NavLink>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">

                                <motion.div variants={buttonVariants}>
                                    <NavLink
                                        to="/contact"
                                        className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Contact Us                                    </NavLink>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                <div className="absolute inset-0 -z-10 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                </div>
            </section>

            {/* Features Section */}
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
                            Why Choose Our{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                AI Trainer
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Cutting-edge technology meets personalized fitness coaching.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaDumbbell className="h-8 w-8" />,
                                title: "Smart Workouts",
                                desc: "AI-generated routines tailored to your fitness level and goals.",
                            },
                            {
                                icon: <FaHeartbeat className="h-8 w-8" />,
                                title: "Health Tracking",
                                desc: "Monitor vitals and recovery with integrated health metrics.",
                            },
                            {
                                icon: <FaChartLine className="h-8 w-8" />,
                                title: "Progress Analytics",
                                desc: "Detailed insights and adaptive recommendations.",
                            },
                            {
                                icon: <FaUserAlt className="h-8 w-8" />,
                                title: "Virtual Coaching",
                                desc: "24/7 guidance with form correction and motivation.",
                            },
                        ].map((feature, index) => (
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
                                <div className="text-amber-400 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.desc}</p>
                            </motion.div>
                        ))}
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
                            Join thousands of users who have achieved their fitness goals with
                            our AI-powered platform.
                        </p>
                        {(!isAuthenticated) ? (
                            <motion.div variants={buttonVariants} className="inline-block">
                                <NavLink
                                    to="/register"
                                    className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                                >
                                    Start Your Free Trial
                                </NavLink>
                            </motion.div>
                        ) : (
                            <motion.div variants={buttonVariants} className="inline-block">
                                <NavLink
                                    to="/dashboard"
                                    className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                                >
                                    Go to Dashboard
                                </NavLink>
                            </motion.div>
                        )
                        }
                    </motion.div>
                </div>
            </section>


        </div>
    );
};

export default Home;