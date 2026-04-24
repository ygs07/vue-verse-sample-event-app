<script setup lang="ts">
import AppInput from './UI/AppInput.vue'

const twitter = defineModel<string>('twitter', { default: '' })
const linkedin = defineModel<string>('linkedin', { default: '' })
const topic = defineModel<string>('topic', { default: '' })
const description = defineModel<string>('description', { default: '' })
</script>

<template>
  <div class="mt-10 pt-10 border-t-2 border-dashed border-slate-100 animate-[fadeIn_0.5s_ease-out] space-y-6">
    <h3 class="text-xl font-black text-slate-900 flex items-center gap-2 mb-2">
      <span>🎤</span> Speaker Details
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppInput
        id="twitter"
        v-model="twitter"
        label="Twitter (Optional)"
        placeholder="@username"
      />
      <AppInput
        id="linkedin"
        v-model="linkedin"
        label="LinkedIn (Optional)"
        placeholder="username"
      />
    </div>

    <AppInput
      id="topic"
      v-model="topic"
      label="Talk Topic"
      placeholder="Title of your talk"
      required
    />

    <AppInput
      id="description"
      v-model="description"
      label="Talk Description"
      placeholder="What will you talk about?"
      required
      textarea
    />
  </div>
</template>
