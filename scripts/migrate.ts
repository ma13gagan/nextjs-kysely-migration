import * as path from "path"
import { promises as fs } from "fs"
import { Kysely, Migrator, FileMigrationProvider, MysqlDialect } from "kysely"
import { createPool } from "mysql2"
import { config } from "dotenv"

config()

async function migrateToLatest() {
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

	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: "./src/server/migrations",
		}),
	})

	const { error, results } = await migrator.migrateToLatest()

	results?.forEach((it) => {
		if (it.status === "Success") {
			console.log(`migration "${it.migrationName}" was executed successfully`)
		} else if (it.status === "Error") {
			console.error(`failed to execute migration "${it.migrationName}"`)
		}
	})

	if (error) {
		console.error("failed to migrate")
		console.error(error)
		process.exit(1)
	}

	await db.destroy()
}

migrateToLatest()
