<script setup lang="ts">
interface Props {
  title?: string
  maxWidth?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: '600px',
})

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-50 p-6"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white p-8 md:p-12 rounded-[32px] w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[modalScale_0.4s_cubic-bezier(0.34,1.56,0.64,1)] relative"
        :style="{ maxWidth }"
      >
        <header v-if="title || $slots.header" class="flex justify-between items-start mb-10">
          <slot name="header">
            <h2 class="text-3xl font-black text-slate-900 leading-tight">
              {{ title }}
            </h2>
          </slot>
          <button
            class="bg-slate-100 hover:bg-red-500 hover:text-white border-none w-10 h-10 rounded-xl text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:rotate-90 text-slate-500"
            @click="$emit('close')"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <main class="relative">
          <slot />
        </main>

        <footer v-if="$slots.footer" class="mt-10 pt-8 border-t border-slate-100">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>
