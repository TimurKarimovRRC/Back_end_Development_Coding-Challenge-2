import express from "express";
import request from "supertest";
import { eventRoutes } from "../src/api/v1/routes/eventRoutes";
import * as eventController from "../src/api/v1/controllers/eventController";

jest.mock("../src/api/v1/controllers/eventController", () => ({
  getAllEventsController: jest.fn((req, res) => res.status(200).json({})),
  getEventByIdController: jest.fn((req, res) => res.status(200).json({})),
  getEventPopularityController: jest.fn((req, res) => res.status(200).json({})),
  createEventController: jest.fn((req, res) => res.status(201).json({})),
  updateEventController: jest.fn((req, res) => res.status(200).json({})),
  deleteEventController: jest.fn((req, res) => res.status(200).json({}))
}));

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/v1", eventRoutes);
  return app;
}

describe("eventRoutes", () => {
  it("should call getAllEventsController for GET /api/v1/events", async () => {
    const app = createTestApp();

    await request(app).get("/api/v1/events");

    expect(eventController.getAllEventsController).toHaveBeenCalledTimes(1);
  });

  it("should call getEventByIdController for GET /api/v1/events/:id", async () => {
    const app = createTestApp();

    await request(app).get("/api/v1/events/1");

    expect(eventController.getEventByIdController).toHaveBeenCalledTimes(1);
  });

  it("should call createEventController for POST /api/v1/events", async () => {
    const app = createTestApp();

    await request(app)
      .post("/api/v1/events")
      .send({ name: "New Event", date: "2025-01-01T10:00:00.000Z", capacity: 10 });

    expect(eventController.createEventController).toHaveBeenCalledTimes(1);
  });

  it("should call deleteEventController for DELETE /api/v1/events/:id", async () => {
    const app = createTestApp();

    await request(app).delete("/api/v1/events/1");

    expect(eventController.deleteEventController).toHaveBeenCalledTimes(1);
  });
});
