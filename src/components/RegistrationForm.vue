<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Event, Registration, UserRole } from '../types/event'
import AppButton from './UI/AppButton.vue'
import AppModal from './UI/AppModal.vue'
import AppInput from './UI/AppInput.vue'
import SpeakerFormFields from './SpeakerFormFields.vue'

const props = defineProps<{
  event: Event
  existingRegistrations: Registration[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', registration: Registration): void
}>()

const role = ref<UserRole>('attendee')

// Persistence logic using VueUse useStorage
const formDraft = useStorage('event-registration-draft', {
  name: '',
  email: '',
  twitter: '',
  linkedin: '',
  talkTopic: '',
  talkDescription: '',
})

// Validation Logic
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return emailRegex.test(formDraft.value.email)
})

const isEmailDuplicate = computed(() => {
  return props.existingRegistrations.some(
    (reg) => reg.eventId === props.event.id && reg.email.toLowerCase() === formDraft.value.email.toLowerCase()
  )
})

const emailError = computed(() => {
  if (!formDraft.value.email) return ''
  if (!isEmailValid.value) return 'Please enter a valid email address.'
  if (isEmailDuplicate.value) return 'This email is already registered for this event.'
  return ''
})

const isFormValid = computed(() => {
  const basicFields = !!formDraft.value.name && !!formDraft.value.email && isEmailValid.value && !isEmailDuplicate.value
  
  if (!basicFields) return false
  
  if (role.value === 'speaker') {
    return !!formDraft.value.talkTopic && !!formDraft.value.talkDescription
  }
  
  return true
})

const handleSubmit = () => {
  if (!isFormValid.value) return

  let registration: Registration

  if (role.value === 'speaker') {
    registration = {
      role: 'speaker',
      name: formDraft.value.name,
      email: formDraft.value.email,
      eventId: props.event.id,
      socialHandles: {
        twitter: formDraft.value.twitter,
        linkedin: formDraft.value.linkedin,
      },
      talkTopic: formDraft.value.talkTopic,
      talkDescription: formDraft.value.talkDescription,
    }
  } else {
    registration = {
      role: 'attendee',
      name: formDraft.value.name,
      email: formDraft.value.email,
      eventId: props.event.id,
    }
  }

  // Submit the registration
  emit('submit', registration)

  // Clear storage after successful completion
  formDraft.value = {
    name: '',
    email: '',
    twitter: '',
    linkedin: '',
    talkTopic: '',
    talkDescription: '',
  }
}
</script>

<template>
  <AppModal :title="`Register for ${event.title}`" @close="$emit('close')">
    <div class="animate-[fadeIn_0.4s_ease-out]">
      <div class="flex gap-3 bg-slate-50 p-2 rounded-2xl mb-10 border border-slate-200">
        <button
          class="flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300"
          :class="role === 'attendee' ? 'bg-white text-[#42b883] shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          @click="role = 'attendee'"
        >
          Attendee
        </button>
        <button
          class="flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300"
          :class="role === 'speaker' ? 'bg-white text-[#42b883] shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          @click="role = 'speaker'"
        >
          Speaker
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <AppInput
          id="name"
          v-model="formDraft.name"
          label="Full Name"
          placeholder="John Doe"
          required
        />

        <AppInput
          id="email"
          v-model="formDraft.email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          :error="emailError"
        />

        <SpeakerFormFields
          v-if="role === 'speaker'"
          v-model:twitter="formDraft.twitter"
          v-model:linkedin="formDraft.linkedin"
          v-model:topic="formDraft.talkTopic"
          v-model:description="formDraft.talkDescription"
        />

        <div class="mt-12 flex items-center justify-between gap-8">
          <div v-if="event.type === 'paid'" class="flex flex-col">
            <span class="text-[10px] uppercase font-black text-slate-400 tracking-widest">Total Price</span>
            <span class="text-3xl font-black text-slate-900">${{ event.price }}</span>
          </div>
          <AppButton 
            type="submit" 
            :disabled="!isFormValid"
          >
            Complete Registration
          </AppButton>
        </div>
      </form>
    </div>
  </AppModal>
</template>
