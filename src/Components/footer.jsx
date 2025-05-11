import React from 'react'
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                AI Fitness Trainer
                            </h3>
                            <p className="text-gray-400 mt-2">
                                The future of personalized fitness.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                            <div>
                                <h4 className="text-gray-300 font-medium mb-3">Product</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <NavLink
                                            to="/features"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Features
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/pricing"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Pricing
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/demo"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Demo
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-gray-300 font-medium mb-3">Company</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <NavLink
                                            to="/about"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            About
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/blog"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/careers"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Careers
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-gray-300 font-medium mb-3">Support</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <NavLink
                                            to="/contact"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Contact
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/faq"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            FAQ
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/privacy"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Privacy
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} AI Fitness Trainer. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer
