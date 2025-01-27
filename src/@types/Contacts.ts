export interface ContactsByDomain {
	domain: string
	emails: Array<{
		email: string
		name: string
	}>
}
