import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  getEventPopularityById,
  updateEventById
} from "../services/eventService";




export function getAllEventsController(request: Request, response: Response): void {
  const eventList = getAllEvents();

  response.status(HTTP_STATUS.OK).json({
    count: eventList.length,
    events: eventList
  });
}

export function getEventByIdController(request: Request, response: Response): void {
  const eventId = Number(request.params.id);

  if (Number.isNaN(eventId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Event id must be a number." });
    return;
  }

  const existingEvent = getEventById(eventId);

  if (!existingEvent) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Event not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json(existingEvent);
}

export function getEventPopularityController(request: Request, response: Response): void {
  const eventId = Number(request.params.id);

  if (Number.isNaN(eventId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Event id must be a number." });
    return;
  }

  const popularityResult = getEventPopularityById(eventId);

  if (!popularityResult) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Event not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json(popularityResult);
}

export function createEventController(request: Request, response: Response): void {
  const name = request.body?.name;
  const date = request.body?.date;
  const capacity = Number(request.body?.capacity);

  if (!name || !date || Number.isNaN(capacity)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "Missing required fields: name, date, capacity."
    });
    return;
  }

  const createdEvent = createEvent(name, date, capacity);
  response.status(HTTP_STATUS.CREATED).json(createdEvent);
}

export function updateEventController(request: Request, response: Response): void {
  const eventId = Number(request.params.id);

  if (Number.isNaN(eventId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Event id must be a number." });
    return;
  }

  const updatedEvent = updateEventById(eventId, request.body);

  if (!updatedEvent) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Event not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json(updatedEvent);
}

export function deleteEventController(request: Request, response: Response): void {
  const eventId = Number(request.params.id);

  if (Number.isNaN(eventId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Event id must be a number." });
    return;
  }

  const isDeleted = deleteEventById(eventId);

  if (!isDeleted) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Event not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json({ message: "Event deleted." });
}