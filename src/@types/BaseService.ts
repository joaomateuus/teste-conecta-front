export interface BaseService<T> {
	data?: T
	errors?: Error | null
}

interface Error {
	status: number
	message: string
	detail: string
}

export interface DefaultSucessMessage {
	msg: string
}
