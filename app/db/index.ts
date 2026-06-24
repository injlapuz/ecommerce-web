import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import { brandsTable, orderitemsTable, ordersTable, productsTable, typesTable, usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";

//@ts-ignore
export const db = drizzle(process.env.DATABASE_URL);

export async function getAllProducts() {
  return await db.select({
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

export async function removeProduct(id: number) {
  await db.delete(productsTable).where(eq(productsTable.id, id));
}

export async function validateCredentials(email: string, password: string) {
  const user = await db.select({
    id: usersTable.id
  }).from(usersTable)
    .where(eq(usersTable.email, email));

  return user[0].id;
}

export async function addUser(email: string, username: string, password: string, role: string) {
  await db.insert(usersTable).values([{
    email: email,
    username: username,
    password: password,
    user_role: role,
  }]);
}

export async function getCart(id: number) {
  const cart = await db.select({
    cart_id: orderitemsTable.id,
    brand: brandsTable.name,
    name: productsTable.name,
    quantity: orderitemsTable.quantity,
    price: orderitemsTable.price,
  }).from(orderitemsTable)
    .innerJoin(productsTable, eq(orderitemsTable.product_id, productsTable.id))
    .innerJoin(brandsTable, eq(productsTable.brand_id, brandsTable.id))
    .where(eq(orderitemsTable.user_id, id));

  return cart;
}

export async function addCart(user_id: number, product_id: number, quantity: number, price: number) {
  await db.insert(orderitemsTable).values([{
    user_id: user_id,
    product_id: product_id,
    quantity: quantity,
    price: price,
  }]);
}

export async function removeItem(cart_id: number) {
  await db.delete(orderitemsTable).where(eq(orderitemsTable.id, cart_id));
}

export async function addOrder(user_id: number, cart_id: number, total: number, name: string, address: string) {
  await db.insert(ordersTable).values([{
    user_id: user_id,
    orderitems_id: cart_id,
    total: total,
    name: name,
    address: address,
  }]);

  return true;
}