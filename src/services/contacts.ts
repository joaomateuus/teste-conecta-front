import type { BaseService } from '@/@types/BaseService'
import type { ContactsByDomain } from '@/@types/Contacts'
import { httpClient } from './api'

export async function getContactsByDomainService(
	googleResourceName: string,
): Promise<BaseService<ContactsByDomain[]>> {
	const formatedResourceName = googleResourceName.split('/')[1]
	const response = await httpClient.get(`/auth/contacts/${formatedResourceName}`)
	let errors = null

	if (!response.data) {
		errors = {
			status: response.request.status as number,
			message: response.request.statusText as string,
			detail: response.request.responseText as string,
		}
	}

	return {
		data: response.data.data,
		errors,
	}
}
