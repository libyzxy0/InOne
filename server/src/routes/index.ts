import { Router, Application, Request, Response } from "express";
import { API_VERSION } from "@/utils/version";
import userController from "@/controllers/user.controller";
import threadController from "@/controllers/thread.controller";
import fileUploadController from "@/controllers/file-upload.controller";  

import multer from "multer";

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

/* Handle routes for user controller */
router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/get-session").get(userController.getSession);

/* Handle routes for thread controller */
router.route("/new-thread").post(threadController.createThread);
router.route("/get-all-thread").get(threadController.getAllThread);
router.route("/get-thread/:threadID").get(threadController.getThreadInfo);

/* Handle file upload route */
router.route('/file-api/upload').post(uploadMiddleware.single("file"), fileUploadController.upload);

/* Initialize router */
export const initializeRoutes = (app: Application) =>
  app.use(API_VERSION, router);
