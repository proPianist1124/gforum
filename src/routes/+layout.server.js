import config from "../../config.json";

export async function load() {
    return {
        forum: config
    }
}