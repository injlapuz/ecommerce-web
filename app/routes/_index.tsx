import type { Route } from "./+types/_index";
import { Link } from "react-router";
import hero_fig from "~/assets/hero_fig2.png";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Switcheroo" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="hero flex-1 flex items-center justify-center">
        <div className="hero-content flex-col lg:flex-row px-30">
          <img
            src={hero_fig}
            className="max-w-xs rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Philippines #1 Keyboard Switch Supplier</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <Link to="/shop/products" className="btn btn-lg btn-primary">Shop now!</Link>
          </div>
        </div>
      </div>
      <div className="bg-neutral flex-1">


      </div>
    </div>
  );
}