import { v4 as uuid } from "uuid";
import { json } from "@sveltejs/kit";
import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    if (!formData.comment) {
        return json({
            error: "Comment is required"
        });
    } else {
        try {
            const post = await db`SELECT comments FROM forum_posts WHERE id = ${formData.id};`;
            const user = await db`SELECT id FROM forum_users WHERE id = ${cookies.get("session")};`;
    
            const comment = {
                id: formData.comment_id,
                body: formData.body,
                author: user[0].id,
            };
    
            await db`UPDATE forum_posts SET comments = ${comment} || comments WHERE id = ${formData.id}`;
    
            return json({
                success: true
            });
        } catch (e) {
            return json({
                error: e
            });
        }
    }
}