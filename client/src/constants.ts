const HOSTED_SERVER = "https://inone-production.up.railway.app/api/v1";
const HOSTED_SOCKET = "wss://inone-production.up.railway.app";

/* API BASE URL */

export const API_BASE =
  process.env.NODE_ENV === "production"
    ? HOSTED_SERVER
    : "http://localhost:3000/api/v1";

/* WEB SOCKET URL */

export const WEB_SOCKET_URL =
  process.env.NODE_ENV === "production" ? HOSTED_SOCKET : "ws://localhost:3000";
