import { Router, Application, Request, Response } from "express";
import { API_VERSION } from "@/utils/version";
import userController from "@/controllers/user.controller";
import threadController from "@/controllers/thread.controller";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

/* Handle routes for user controller */
router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/get-session").get(userController.getSession);

router.route('/new-thread').post(threadController.createThread)
router.route('/get-all-thread').get(threadController.getAllThread)
router.route('/get-thread/:threadID').get(threadController.getThreadInfo)


/* Initialize router */
export const initializeRoutes = (app: Application) =>
  app.use(API_VERSION, router);