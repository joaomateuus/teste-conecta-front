import { httpClient } from './api'
import type { BaseService } from '@/@types/BaseService'
import type { User } from '@/@types/User'

export async function login(token: string): Promise<BaseService<User>> {
	const response = await httpClient.post('/auth/login', token)
	let errors = null

	if (!response.data) {
		errors = {
			status: response.request.status as number,
			message: response.request.statusText as string,
			detail: response.request.responseText as string,
		}
	}

	return {
		data: response.data,
		errors,
	}
}
