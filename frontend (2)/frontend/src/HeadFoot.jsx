import React, { useContext, useState, useEffect } from "react";
import {
    TruckIcon,
    MagnifyingGlassIcon,
    ArrowRightStartOnRectangleIcon,
    ArrowLeftStartOnRectangleIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link, Outlet, useLocation } from "react-router-dom";
import Slogo from "./images/Slogo.png";
import rcb from "./images/rcb.jpg";
import { CartContext } from "./CartContext";
import "./theme.css";
import { useAuth } from "./auth/AuthContext";
import axiosInstance from "./api/axiosSetup";

function HeadFoot() {
    const location = useLocation();
    const { cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const { userData, accessToken, updateTheme } = useAuth();

    const [themeOpen, setThemeOpen] = useState(false);
    const [themeColor, setThemeColor] = useState("#ffffff");


    useEffect(() => {
        if (userData?.themeColor) setThemeColor(userData.themeColor);
    }, [userData]);


    const applyTheme = (color) => {
        document.documentElement.style.setProperty("--theme-color", color);
        const hex = color.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const textColor = brightness > 150 ? "#000000" : "#ffffff";
        document.documentElement.style.setProperty("--theme-text", textColor);
    };

    useEffect(() => {
        applyTheme(themeColor);
    }, [themeColor]);

    const handleThemeChange = (e) => {
        const color = e.target.value;
        setThemeColor(color);
        setThemeOpen(false);
        if (updateTheme) updateTheme(color);
    };


    return (
        <div className="min-h-screen">

            <button
                onClick={() => setThemeOpen(!themeOpen)}
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    zIndex: 1000,
                    background: "var(--theme-color)",
                    color: "var(--theme-text)",
                    borderRadius: 5,
                    border: "1px solid black",
                    padding: "8px 12px",
                }}
            >
                Theme Editor
            </button>


            {themeOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 60,
                        right: 20,
                        padding: 20,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        zIndex: 1000,
                    }}
                >
                    <label style={{ display: "block", marginBottom: 10 }}>Pick Theme Color:</label>
                    <input type="color" value={themeColor} onChange={handleThemeChange} style={{ width: "100%" }} />
                </div>
            )}


            <header className="shadow-lg">
                <div
                    className="flex items-center space-x-2 px-4 py-2 text-sm"
                    style={{ backgroundColor: "var(--theme-color)", color: "var(--theme-text)" }}>
                    <TruckIcon className="h-5 w-5" />
                    <p className="truncate">Free shipping when shopping up to $1000</p>
                </div>

                <div
                    className="flex flex-col md:flex-row items-center justify-between px-6 py-4"
                    style={{ backgroundColor: "var(--theme-color)", color: "var(--theme-text)" }}>
                    <div className="flex items-center space-x-4">
                        <img src={Slogo} className="h-12 w-auto object-contain rounded-full shadow" alt="SLogo" />
                        <h1 className="text-2xl font-bold tracking-wide font-serif">Shopping Time</h1>
                    </div>

                    <nav>
                        <ul className="flex flex-wrap gap-5 items-center font-medium justify-center">
                            <Link to="/" className="theme-link">Home</Link>
                            <Link to="/HomeParent" className="theme-link">Shop</Link>
                            <Link to="/CollectionsParent" className="theme-link">Collections</Link>
                            <Link to="/About" className="theme-link">About</Link>
                            <Link to="/Contact" className="theme-link">Contact</Link>
                            <Link to="/CartPage" className="theme-link flex items-center space-x-1">
                                <ShoppingCartIcon className="h-5 w-5" />
                                <span>Cart</span>
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>
                            </Link>
                        </ul>
                    </nav>

                    <div>
                        <button
                            style={{
                                backgroundColor: "var(--theme-color)",
                                color: "var(--theme-text)",
                                padding: "6px 12px",
                                borderRadius: 6,
                                marginTop: 10,
                            }}
                        >
                            Flat 10% off on iPhones
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center border rounded-full px-4 py-2 w-full max-w-md shadow-sm ml-30 bg-white">
                        <input
                            id="search"
                            type="search"
                            placeholder="🔍 Search products..."
                            className="flex-grow px-2 py-1 focus:outline-none text-black"
                        />
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                    </div>

                    <div className="flex space-x-4 items-center ml-4 mb-5 md:mb-0 md:ml-0">
                        <div className="flex items-center space-x-2 mr-10">
                            <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-400" />
                            <Link
                                to="/Login"
                                className="px-4 py-2 rounded-full border shadow-sm"
                                style={{
                                    backgroundColor: "var(--theme-color)",
                                    color: "var(--theme-text)",
                                    borderColor: "var(--theme-text)",
                                }}
                            >
                                Login
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 mr-20">
                            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-gray-400" />
                            <Link
                                to="/Logout"
                                className="px-4 py-2 rounded-full border shadow-sm"
                                style={{
                                    backgroundColor: "var(--theme-color)",
                                    color: "var(--theme-text)",
                                    borderColor: "var(--theme-text)",
                                }}
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>

                {!["/HomeParent", "/Login", "/CollectionsParent", "/About", "/Contact", "/Logout", "/CartPage", "/Register",].includes(location.pathname) && (
                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 px-6 md:px-16 py-10 bg-white text-black">
                        <div className="max-w-md space-y-3 text-center md:text-left">
                            <h1 className="text-xl font-extrabold text-rose-600">Royal Red Jersey</h1>
                            <p className="text-3xl font-bold text-gray-800">RCB 2025 New Jersey</p>
                            <p className="text-lg text-pink-600 font-medium">30% off on your first order</p>
                            <Link
                                to="/collectionsParent"
                                className="mt-2 px-6 py-2 rounded-full"
                                style={{ backgroundColor: "var(--theme-color)", color: "var(--theme-text)" }}
                            >
                                Shop Now
                            </Link>
                        </div>
                        <img src={rcb} alt="RCB Jersey" className="h-64 md:h-80 w-auto object-contain drop-shadow-lg" />
                    </div>
                )}
            </header>


            <div className="flex-grow">
                <Outlet />
            </div>

            <footer className="py-10 mt-10" style={{ backgroundColor: "var(--theme-color)", color: "var(--theme-text)" }}>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-md font-bold mb-2">Shopping Time</h2>
                        <p className="text-sm">
                            Your one-stop shop for all things electronics, fashion, and more.
                            Quality products, great prices, and fast delivery.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/HomeParent">Shop</Link></li>
                            <li><Link to="/About">About Us</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-3">Customer Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-3">Contact Us</h3>
                        <p className="space-y-2 text-sm">
                            Email: shoppingTime@gmail.com <br />
                            Phone: +91 123 456 789 <br />
                            Address: 2701 Red Street, Chennai
                        </p>
                    </div>
                </div>

                <div className="text-center text-sm mt-10 border-t pt-4">
                    &copy; {new Date().getFullYear()} Shopping Time. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default HeadFoot;
