import type { Route } from "./+types/login"
import { Form, Link, data, redirect } from "react-router";
import { validateCredentials } from "~/db";
import {
    getSession,
    commitSession,
} from "../sessions.server"


export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );

    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );

    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");

    const user_id = await validateCredentials(email!.toString(), password!.toString());

    if (user_id == null) {
        session.flash("error", "Invalid username/password");

        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    };

    session.set("user_id", user_id);
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function Login({ loaderData, }: Route.ComponentProps) {
    const { error } = loaderData

    return (
        <div className="flex flex-1 justify-center items-center">
            <p> {error} </p>
            <Form method="post" action="/login" className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-center">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input name="email" type="email" className="input validator" placeholder="Email" required />
                    <p className="validator-hint hidden">Required</p>
                </fieldset>

                <label className="fieldset">
                    <span className="label">Password</span>
                    <input name="password" type="password" className="input validator" placeholder="Password" required />
                    <span className="validator-hint hidden">Required</span>
                </label>

                <button className="btn btn-neutral mt-4" type="submit">Login</button>
                <Link to="/signup" className="btn btn-ghost mt-1">Create an Account</Link>
            </Form>
        </div>
    );
}
