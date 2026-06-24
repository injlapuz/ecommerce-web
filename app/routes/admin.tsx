import { Link, useFetcher, data } from "react-router";
import { getAllProducts } from "~/db";
import type { Route } from "./+types/admin";
import { getSession, commitSession } from "~/sessions.server";



export async function loader({ request }: Route.LoaderArgs) {
    const products = await getAllProducts();
    const session = await getSession(
        request.headers.get("Cookie"),
    );

    return { products };
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
    const { products } = loaderData;
    const fetcher = useFetcher();

    return (
        <div className="p-5">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>Items</li>
                    <li><Link to="/shop/products">Switches</Link></li>
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-5">
                {products.map((product: any) => (
                    <Link key={`${product.id}-link`} to={`/shop/${product.id}`} className="hover:brightness-95">
                        <div key={product.id} className="card shadow-xl w-full">
                            <figure>
                                <img
                                    src={`/switches/${product.brand.toLowerCase()}_${product.name.replaceAll(" ", "").toLowerCase()}.avif`}
                                    alt={product.brand + " " + product.name}
                                    className="w-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title h-10 justify-center text-center">{product.brand} {product.name}</h2>
                                <ul className="py-1">
                                    <li><span className="font-bold">Actuation force:</span> {product.actuation}g</li>
                                    <li><span className="font-bold">Bottom out force:</span> {product.bottom_out}g</li>
                                    <li><span className="font-bold">Total travel:</span> {product.total_travel}mm</li>
                                    <li><span className="font-bold">Mount Type:</span> {product.mount_type}-pin</li>
                                    <li><span className="font-bold">Top Housing:</span> {product.top_housing}</li>
                                    <li><span className="font-bold">Bottom Housing:</span> {product.bottom_housing}</li>
                                    <li><span className="font-bold">Factory Lubed:</span> {product.lubed ? "Yes" : "No"}</li>
                                </ul>
                                <fetcher.Form method="post" action="/admin/remove">
                                    <input type="hidden" name="cart_id" value={product.id} />
                                    <button type="submit" className="btn btn-error rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </fetcher.Form>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
