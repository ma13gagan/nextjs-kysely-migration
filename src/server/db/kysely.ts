import { Kysely, MysqlDialect } from "kysely"
import IUser from "./schema/users"
import IToken from "./schema/token"
import { createPool } from "mysql2"

export interface Database {
	users: IUser
	tokens: IToken
}

const db = new Kysely<any>({
	dialect: new MysqlDialect({
		pool: createPool({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE,
		}),
	}),
})

export default db
