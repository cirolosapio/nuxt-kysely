import { Kysely, sql } from 'kysely'

export async function up (db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('products')
    .addColumn('id', 'serial', col => col.primaryKey())
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('price', 'float8', col => col.notNull())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()
}

export async function down (db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('products').execute()
}
