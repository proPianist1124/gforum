import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    try {
        const post = await db`SELECT author FROM forum_posts WHERE id = ${formData.id};`;

        if (post[0].author == cookies.get("session")) {
            await db`DELETE FROM forum_posts WHERE id = ${formData.id};`;
        }

        return new Response("OK");
    } catch (e) {
        return new Response("An error occured.");
    }
}