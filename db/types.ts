import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface ProductTable {
  id: Generated<number>
  name: string
  price: number
  created_at: ColumnType<Date, string | undefined, never>
}

export interface Database {
  products: ProductTable
}

export type Product = Selectable<ProductTable>
export type NewProduct = Insertable<ProductTable>
export type ProductUpdate = Updateable<ProductTable>
