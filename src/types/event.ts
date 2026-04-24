export type UserRole = 'speaker' | 'attendee';

export interface BaseEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  maxCapacity: number;
  currentAttendees: number;
}

export interface FreeEvent extends BaseEvent {
  type: 'free';
}

export interface PaidEvent extends BaseEvent {
  type: 'paid';
  price: number;
}

export type Event = FreeEvent | PaidEvent;

export interface RegistrationBase {
  name: string;
  email: string;
  eventId: string;
}

export interface AttendeeRegistration extends RegistrationBase {
  role: 'attendee';
}

export interface SpeakerRegistration extends RegistrationBase {
  role: 'speaker';
  socialHandles: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  talkTopic: string;
  talkDescription: string;
}

export type Registration = AttendeeRegistration | SpeakerRegistration;
