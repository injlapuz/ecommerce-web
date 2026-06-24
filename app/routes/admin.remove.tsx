import { redirect, useLocation } from "react-router";
import type { Route } from "./+types/admin.remove"
import { removeItem } from "~/db";

export async function action({ request }: Route.ActionArgs) {
    const form = await request.formData();
    const product_id = Number(form.get("product_id"));

    const item_id = await removeItem(product_id);
}