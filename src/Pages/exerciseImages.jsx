import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ExerciseImages = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/gym/gym-images");
                setImages(res.data);
            } catch (err) {
                console.error("Error fetching images:", err);
                setError("Failed to load exercise images. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0.5
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0.5,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
            },
        },
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="text-amber-500"
                >
                    <FaSpinner className="h-12 w-12" />
                </motion.div>
                <p className="mt-4 text-lg text-gray-600">Loading exercise images...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!images.length) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center p-6">
                    <p className="text-gray-500">No exercise images available</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="relative w-full max-w-4xl mx-auto mt-20 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white ">
                    <span className="border-b-2 border-amber-400 pb-1 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Exercise Library</span>
                </h2>
                <p className="text-gray-400 mt-3">Visual guides for perfect form</p>
            </div>
            {/* Main Slider */}
            <div className="relative h-[500px] w-full rounded-xl bg-gray-800 shadow-xl border border-amber-400">
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    >
                        <div className="relative h-100 w-full flex items-center justify-center drop-shadow-[0_2px_0px_gray]">
                            <motion.img
                                src={images[currentIndex].url}
                                alt={images[currentIndex].name}
                                className="max-h-full max-w-full object-contain"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />
                        </div>

                        <div className="mt-1 text-center">
                            <h3 className="text-2xl font-bold  bg-gradient-to-r from-amber-400 to-gray-200 bg-clip-text text-transparent capitalize">
                                {images[currentIndex].name
                                    .replace(/\.[^/.]+$/, "")
                                    .replace(/[_-]/g, " ")
                                    .replace(/[0-9]/g, "")
                                    .split(' ')
                                    .filter(word => word !== '')
                                    .slice(0, -1)
                                    .join(' ')
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </h3>
                            <p className="text-amber-400">
                                {currentIndex + 1} of {images.length}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-500 p-3 rounded-full shadow-lg z-10 transition-all"
                    aria-label="Previous image"
                >
                    <FaChevronLeft className="text-gray-800 h-5 w-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-500 p-3 rounded-full shadow-lg z-10 transition-all"
                    aria-label="Next image"
                >
                    <FaChevronRight className="text-gray-800 h-5 w-5" />
                </button>
            </div>

            {/* Thumbnail Indicators */}
            <div className="flex justify-center mt-6 space-x-2 mb-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all ${index === currentIndex ? 'bg-amber-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default ExerciseImages;