export interface Event {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
}

export interface Attendee {
  id: number;
  name: string;
  email: string;
}

export interface EventPopularityResult extends Event {
  spotsRemaining: number;
  popularityScore: number;
  popularityTier: string;
}




const events: Event[] = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-03-15T09:00:00.000Z",
    capacity: 200,
    registrationCount: 185
  },
  {
    id: 2,
    name: "Startup Pitch Night",
    date: "2025-02-20T18:00:00.000Z",
    capacity: 50,
    registrationCount: 12
  },
  {
    id: 3,
    name: "Web Dev Workshop",
    date: "2025-02-10T10:00:00.000Z",
    capacity: 30,
    registrationCount: 30
  }
];

const attendees: Attendee[] = [
  { id: 1, name: "Jordan Smith", email: "jordan.smith@email.com" },
  { id: 2, name: "Alex Chen", email: "alex.chen@email.com" }
];




function roundToOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}


export function calculatePopularityScore(capacity: number, registrationCount: number): number {
  if (capacity === 0) {
    return 0;
  }

  const rawScore = (registrationCount / capacity) * 100;
  return roundToOneDecimal(rawScore);
}

export function getPopularityTier(score: number): string {
  if (score >= 90) return "Hot";
  if (score >= 70) return "Popular";
  if (score >= 50) return "Moderate";
  if (score >= 25) return "Building";
  return "New";
}

export function getAllEvents(): Event[] {
  return events;
}

export function getEventById(eventId: number): Event | undefined {
  return events.find((eventItem) => eventItem.id === eventId);
}


export function createEvent(name: string, date: string, capacity: number): Event {
  const maxExistingId = events.reduce((maxId, eventItem) => Math.max(maxId, eventItem.id), 0);
  const newId = maxExistingId + 1;

  const newEvent: Event = {
    id: newId,
    name,
    date,
    capacity,
    registrationCount: 0
  };

  events.push(newEvent);
  return newEvent;
}
export function updateEventById(
  eventId: number,
  updatedFields: Partial<Omit<Event, "id">>): Event | undefined {
  const existingEvent = getEventById(eventId);
  if (!existingEvent) {
    return undefined;
  }

  if (updatedFields.name !== undefined) existingEvent.name = updatedFields.name;
  if (updatedFields.date !== undefined) existingEvent.date = updatedFields.date;
  if (updatedFields.capacity !== undefined) existingEvent.capacity = updatedFields.capacity;
  if (updatedFields.registrationCount !== undefined) existingEvent.registrationCount = updatedFields.registrationCount;

  return existingEvent;
}

export function deleteEventById(eventId: number): boolean {
  const eventIndex = events.findIndex((eventItem) => eventItem.id === eventId);
  if (eventIndex === -1) {
    return false;
  }

  events.splice(eventIndex, 1);
  return true;
}

export function getEventPopularityById(eventId: number): EventPopularityResult | undefined {
  const existingEvent = getEventById(eventId);
  if (!existingEvent) {
    return undefined;
  }

  const spotsRemaining = existingEvent.capacity - existingEvent.registrationCount;
  const popularityScore = calculatePopularityScore(existingEvent.capacity, existingEvent.registrationCount);
  const popularityTier = getPopularityTier(popularityScore);

  return {
    ...existingEvent,
    spotsRemaining,
    popularityScore,
    popularityTier
  };
}