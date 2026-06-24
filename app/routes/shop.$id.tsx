import { Form, redirect } from "react-router";
import { addCart, getProduct } from "~/db";
import type { Route } from "./+types/shop.$id"
import { Link } from "react-router"
import { getSession } from "~/sessions.server";

const typeMap: Record<string, string> = {
    "Linear": "badge-error",
    "Tactile": "badge-warning",
    "Clicky": "badge-info",
}


export async function loader({ params }: Route.LoaderArgs) {
    const product = await getProduct(Number(params.id));
    return { product }
}


export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("user_id")) {
        return redirect("/login")
    }
    const form = await request.formData();
    const user_id = Number(session.get("user_id"));
    const product_id = Number(form.get("product_id")) ?? 0;
    const quantity = Number(form.get("quantity")) ?? 0;
    const price = Number(form.get("price")) ?? 0;

    const item_id = await addCart(user_id, product_id, quantity, price)
}

export default function Product({ loaderData }: Route.ComponentProps) {
    const { product } = loaderData;

    return (
        <div className="p-5">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>Items</li>
                    <li><Link to="/shop/products">Switches</Link></li>
                    <li><a>{product.brand} {product.name}</a></li>
                </ul>
            </div>
            <div className="flex justify-center p-5">
                <div className="flex card lg:card-side bg-base-100 drop-shadow-2xl p-10">
                    <figure className="flex-1">
                        <img
                            src={`/switches/${product.brand.toLowerCase()}_${product.name.replaceAll(" ", "").toLowerCase()}.avif`}
                        />
                    </figure>
                    <div className="card-body flex-2">
                        <h2 className="card-title text-3xl">
                            {product.brand} {product.name}
                            <div className={`badge badge-outline ${typeMap[product.type] || "badge-neutral"} ml-2`}>{product.type}</div>
                        </h2>
                        <p className="text-lg">{product.description}</p>
                        <ul className="py-5 text-xl">
                            <li><span className="font-bold">Actuation force:</span> {product.actuation}g</li>
                            <li><span className="font-bold">Bottom out force:</span> {product.bottom_out}g</li>
                            <li><span className="font-bold">Total travel:</span> {product.total_travel} mm</li>
                            <li><span className="font-bold">Mount Type:</span> {product.mount_type}-pin</li>
                            <li><span className="font-bold">Top Housing:</span> {product.top_housing}</li>
                            <li><span className="font-bold">Bottom Housing:</span> {product.bottom_housing}</li>
                            <li><span className="font-bold">Factory Lubed:</span> {product.lubed ? "Yes" : "No"}</li>
                        </ul>
                        <Form method="post" >
                            <div className="card-actions justify-end">
                                <p><span className="font-bold text-lg">₱ {product.price}</span> per 10 pcs</p>
                                <input name="product_id" type="hidden" value={product.id} />
                                <input name="quantity" type="number" className="input validator w-15" required defaultValue={1}
                                    min="1" max="10"
                                    title="Must be between be 1 to 10" />
                                <input name="price" type="hidden" value={product.price ?? 0} />
                                <button className="btn btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
