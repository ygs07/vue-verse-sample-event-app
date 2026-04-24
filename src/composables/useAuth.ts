import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export interface User {
  name: string
  email: string
}

const currentUser = useStorage<User | null>('auth-user', null)

export function useAuth() {
  const isAuthenticated = computed(() => !!currentUser.value)

  const login = (name: string, email: string) => {
    currentUser.value = { name, email }
  }

  const logout = () => {
    currentUser.value = null
  }

  const userInitials = computed(() => {
    if (!currentUser.value?.name) return ''
    return currentUser.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    userInitials
  }
}
