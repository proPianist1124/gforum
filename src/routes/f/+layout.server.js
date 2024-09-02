import { redirect } from "@sveltejs/kit";
import { db } from "$lib/db";

export async function load({ cookies }) {
    /* if (!cookies.get("session")) redirect(302, "/login");

    try {
        const user = await db`SELECT id, credentials FROM forum_users WHERE id = ${cookies.get("session")};`;

        // post
        let posts = await db`SELECT * FROM forum_posts;`;

        posts = await Promise.all(posts.map(async post => {
            let user = await db`SELECT credentials FROM forum_users WHERE id = ${post.author};`;

            post.author = user[0].credentials;
            return post;
        }));

        return {
            user: {
                user_id: user[0].id,
                ...user[0].credentials
            },
            posts: posts.reverse()
        }
    } catch (e) {
        redirect(302, "/login");
    } */
   redirect(302, "https://google.com")
}