"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
var socketHandler = function (io) {
    io.on("connection", function (socket) {
        console.log("A user connected:", socket.id);
        socket.on("message", function (msg) {
            console.log("Message received:", msg);
            io.emit("event", {
                msg: msg
            });
        });
        socket.on("disconnect", function () {
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.socketHandler = socketHandler;
