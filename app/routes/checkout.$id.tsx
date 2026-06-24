import { addOrder, getCart } from "~/db";
import type { Route } from "./+types/checkout.$id"
import { Link, useLoaderData, useFetcher, Form, redirect } from "react-router"
import { getSession } from "~/sessions.server";



export async function loader({ params }: Route.LoaderArgs) {
    const cart = await getCart(Number(params.id));
    return { cart }
}


export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const user_id = Number(session.get("user_id"));
    const form = await request.formData();
    const cart_id = Number(form.get("cart_id"));
    const total = Number(form.get("total"));
    const name = String(form.get("name"));
    const address = String(form.get("address"));

    const success = await addOrder(user_id, cart_id, total, name, address);

    if (success) {
        return redirect("/shop/products")
    }
}

export default function Checkout({ loaderData }: Route.ComponentProps) {
    const { cart } = loaderData;
    const fetcher = useFetcher();
    let total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    return (
        <div className="p-5">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>Order</li>
                    <li>Checkout</li>
                </ul>
            </div>
            <div className="flex justify-center p-5">
                <div className="flex card lg:card-side bg-base-100 drop-shadow-2xl p-10">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart!.map((item: any) => (
                                    <tr key={`item-${item.cart_id}`}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={`/switches/${item.brand.toLowerCase()}_${item.name.replaceAll(" ", "").toLowerCase()}.avif`}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{`${item.brand} ${item.name}`}</div>
                                                    {/*<div className="text-sm opacity-50">Linear</div>*/}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                                        <th>
                                            <fetcher.Form method="post" action="/cart/remove">
                                                <input type="hidden" name="cart_id" value={item.cart_id} />
                                                <button type="submit" className="btn btn-error rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </fetcher.Form>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <th></th>
                                <td></td>
                                <td>Total:</td>
                                <td>₱{total}</td>
                                <td></td>
                            </tfoot>
                        </table>
                        <div className="flex flex-col justify-center">
                            <div className="divider"></div>
                            <Form method="post">
                                <div className="pb-5">
                                    <fieldset className="fieldset">
                                        <input name="cart_id" type="hidden" value={cart[0].cart_id} />
                                        <input name="total" type="hidden" value={total} />
                                        <legend className="fieldset-legend">Delivery Address</legend>
                                        <input name="address" type="text" className="input w-full" placeholder="Enter address" />
                                        <p className="label">Please doublecheck your address</p>
                                        <legend className="fieldset-legend">Recipient Name</legend>
                                        <input name="name" type="text" className="input w-full" placeholder="Enter name" />
                                    </fieldset>
                                </div>
                                <button type="submit" className="py-5 btn btn-success w-full">
                                    Place Order
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
