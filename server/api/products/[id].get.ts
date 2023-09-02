export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const product = await kysely()
    .selectFrom('products')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
  return product ?? event.respondWith(new Response('Not found', { status: 404 }))
})
