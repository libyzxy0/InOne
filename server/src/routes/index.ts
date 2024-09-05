import { Router, Application, Request, Response } from "express";
import { API_VERSION } from "@/utils/version";
import userController from "@/controllers/user.controller";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

/* Handle routes for user controller */
router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/get-session").get(userController.getSession);

/* Initialize router */
export const initializeRoutes = (app: Application) =>
  app.use(API_VERSION, router);