import express, { Application } from "express";
import Bootstrap from "@/bootstrap";
import notFound from "@/middlewares/not-found";
import { initializeRoutes } from "@/routes";
import cors from "cors";

const app: Application = express();

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Initialize express Application */
Bootstrap(app);

/* Initialize routes */
initializeRoutes(app);

/* Handle 404 */
app.use(notFound);
