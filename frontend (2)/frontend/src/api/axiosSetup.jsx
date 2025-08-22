
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const setupAxiosInterceptors = (authRef) => {

    axiosInstance.interceptors.request.use((config) => {
        const token =
            authRef.current?.accessToken || sessionStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            const is401 = error.response?.status === 401;
            const isNotRetry = !originalRequest._retry;
            const isNotRefresh = !originalRequest.url.includes("/auth/refresh-token");

            if (is401 && isNotRetry && isNotRefresh) {
                originalRequest._retry = true;
                try {
                    const res = await axios.post(
                        "http://localhost:5000/api/v1/auth/refresh-token",
                        {},
                        { withCredentials: true }
                    );

                    const newToken = res?.data?.token;
                    if (!newToken) throw new Error("No token returned");

                    authRef.current.setAccessToken(newToken);
                    sessionStorage.setItem("accessToken", newToken);

                    axiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axiosInstance(originalRequest);
                } catch (err) {
                    authRef.current.setAccessToken("");
                    authRef.current.setUserData(null);
                    sessionStorage.removeItem("accessToken");
                    window.location.href = "/login";
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
