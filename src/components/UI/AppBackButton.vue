<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <button 
    @click="goBack" 
    class="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#42b883] transition-all group mb-6"
  >
    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#42b883]/10 transition-colors">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="group-hover:-translate-x-0.5 transition-transform"
      >
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </div>
    Back
  </button>
</template>
