
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { getAllProducts } from "~/db";


export async function loader() {
  const products = await getAllProducts();
  return { products };
}

export default function Shop() {
  const { products } = useLoaderData();

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
          <Link to={`/shop/${product.id}`} className="hover:brightness-95">
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
                  <li><span className="font-bold">Total travel:</span> {product.total_travel}</li>
                  <li><span className="font-bold">Mount Type:</span> {product.mount_type}-pin</li>
                  <li><span className="font-bold">Top Housing:</span> {product.top_housing}</li>
                  <li><span className="font-bold">Bottom Housing:</span> {product.bottom_housing}</li>
                  <li><span className="font-bold">Factory Lubed:</span> {product.lubed ? "Yes" : "No"}</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
