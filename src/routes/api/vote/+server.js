import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    console.log(formData);

    if (formData.type == "upvote") {
        await db`UPDATE forum_posts SET upvotes = upvotes + 1, voted = ${cookies.get("session")} || voted WHERE id = ${formData.id}`;
    } else {
        await db`UPDATE forum_posts SET downvotes = downvotes + 1, voted = ${cookies.get("session")} || voted WHERE id = ${formData.id}`;
    }

    return new Response("OK");
}