import { redirect, useLocation } from "react-router";
import type { Route } from "./+types/cart.remove"
import { removeItem } from "~/db";

export async function action({ request }: Route.ActionArgs) {
    const form = await request.formData();
    const cart_id = Number(form.get("cart_id"));

    const item_id = await removeItem(cart_id);
}