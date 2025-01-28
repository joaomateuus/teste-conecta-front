/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { BaseService } from '@/@types/BaseService'
import type { User } from '@/@types/User'
import { loginService } from '@/services/auth'
import { defineStore } from 'pinia'

interface State {
	user: User | null
	authenticated: boolean
	loading: boolean
}

interface Actions {
	authenticateUser: (token: string) => Promise<BaseService<User>>
	logUserOut: () => void
}

export const useAuthStore = defineStore<'auth', State, {}, Actions>('auth', {
	state: () => ({
		user: null,
		authenticated: false,
		loading: false,
	}),
	persist: true,
	actions: {
		async authenticateUser(token: string): Promise<BaseService<User>> {
			const response = await loginService(token)
			this.loading = true

			if (response.data) {
				this.user = response.data
				this.authenticated = true
				this.loading = false
			}

			return response
		},
		logUserOut() {
			this.user = null
			this.authenticated = false
		},
	},
})
