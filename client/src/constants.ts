const HOSTED_SERVER = "https://inone-server.onrender.com/api/v1";
const HOSTED_SOCKET = "ws://inone-server.onrender.com";


/* API BASE URL */

export const API_BASE = process.env.NODE_ENV === "production" ? HOSTED_SERVER : "http://localhost:3000/api/v1";

/* WEB SOCKET URL */

export const WEB_SOCKET_URL = process.env.NODE_ENV === "production" ? HOSTED_SOCKET : "ws://localhost:3000";

