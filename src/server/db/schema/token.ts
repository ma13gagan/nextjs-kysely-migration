import IUser from "./users"

interface IToken {
	id: string
	type: "ACCESS" | "RESET_PASSWORD" | "VERIFY_EMAIL"
	expires: Date
	token: string
	userId: IUser
	blacklisted: boolean
}

export default IToken
