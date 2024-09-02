import axios from "axios";
import { json, redirect } from "@sveltejs/kit";
import { v4 as uuid } from "uuid";
import { db } from "$lib/db";
import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public";
import { GITHUB_CLIENT_SECRET } from "$env/static/private";

export async function GET({ url, cookies }) {
    try {
        const code = url.searchParams.get("code");

        if (!code) return new Response("No access code was provided.");

        const params = `?client_id=${PUBLIC_GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

        const bearer = await fetch(`https://github.com/login/oauth/access_token${params}`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then(res => {
            return res.json();
        });

        const credentials = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "Authorization": `token ${bearer.access_token}`
            }
        }).then(res => res.json());

        if (credentials) {
            const users = await db`SELECT id, credentials FROM forum_users;`;

            let user = users.filter(user => user.credentials.login == credentials.login);
            
            if (user.length === 0) {
                const id = uuid();
                await db`INSERT INTO forum_users (id, credentials) VALUES (${id}, ${credentials});`;
                cookies.set("session", id, { path: "/" });
            } else {
                cookies.set("session", user[0].id, { path: "/" });
            }
        }
    } catch (e) {
        return new Response("An error occured while fetching the user's credentials. Try again later.");
    }

    redirect(302, "/");
}