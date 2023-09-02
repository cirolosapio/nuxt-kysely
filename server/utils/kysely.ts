import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import type { Database } from '~/db/types'
// import type { DB } from 'kysely-codegen'

export default function () {
  const { host, database, user, password } = useRuntimeConfig()

  const dialect = new PostgresJSDialect({
    postgres,
    options: {
      host,
      database,
      user,
      password
    }
  })

  // return new Kysely<DB>({ dialect })
  return new Kysely<Database>({ dialect })
}
