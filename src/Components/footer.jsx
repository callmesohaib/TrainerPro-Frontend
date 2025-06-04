import React from 'react';
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Brand Section */}
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            AI Fitness Trainer
                        </h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base">
                            The future of personalized fitness.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-3 md:flex gap-22 md:gap-12">
                        {/* Product Column */}
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-gray-300 font-medium mb-3 text-sm md:text-base">Product</h4>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        to="/features"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Features
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/pricing"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Pricing
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/demo"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Demo
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-gray-300 font-medium mb-3 text-sm md:text-base">Company</h4>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        to="/about"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/blog"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Blog
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/careers"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Careers
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Support Column */}
                        <div>
                            <h4 className="text-gray-300 font-medium mb-3 text-sm md:text-base">Support</h4>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/faq"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        FAQ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/privacy"
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm"
                                    >
                                        Privacy
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs md:text-sm">
                    <p>© {new Date().getFullYear()} AI Fitness Trainer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;