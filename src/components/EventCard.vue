<script setup lang="ts">
import type { Event } from '../types/event'
import AppButton from './UI/AppButton.vue'
import AppProgress from './UI/AppProgress.vue'

defineProps<{
  event: Event
}>()

defineEmits<{
  (e: 'register', event: Event): void
}>()
</script>

<template>
  <div
    class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative flex flex-col border border-slate-50 group"
  >
    <div
      class="absolute top-6 right-6 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest z-10"
      :class="event.type === 'free' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'"
    >
      {{ event.type }}
    </div>
    
    <div class="p-8 flex-1 flex flex-col">
      <h3 class="text-2xl font-black mb-3 text-slate-900 leading-tight group-hover:text-[#42b883] transition-colors">
        {{ event.title }}
      </h3>
      <p class="text-slate-500 text-base leading-relaxed mb-8 flex-1">
        {{ event.description }}
      </p>
      
      <div class="flex items-start justify-between gap-6 mb-8">
        <div class="flex-1">
          <AppProgress 
            :current="event.currentAttendees" 
            :max="event.maxCapacity"
            label="joined"
          />
        </div>
        
        <div class="text-3xl font-black text-slate-900 whitespace-nowrap">
          {{ event.type === 'paid' ? `$${event.price}` : 'Free' }}
        </div>
      </div>

      <AppButton 
        variant="dark"
        :disabled="event.currentAttendees >= event.maxCapacity"
        @click="$emit('register', event)"
      >
        {{ event.currentAttendees >= event.maxCapacity ? 'Event Full' : 'Register Now' }}
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind CSS */
</style>
