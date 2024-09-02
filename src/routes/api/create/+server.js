import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import groups from "$lib/groups.json";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    if (!groups.includes(formData.group)) {
        return json({
            error: "Invalid group selected."
        });
    } else if (!formData.title || !formData.content) {
        return json({
            error: "You must fill out all fields."
        });
    } else if (formData.title.length > 64) {
        return json({
            error: "Title must be under 64 chars."
        });
    } else if (formData.content.length > 250) {
        return json({
            error: "Content must be under 250 chars."
        });
    } else {
        try {
            const author = await db`SELECT id FROM forum_users WHERE id = ${cookies.get("session")};`;
            await db`INSERT INTO forum_posts (id, title, content, date, author, "group") VALUES (${formData.id}, ${formData.title}, ${formData.content}, ${new Date().toLocaleString()}, ${author[0].id}, ${formData.group});`;

            return json({
                success: true
            });
        } catch (e) {
            console.log(e)
            return json({
                error: "An error occured with creating this post."
            });
        }
    }
}