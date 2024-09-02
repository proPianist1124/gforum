import { db } from "$lib/db";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    await db`INSERT INTO forum_posts (id, title, content, date, author, "group") VALUES (${formData.id}, ${formData.title}, ${formData.content}, ${formData.date}, ${cookies.get("session")}, ${formData.group});`;

    return new Response("OK");
}