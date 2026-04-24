<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  max: number
  label?: string
}>()

const percentage = computed(() => Math.min((props.current / props.max) * 100, 100))
const isFull = computed(() => props.current >= props.max)
</script>

<template>
  <div class="w-full">
    <div class="h-2 bg-slate-100 rounded-full mb-3 overflow-hidden border border-slate-200">
      <div
        class="h-full rounded-full transition-all duration-1000 cubic-bezier(0.34,1.56,0.64,1)"
        :class="isFull ? 'bg-red-500' : 'bg-[#42b883]'"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
    <div v-if="label || $slots.default" class="text-xs font-bold text-slate-500 flex justify-start">
      <slot>
        <span>{{ current }} / {{ max }} {{ label }}</span>
      </slot>
    </div>
  </div>
</template>

