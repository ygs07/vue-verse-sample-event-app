import { ref, onMounted } from 'vue';
import type { Event, Registration } from '../types/event';
import { mockEvents } from '../data/mockEvents';

export function useVueEvents() {
  const events = ref<Event[]>([]);
  const registrations = ref<Registration[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchEvents = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      events.value = [...mockEvents];
    } catch (e) {
      error.value = 'Failed to load events. Please try again later.';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const addRegistration = (registration: Registration) => {
    // 1. Store the registration
    registrations.value.push(registration);

    // 2. Update the event's attendee count
    const event = events.value.find(e => e.id === registration.eventId);
    if (event && event.currentAttendees < event.maxCapacity) {
      event.currentAttendees++;
    } else if (event) {
      throw new Error('Event is already at maximum capacity.');
    }
  };

  const getEventById = (id: string) => {
    return events.value.find(e => e.id === id);
  };

  onMounted(() => {
    fetchEvents();
  });

  return {
    events,
    registrations,
    isLoading,
    error,
    addRegistration,
    getEventById,
    fetchEvents
  };
}
