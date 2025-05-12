import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const links = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Workouts", path: "/workouts" },
        { name: "Schedule", path: "/schedule" },
        { name: "Profile", path: "/profile" },
        { name: "AI Workouts", path: "/smart-workouts" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsOpen(false);
        navigate("/login");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.98 },
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-0 left-0 w-full z-50 bg-gray-900 border-b border-gray-800 shadow-lg"        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0"
                    >
                        <NavLink to="/" className="flex items-center" end>
                            <span className="text-amber-400 text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                TRAINER PRO
                            </span>
                        </NavLink>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="ml-10 flex items-center space-x-4"
                        >
                            {links.map((link) => (
                                <motion.div key={link.path} variants={itemVariants}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                ? "bg-gray-800 text-amber-400"
                                                : "text-gray-300 hover:text-amber-400 hover:bg-gray-800"
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="ml-4 flex space-x-2">
                            {isAuthenticated ? (
                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900 transition-colors"
                                    >
                                        Logout
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <>
                                    <motion.div variants={itemVariants}>
                                        <NavLink to="/login">
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="px-4 py-2 rounded-md text-sm font-medium bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 transition-colors"
                                            >
                                                Login
                                            </motion.button>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <NavLink to="/register">
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 hover:from-amber-600 hover:to-amber-700"
                                            >
                                                Register
                                            </motion.button>
                                        </NavLink>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button (with inline SVGs) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-400 hover:bg-gray-800 focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                // X Icon
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Hamburger Icon
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-gray-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {links.map((link) => (
                            <motion.div
                                key={link.path}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                            ? "bg-gray-900 text-amber-400"
                                            : "text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </motion.div>
                        ))}
                        <div className="mt-4 space-y-2">
                            {isAuthenticated ? (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 rounded-md text-base font-medium bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900"
                                >
                                    Logout
                                </motion.button>
                            ) : (
                                <>
                                    <NavLink to="/login" onClick={() => setIsOpen(false)}>
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="w-full px-4 py-2 rounded-md text-base font-medium bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900"
                                        >
                                            Login
                                        </motion.button>
                                    </NavLink>
                                    <NavLink to="/register" onClick={() => setIsOpen(false)}>
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-full px-4 py-2 rounded-md text-base font-medium bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 hover:from-amber-600 hover:to-amber-700"
                                        >
                                            Register
                                        </motion.button>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
