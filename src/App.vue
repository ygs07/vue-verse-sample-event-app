<script setup lang="ts">
import { useAuth } from './composables/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, currentUser, userInitials, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-black text-[#42b883] tracking-tighter hover:opacity-80 transition-opacity">
          VueEvents
        </router-link>

        <div class="flex items-center gap-6">
          <template v-if="isAuthenticated">
            <div class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-slate-900 leading-tight">{{ currentUser?.name }}</p>
                <p class="text-xs text-slate-500 leading-tight">{{ currentUser?.email }}</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-[#42b883] text-white flex items-center justify-center font-bold text-sm shadow-md">
                {{ userInitials }}
              </div>
            </div>
            <button 
              @click="handleLogout" 
              class="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/login" 
              class="px-6 py-2 bg-[#42b883] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#42b883]/20 hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </router-link>
          </template>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Global styles are in main.css */
</style>
