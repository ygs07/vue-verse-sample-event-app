<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import AppButton from '../components/UI/AppButton.vue'
import AppInput from '../components/UI/AppInput.vue'
import AppBackButton from '../components/UI/AppBackButton.vue'

const { login } = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('') // Accepting any password

const handleLogin = () => {
  if (name.value && email.value) {
    login(name.value, email.value)
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center animate-[fadeIn_0.6s_ease-out] px-6">
    <div class="w-full max-w-md">
      <AppBackButton />
      
      <div class="bg-white p-10 rounded-[32px] shadow-xl w-full border border-slate-50">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p class="text-slate-500">Log in to view your registered events</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <AppInput
            id="name"
            v-model="name"
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <AppInput
            id="email"
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            required
          />
          <AppInput
            id="password"
            v-model="password"
            type="password"
            label="Password"
            placeholder="Any password works"
            required
          />

          <div class="pt-4">
            <AppButton type="submit">
              Sign In
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
