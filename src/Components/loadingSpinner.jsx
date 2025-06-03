import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${fullScreen ? 'fixed inset-0 z-50' : ''} flex items-center justify-center`}
        >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
        </motion.div>
    );
};

export default LoadingSpinner;