import type { Route } from "./+types/admin-signup"
import { redirect, Form } from "react-router";
import { addUser } from "~/db";


export async function action({ request }: Route.ActionArgs) {

    const form = await request.formData();
    const email = form.get("email");
    const username = form.get("username");
    const password = form.get("password");
    const role = form.get("role");

    const user_id = await addUser(email!.toString(), username!.toString(), password!.toString(), role!.toString());

    return redirect("/admin-login")
}

export default function AdminSignup() {
    return (
        <div className="flex flex-1 justify-center items-center">
            <Form method="POST" className="fieldset bg-netural border-base-300 rounded-box w-xs border p-4">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input name="email" type="email" className="input validator" placeholder="Email" required />
                    <p className="validator-hint hidden">Required</p>
                </fieldset>

                <fieldset className="fieldset">
                    <label className="label">Username</label>
                    <input name="username" type="text" className="input validator" placeholder="Username" required />
                    <p className="validator-hint hidden">Required</p>
                </fieldset>

                <label className="fieldset">
                    <span className="label">Password</span>
                    <input name="password" type="password" className="input validator" placeholder="Password" required />
                    <span className="validator-hint hidden">Required</span>
                </label>
                <input name="role" type="hidden" value="admin" />

                <button className="btn btn-neutral mt-4" type="submit">Create Admin</button>
            </Form>
        </div>
    );
}
