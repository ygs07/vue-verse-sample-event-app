<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVueEvents } from '../composables/useVueEvents'
import { useAuth } from '../composables/useAuth'
import type { Event, Registration } from '../types/event'
import EventCard from '../components/EventCard.vue'
import RegistrationForm from '../components/RegistrationForm.vue'

const { events, addRegistration, isLoading, error, registrations } = useVueEvents()
const { isAuthenticated, currentUser } = useAuth()

const selectedEvent = ref<Event | null>(null)

const filteredEvents = computed(() => {
  if (!isAuthenticated.value) return events.value
  
  // Filter events where the user is registered
  return events.value.filter(event => 
    registrations.value.some(reg => 
      reg.eventId === event.id && 
      reg.email.toLowerCase() === currentUser.value?.email.toLowerCase()
    )
  )
})

const handleRegister = (event: Event) => {
  selectedEvent.value = event
}

const handleRegistrationSubmit = (registration: Registration) => {
  try {
    addRegistration(registration)
    selectedEvent.value = null
    const eventName = events.value.find((e) => e.id === registration.eventId)?.title || 'the event'
    alert(`Successfully registered as ${registration.role} for ${eventName}!`)
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Registration failed')
  }
}
</script>

<template>
  <div class="animate-[fadeIn_0.8s_ease-out]">
    <header class="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-black mb-4 text-[#42b883] tracking-tighter">
          {{ isAuthenticated ? 'My Registered Events' : 'Upcoming Events' }}
        </h1>
        <p class="text-xl text-slate-500 leading-relaxed">
          {{ isAuthenticated 
            ? 'Here are the events you have successfully registered for.' 
            : 'Connect, share, and grow with our community. Limited seats available per event.' 
          }}
        </p>
      </div>
      <div class="flex gap-8">
        <div class="text-left md:text-right">
          <span class="block text-xs uppercase text-slate-400 tracking-[0.2em] font-bold mb-1">
            {{ isAuthenticated ? 'Your Registrations' : 'Total Events' }}
          </span>
          <span class="text-4xl font-black text-[#42b883]">
            {{ filteredEvents.length }}
          </span>
        </div>
      </div>
    </header>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-32 text-slate-400">
      <div
        class="w-12 h-12 border-4 border-slate-200 border-b-[#42b883] rounded-full animate-spin mb-6"
      ></div>
      <p class="font-medium">Fetching amazing events...</p>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-32 text-slate-400">
      <p class="mb-4">{{ error }}</p>
      <button
        @click="() => window.location.reload()"
        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors"
      >
        Retry
      </button>
    </div>

    <div
      v-else-if="filteredEvents.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-[slideIn_0.8s_ease-out]"
    >
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @register="handleRegister"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-32 text-slate-400 text-center">
      <p class="text-xl font-medium mb-4">No events found.</p>
      <p v-if="isAuthenticated">You haven't registered for any events yet.</p>
      <router-link v-if="isAuthenticated" to="/" class="mt-6 text-[#42b883] font-bold hover:underline" @click="() => {}">
        Browse All Events
      </router-link>
    </div>

    <RegistrationForm
      v-if="selectedEvent"
      :event="selectedEvent"
      :existing-registrations="registrations"
      @close="selectedEvent = null"
      @submit="handleRegistrationSubmit"
    />
  </div>
</template>
