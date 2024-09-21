import { db } from "$lib/db";

export async function load({ params, cookies }) {
    try {
        let post = await db`SELECT id, date, title, content, "group", author, comments, upvotes, downvotes FROM forum_posts WHERE id = ${params.id}`;

        post[0].comments = await Promise.all(post[0].comments.map(async comment => {
            const author = await db`SELECT credentials FROM forum_users WHERE id = ${comment.author}`;
            return {
                body: comment.body,
                author: author[0].credentials,
            }
        }));

        const author = await db`SELECT credentials FROM forum_users WHERE id = ${post[0].author}`;
        post[0].author = author[0].credentials.login;

        const user = await db`SELECT credentials FROM forum_users WHERE id = ${cookies.get("session")};`;

        return {
            post: post[0],
            is_author: post[0].author == user[0].credentials.login
        }
    } catch (e) {
        return {
            post: null
        }
    }
}