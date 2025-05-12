import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaMedal, FaDumbbell, FaChartLine } from "react-icons/fa";
import { MdWork, MdLocationOn, MdAttachMoney } from "react-icons/md";

const Careers = () => {
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

  const jobOpenings = [
    {
      title: "Fitness Coach",
      type: "Full-time",
      location: "Remote/On-site",
      description: "Train clients and create personalized workout plans.",
      icon: <FaDumbbell className="text-amber-500 text-2xl" />
    },
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      description: "Build engaging user interfaces for our fitness platform.",
      icon: <FaChartLine className="text-amber-500 text-2xl" />
    },
    {
      title: "Customer Support",
      type: "Part-time",
      location: "Remote",
      description: "Assist users with platform questions and issues.",
      icon: <FaUsers className="text-amber-500 text-2xl" />
    },
  ];

  const benefits = [
    { title: "Health Insurance", icon: <FaHeartbeat className="text-amber-500" /> },
    { title: "Flexible Hours", icon: <MdWork className="text-amber-500" /> },
    { title: "Gym Membership", icon: <FaDumbbell className="text-amber-500" /> },
    { title: "Remote Options", icon: <MdLocationOn className="text-amber-500" /> },
    { title: "Competitive Pay", icon: <MdAttachMoney className="text-amber-500" /> },
    { title: "Career Growth", icon: <FaMedal className="text-amber-500" /> },
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
                  JOIN OUR TEAM
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Build Careers
              </span>{" "}
              That Inspire Health
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Help millions achieve their fitness goals while growing your career with industry-leading benefits.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Our <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Benefits</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We take care of our team so you can focus on helping others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-amber-500/30 transition-all"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Current <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Openings</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore opportunities to join our growing team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700/50 rounded-xl p-8 border border-gray-600 hover:border-amber-500/30 transition-all"
              >
                <div className="mb-4">{job.icon}</div>
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex gap-4 mb-3 text-sm">
                  <span className="bg-gray-600 px-3 py-1 rounded-full">{job.type}</span>
                  <span className="bg-gray-600 px-3 py-1 rounded-full">{job.location}</span>
                </div>
                <p className="text-gray-300 mb-6">{job.description}</p>
                <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Join Us?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Send us your details and we'll get back to you.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-700/50 rounded-xl p-8 border border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Position</label>
              <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Select a position</option>
                {jobOpenings.map((job, index) => (
                  <option key={index}>{job.title}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Cover Letter</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Tell us why you'd be a great fit..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Resume/CV</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <p className="text-gray-400">Drag and drop files here or click to browse</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-lg hover:shadow-xl transition-all"
            >
              Submit Application
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Careers;