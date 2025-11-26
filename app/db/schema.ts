import {
  int,
  bigint,
  mysqlTable,
  serial,
  varchar,
  boolean,
  float,
  text,
  decimal,
  timestamp
} from 'drizzle-orm/mysql-core';

export const brandsTable = mysqlTable('brands_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const typesTable = mysqlTable('types_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const productsTable = mysqlTable('products_table', {
  id: serial().primaryKey(),
  brand_id: bigint({ mode: 'number', unsigned: true }).notNull().references(() => brandsTable.id),
  name: varchar({ length: 255 }).notNull().unique(),
  type_id: bigint({ mode: 'number', unsigned: true }).notNull().references(() => typesTable.id),
  description: text(),
  price: decimal({ precision: 10, scale: 2, mode: 'number' }),
  actuation: int(),
  bottom_out: int(),
  total_travel: float(),
  mount_type: int(),
  top_housing: varchar({ length: 255 }),
  bottom_housing: varchar({ length: 255 }),
  lubed: boolean(),
});

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const ordersTable = mysqlTable('orders_table', {
  id: serial().primaryKey(),
  user_id: bigint({ mode: 'number', unsigned: true }).notNull().references(() => usersTable.id),
  total: decimal({ precision: 10, scale: 2, mode: 'number' }).notNull(),
  name: varchar({ length: 255 }),
  address: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow(),
});

export const orderitemsTable = mysqlTable('orderitems_table', {
  id: serial().primaryKey(),
  user_id: bigint({ mode: 'number', unsigned: true }).notNull().references(() => ordersTable.id),
  product_id: bigint({ mode: 'number', unsigned: true }).notNull().references(() => usersTable.id),
  quantity: int().notNull().default(1),
  price: decimal({ precision: 10, scale: 2, mode: 'number' }).notNull(),
})

