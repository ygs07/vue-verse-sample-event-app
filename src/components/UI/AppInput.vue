<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  id: string
  textarea?: boolean
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-bold text-slate-600">
      {{ label }}
    </label>
    
    <textarea
      v-if="textarea"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-5 py-4 border-2 transition-all duration-200 outline-none rounded-2xl min-h-[120px] resize-none"
      :class="error ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-100 bg-slate-50 focus:border-[#42b883] focus:bg-white focus:ring-[#42b883]/5'"
      @input="handleInput"
    ></textarea>
    
    <input
      v-else
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-5 py-4 border-2 transition-all duration-200 outline-none rounded-2xl h-14"
      :class="error ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-100 bg-slate-50 focus:border-[#42b883] focus:bg-white focus:ring-[#42b883]/5'"
      @input="handleInput"
    />

    <p v-if="error" class="text-xs font-bold text-red-500 mt-1 pl-1">
      {{ error }}
    </p>
  </div>
</template>
