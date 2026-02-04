import { Router } from "express";
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  getEventPopularityController,
  updateEventController
} from "../controllers/eventController";

export const eventRoutes = Router();

eventRoutes.get("/events", getAllEventsController);
eventRoutes.get("/events/:id", getEventByIdController);
eventRoutes.get("/events/:id/popularity", getEventPopularityController);

eventRoutes.post("/events", createEventController);
eventRoutes.put("/events/:id", updateEventController);
eventRoutes.delete("/events/:id", deleteEventController);