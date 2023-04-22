var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value)
				  })
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value))
				} catch (e) {
					reject(e)
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value))
				} catch (e) {
					reject(e)
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected)
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next())
		})
	}
import * as path from "path"
import { promises as fs } from "fs"
import { Kysely, Migrator, FileMigrationProvider, MysqlDialect } from "kysely"
import { createPool } from "mysql2"
import { config } from "dotenv"
config()
function migrateToLatest() {
	return __awaiter(this, void 0, void 0, function* () {
		const db = new Kysely({
			dialect: new MysqlDialect({
				pool: createPool({
					host: process.env.DATABASE_HOST,
					user: process.env.DATABASE_USER,
					password: process.env.DATABASE_PASSWORD,
					database: process.env.DATABASE,
				}),
			}),
		})
		const migrator = new Migrator({
			db,
			provider: new FileMigrationProvider({
				fs,
				path,
				migrationFolder: "./src/server/migrations",
			}),
		})
		const { error, results } = yield migrator.migrateToLatest()
		results === null || results === void 0
			? void 0
			: results.forEach((it) => {
					if (it.status === "Success") {
						console.log(
							`migration "${it.migrationName}" was executed successfully`
						)
					} else if (it.status === "Error") {
						console.error(`failed to execute migration "${it.migrationName}"`)
					}
			  })
		if (error) {
			console.error("failed to migrate")
			console.error(error)
			process.exit(1)
		}
		yield db.destroy()
	})
}
migrateToLatest()
