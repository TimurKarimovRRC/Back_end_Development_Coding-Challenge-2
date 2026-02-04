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