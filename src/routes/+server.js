import { db } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
    cookies.get("session") ? redirect(302, "/f") : redirect(302, "/login");
}