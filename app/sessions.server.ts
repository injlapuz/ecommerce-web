import { createCookieSessionStorage } from "react-router";

type SessionData = {
    user_id: number;
};

type SessionFlashData = {
    error: string;
};

export const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            // a Cookie from `createCookie` or the CookieOptions to create one
            cookie: {
                name: "__session",
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                //secrets: ["s3cret1"],
                secure: true,
            },
        },
    );
