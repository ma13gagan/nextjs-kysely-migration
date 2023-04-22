import { Generated } from "kysely"

interface IUser {
	id: string
	name: string
	registrationDate: Generated<Date>
	status: Generated<boolean>
	lastPasswordChange: Generated<Date>
	email: string
	phone: string
	password: string
	oldPasswords?: string[]
	emailVerification: Generated<boolean>
	phoneVerification: Generated<boolean>
	role: "admin" | "authenticated"
	prefs?: Record<string, string | number | Date | boolean>
}

export default IUser
