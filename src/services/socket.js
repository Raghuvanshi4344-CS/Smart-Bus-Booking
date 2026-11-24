import { io } from "socket.io-client";

const SOCKET_URL =
    process.env.REACT_APP_API_URL?.replace(/\/api\/?$/, "") ||
    process.env.REACT_APP_SOCKET_URL ||
    "https://smart-bus-api-24jo.onrender.com";

let socket = null;

export const initSocket = () => {
    if (!socket) {
        const token = localStorage.getItem("accessToken"); // Assuming you store JWT token in localStorage

        socket = io(SOCKET_URL, {
            auth: {
                token: token,
            },
            // Important to send cookies if you need them for sessions/CORS
            withCredentials: true,
            autoConnect: false, // We'll connect manually
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });

        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        return initSocket();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
