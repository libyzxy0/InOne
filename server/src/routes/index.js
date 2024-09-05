"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = void 0;
var express_1 = require("express");
var version_1 = require("@/utils/version");
var user_controller_1 = require("@/controllers/user.controller");
var router = (0, express_1.Router)();
router.route("/").get(function (req, res) {
    res.json({ message: "Hello, World!" });
});
/* Handle routes for user controller */
router.route("/login").post(user_controller_1.default.login);
router.route("/register").post(user_controller_1.default.register);
router.route("/get-session").get(user_controller_1.default.getSession);
/* Initialize router */
var initializeRoutes = function (app) {
    return app.use(version_1.API_VERSION, router);
};
exports.initializeRoutes = initializeRoutes;
