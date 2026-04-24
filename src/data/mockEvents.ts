import type { Event } from '../types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Vue.js Amsterdam 2024',
    description: 'The largest Vue.js conference in the world.',
    date: new Date('2024-02-28'),
    maxCapacity: 20,
    currentAttendees: 15,
    type: 'paid',
    price: 499
  },
  {
    id: '2',
    title: 'Vite Conf',
    description: 'A global conference for the Vite community.',
    date: new Date('2024-10-05'),
    maxCapacity: 20,
    currentAttendees: 5,
    type: 'free'
  },
  {
    id: '3',
    title: 'Frontend Masters Workshop',
    description: 'Deep dive into advanced Vue patterns.',
    date: new Date('2024-05-15'),
    maxCapacity: 20,
    currentAttendees: 18,
    type: 'paid',
    price: 199
  }
];
