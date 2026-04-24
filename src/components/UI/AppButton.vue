<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'button',
  variant: 'primary',
})

defineEmits<{
  (e: 'click'): void
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-[#42b883] text-white shadow-lg shadow-[#42b883]/30 hover:bg-[#15774b] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#42b883]/40'
    case 'dark':
      return 'bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-900 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/30'
    case 'outline':
      return 'border-2 border-slate-200 bg-transparent text-slate-700 hover:border-[#42b883] hover:text-[#42b883] hover:-translate-y-0.5'
    default:
      return 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:-translate-y-0.5'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full h-14 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:translate-y-0 active:translate-y-0"
    :class="variantClasses"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
/* No styles needed - all handled by Tailwind CSS */
</style>
