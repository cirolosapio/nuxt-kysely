import * as path from 'node:path'
import { promises as fs } from 'node:fs'
import { Pool } from 'pg'
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely'
import { Database } from './types'
import 'dotenv/config'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.NUXT_HOST,
      database: process.env.NUXT_DATABASE,
      user: process.env.NUXT_USER,
      password: process.env.NUXT_PASSWORD
    })
  })
})

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, 'migrations')
  })
})

async function migrateToLatest () {
  await migrator.migrateDown()
  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') console.log(`migration "${it.migrationName}" was executed successfully`)
    else if (it.status === 'Error') console.error(`failed to execute migration "${it.migrationName}"`)
    else console.log('--- ~ results?.forEach ~ it.status:', it.status)
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
