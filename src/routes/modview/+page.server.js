import { db } from "$lib/db";
import config from "../../../config.json";

export async function load({ cookies }) {
    try {
        const users = await db`SELECT * FROM forum_users;`;
        const user = await db`SELECT credentials FROM forum_users WHERE id = ${cookies.get("session")};`;

        if (config.admins.includes(user[0].credentials.login)) {
            return {
                admin: true,
                users
            }
        } else {
            return {
                admin: false
            }
        }
    } catch (e) {
        return {
            admin: false
        }
    }
}