import { v4 as uuid } from "uuid";
import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    // console.log(formData);
    const post = await db`SELECT comments FROM forum_posts WHERE id = ${formData.id}`;

    const comment = {
        id: formData.comment_id,
        body: formData.body,
        author: cookies.get("session"),
    };

    await db`UPDATE forum_posts SET comments = ${comment} || comments WHERE id = ${formData.id}`;
    
    return new Response("OK");
}