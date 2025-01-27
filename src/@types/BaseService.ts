interface DefaultSucessMessage {
	msg: string
}

interface Error {
	status: number
	message: string
	detail: string
}

export interface BaseService<T> {
	data?: T
	message?: DefaultSucessMessage
	errors?: Error | null
}
