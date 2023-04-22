import { Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("user")
		.addColumn("id", "uuid", (col) => col.primaryKey())
		.addColumn("name", "text", (col) => col.notNull())
		.addColumn("registrationDate", "timestamp")
		.addColumn("status", "boolean", (col) => col.defaultTo(true))
		.addColumn("lastPasswordChange", "timestamp")
		.addColumn("email", "text", (col) => col.unique().notNull())
		.addColumn("phone", "text", (col) => col.unique().notNull())
		.addColumn("password", "text", (col) => col.notNull())
		.addColumn("oldPassword", "json")
		.addColumn("emailVerification", "boolean", (col) => col.defaultTo(false))
		.addColumn("phoneVerification", "boolean", (col) => col.defaultTo(false))
		.addColumn("role", "text")
		.addColumn("prefs", "json")
		.execute()

	await db.schema
		.createTable("token")
		.addColumn("id", "uuid", (col) => col.primaryKey())
		.addColumn("type", "text")
		.addColumn("expires", "timestamp")
		.addColumn("token", "text", (col) => col.notNull())
		.addColumn("userId", "text", (col) => col.notNull())
		.addForeignKeyConstraint(
			"token_userId_fk",
			["userId"],
			"user",
			["id"],
			(cb) => cb.onDelete("cascade")
		)
		.execute()

	await db.schema
		.createIndex("token_userId_index")
		.on("token")
		.column("userId")
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("user").execute()
	await db.schema.dropTable("token").execute()
}
