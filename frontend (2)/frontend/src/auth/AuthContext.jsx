import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import axiosInstance, { setupAxiosInterceptors } from "../api/axiosSetup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") || "");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const authRef = useRef({
        accessToken: sessionStorage.getItem("accessToken") || "",
        setAccessToken,
        setUserData,
    });

    const applyTheme = (color) => {
        if (!color) return;
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
        authRef.current.accessToken = accessToken;
    }, [accessToken]);

    const refreshToken = useCallback(async () => {
        try {
            const res = await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
            const token = res?.data?.token;
            const user = res?.data?.user;

            if (token) {
                setAccessToken(token);
                authRef.current.accessToken = token;
                sessionStorage.setItem("accessToken", token);
            }
            if (user) {
                setUserData(user);
                applyTheme(user.themeColor);
                sessionStorage.setItem("themeColor", user.themeColor); // ✅ persist theme
            }
            return true;
        } catch (err) {
            setAccessToken("");
            setUserData(null);
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("themeColor"); // ✅ clear theme
            return false;
        }
    }, []);


    const login = async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
            const token = res?.data?.token;
            const user = res?.data?.user;

            if (token) {
                setAccessToken(token);
                authRef.current.accessToken = token;
                sessionStorage.setItem("accessToken", token);
            }
            if (user) {
                setUserData(user);
                applyTheme(user.themeColor);
                sessionStorage.setItem("themeColor", user.themeColor); // ✅ persist theme
            }

            return true;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
            setAccessToken("");
            setUserData(null);
            authRef.current.accessToken = "";
            sessionStorage.removeItem("accessToken");
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const updateTheme = async (color) => {
        try {
            if (!accessToken) return;

            const res = await axiosInstance.put(
                "/auth/theme",
                { themeColor: color },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true,
                }
            );

            const updatedTheme = res.data?.themeColor;
            if (updatedTheme) {
                setUserData((prev) => ({ ...prev, themeColor: updatedTheme }));
                applyTheme(updatedTheme);
            }
        } catch (err) {
            console.error("Failed to save theme:", err);
        }
    };

    useEffect(() => {
        if (!accessToken) return;

        try {
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            const expiry = payload.exp * 1000;
            const timeout = expiry - Date.now() - 5000;

            if (timeout > 0) {
                const timer = setTimeout(() => {
                    refreshToken();
                }, timeout);

                return () => clearTimeout(timer);
            }
        } catch (err) {
            console.error("Failed to decode token", err);
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        const initialize = async () => {
            setupAxiosInterceptors(authRef);
            const success = await refreshToken();
            if (!success) {
                setAccessToken("");
                setUserData(null);
                sessionStorage.removeItem("accessToken");
            }
            setLoading(false);
        };
        initialize();
    }, [refreshToken]);

    useEffect(() => {
        if (userData?.themeColor) applyTheme(userData.themeColor);
    }, [userData]);

    useEffect(() => {
        // Restore saved theme instantly
        const savedTheme = sessionStorage.getItem("themeColor");
        if (savedTheme) applyTheme(savedTheme);

        const initialize = async () => {
            setupAxiosInterceptors(authRef);
            const success = await refreshToken();
            if (!success) {
                setAccessToken("");
                setUserData(null);
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("themeColor");
            }
            setLoading(false);
        };
        initialize();
    }, [refreshToken]);


    return (
        <AuthContext.Provider
            value={{
                accessToken,
                userData,
                login,
                logout,
                refreshToken,
                updateTheme,
                isValidUser: !!accessToken && !!userData,
            }}
        >
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
