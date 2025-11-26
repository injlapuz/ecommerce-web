import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import { brandsTable, productsTable, typesTable, usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";

//@ts-ignore
export const db = drizzle(process.env.DATABASE_URL);

export async function getAllProducts() {
  return db.select({
    id: productsTable.id,
    brand: brandsTable.name,
    name: productsTable.name,
    type: typesTable.name,
    price: productsTable.price,
    actuation: productsTable.actuation,
    bottom_out: productsTable.bottom_out,
    total_travel: productsTable.total_travel,
    mount_type: productsTable.mount_type,
    top_housing: productsTable.top_housing,
    bottom_housing: productsTable.bottom_housing,
    lubed: productsTable.lubed,
  }).from(productsTable)
    .innerJoin(brandsTable, eq(productsTable.brand_id, brandsTable.id))
    .innerJoin(typesTable, eq(productsTable.type_id, typesTable.id));
}

export async function getProduct(id: number) {
  const product = await db.select({
    id: productsTable.id,
    brand: brandsTable.name,
    name: productsTable.name,
    type: typesTable.name,
    description: productsTable.description,
    price: productsTable.price,
    actuation: productsTable.actuation,
    bottom_out: productsTable.bottom_out,
    total_travel: productsTable.total_travel,
    mount_type: productsTable.mount_type,
    top_housing: productsTable.top_housing,
    bottom_housing: productsTable.bottom_housing,
    lubed: productsTable.lubed,
  }).from(productsTable)
    .innerJoin(brandsTable, eq(productsTable.brand_id, brandsTable.id))
    .innerJoin(typesTable, eq(productsTable.type_id, typesTable.id))
    .where(eq(productsTable.id, id));

  return product[0];
}

export async function validateCredentials(email: string, password: string) {
  const user = await db.select({
    id: usersTable.id
  }).from(usersTable)
    .where(eq(usersTable.email, email));

  return user[0].id;
}

export async function addUser(email: string, username: string, password: string) {
  await db.insert(usersTable).values([{
    email: email,
    username: username,
    password: password,
  }])
}