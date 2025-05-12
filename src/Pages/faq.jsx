import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaDumbbell, FaChartLine, FaUserAlt, FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { MdFitnessCenter, MdSecurity } from "react-icons/md";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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

  const faqCategories = [
    {
      name: "General",
      icon: <FaQuestionCircle className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "What is Trainer Pro?",
          answer: "Trainer Pro is an intelligent fitness platform that provides personalized workout plans, progress tracking, and AI-powered recommendations to help you achieve your fitness goals."
        },
        {
          question: "Is Trainer Pro suitable for beginners?",
          answer: "Absolutely! Trainer Pro adapts to all fitness levels, from complete beginners to advanced athletes. Our system tailors workouts based on your current abilities."
        },
        {
          question: "How is Trainer Pro different from other fitness apps?",
          answer: "Trainer Pro combines AI-generated workout plans with comprehensive progress tracking and community features, offering a more personalized and data-driven approach to fitness."
        }
      ]
    },
    {
      name: "Workouts",
      icon: <MdFitnessCenter className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "How are workouts generated?",
          answer: "Workouts are generated using our AI system based on your goals, fitness level, available equipment, and progress history."
        },
        {
          question: "Can I customize the generated workouts?",
          answer: "Yes, all workouts can be fully customized. You can swap exercises, adjust sets/reps, or modify rest periods to suit your preferences."
        },
        {
          question: "What types of workouts are available?",
          answer: "We offer strength training, HIIT, cardio, yoga, mobility work, and specialized programs for specific goals like weight loss or muscle building."
        }
      ]
    },
    {
      name: "Progress Tracking",
      icon: <FaChartLine className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "What metrics does Trainer Pro track?",
          answer: "We track workout volume, strength progress, endurance improvements, body measurements (if provided), and consistency metrics."
        },
        {
          question: "Can I connect my wearable device?",
          answer: "Yes, Trainer Pro integrates with Apple Health, Google Fit, Fitbit, and Garmin devices to import activity data."
        },
        {
          question: "How often should I check my progress?",
          answer: "We recommend reviewing your progress weekly for motivation, but focus more on monthly trends for meaningful insights."
        }
      ]
    },
    {
      name: "Account",
      icon: <FaUserAlt className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Go to the login page and click 'Forgot Password'. You'll receive an email with instructions to reset your password."
        },
        {
          question: "Can I share my account with family members?",
          answer: "Account sharing violates our terms of service. We offer family plans at a discounted rate for multiple users."
        },
        {
          question: "How do I delete my account?",
          answer: "Account deletion can be done in your profile settings under 'Account Management'. Note this action is irreversible."
        }
      ]
    },
    {
      name: "Billing",
      icon: <FaCreditCard className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay/Google Pay for mobile users."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Yes, you can cancel your subscription at any time and continue to have access until the end of your billing period."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee if you're not satisfied with your experience."
        }
      ]
    },
    {
      name: "Technical",
      icon: <FaMobileAlt className="text-amber-500 text-2xl" />,
      questions: [
        {
          question: "Is there a mobile app available?",
          answer: "Yes, Trainer Pro is available as a progressive web app (PWA) that works on both iOS and Android devices."
        },
        {
          question: "What browsers are supported?",
          answer: "Trainer Pro works best on Chrome, Safari, Firefox, and Edge. We recommend using the latest browser versions."
        },
        {
          question: "How do I report a bug?",
          answer: "You can report bugs through the 'Help' section in your account or by emailing support@trainerpro.app."
        }
      ]
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
                  NEED HELP?
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Frequently Asked
              </span>{" "}
              Questions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Find answers to common questions about Trainer Pro features, account management, and more.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Browse by <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Category</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-amber-500/30 transition-all cursor-pointer"
                  onClick={() => {
                    const element = document.getElementById(`category-${index}`);
                    element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  <p className="text-gray-300 mt-2">{category.questions.length} questions</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Accordions */}
          <div className="space-y-6">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} id={`category-${catIndex}`} className="scroll-mt-20">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-6 flex items-center gap-3"
                >
                  {category.icon}
                  {category.name}
                </motion.h3>
                
                <div className="space-y-4 mb-12">
                  {category.questions.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-gray-700/50 rounded-xl border border-gray-600 overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center p-6 text-left"
                        onClick={() => toggleAccordion(`${catIndex}-${index}`)}
                      >
                        <h4 className="font-bold text-lg">{item.question}</h4>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${activeIndex === `${catIndex}-${index}` ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        className={`px-6 pb-6 pt-0 transition-all overflow-hidden ${activeIndex === `${catIndex}-${index}` ? 'max-h-96' : 'max-h-0'}`}
                      >
                        <p className="text-gray-300">{item.answer}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block p-4 mb-6 bg-gray-700 rounded-full border border-gray-600">
              <MdSecurity className="text-amber-500 text-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Need <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Help?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is ready to assist you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Community Forum
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;