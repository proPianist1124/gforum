import { json } from "@sveltejs/kit";
import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    try {
        const user = await db`SELECT id FROM forum_users WHERE id = ${cookies.get("session")};`;
        const post = await db`SELECT voted FROM forum_posts WHERE id = ${formData.id};`;

        if (post[0].voted.includes(user[0].id)) {
            return json({
                error: "You have already voted on this post."
            });
        }

        if (formData.type == "upvote") {
            await db`UPDATE forum_posts SET upvotes = upvotes + 1, voted = ${cookies.get("session")} || voted WHERE id = ${formData.id}`;
        } else {
            await db`UPDATE forum_posts SET downvotes = downvotes + 1, voted = ${cookies.get("session")} || voted WHERE id = ${formData.id}`;
        }
        
        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: "User not found."
        });
    }

    return new Response("OK");
}