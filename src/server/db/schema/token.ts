interface IToken {
	id: string
	type: "ACCESS" | "RESET_PASSWORD" | "VERIFY_EMAIL"
	expires: Date
	token: string
	userId: string
	blacklisted: boolean
}

export default IToken
