import { db } from "$lib/db";

export async function load({ params }) {
    try {
        const users = await db`SELECT credentials FROM forum_users`;
        const user = users.filter(user => user.credentials.login === params.username);

        return {
            u: user[0].credentials
        }
    } catch (e) {
        console.log(e)
        return {
            u: null
        }
    }
}