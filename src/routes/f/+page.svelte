<script>
    import { v4 as uuid } from "uuid";
    import Post from "$lib/ui/post.svelte";
    import Alert from "$lib/ui/alert.svelte";
    import groups from "$lib/groups.json";

    export let data;

    let error = "";

    let posts = data.posts;

    async function create(e) {
        error = "";

        const id = uuid();

        const res = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                title: e.target.title.value,
                content: e.target.content.value,
                group: e.target.group.value,
            }),
        }).then((res) => res.json());

        if (res.success) {
            document.getElementById("create-post").close();
            posts = [
                {
                    author: data.user,
                    comments: [],
                    content: e.target.content.value,
                    date: new Date().toLocaleString().split(",")[0],
                    downvotes: 0,
                    group: e.target.group.value,
                    id,
                    title: e.target.title.value,
                    upvotes: 0,
                    voted: [],
                },
                ...posts,
            ];
        } else {
            error = res.error;
        }
    }
</script>

<svelte:head>
    <title>gForum</title>
</svelte:head>

<button
    on:click={() => document.getElementById("create-post").showModal()}
    style="margin-right: 5px;"
>
    New Post
</button>
{#if posts.length === 0}
    <p style="text-align: center; color: red; font-size: 25px;">
        0 posts were found on the server
    </p>
{:else}
    {#each posts as post}
        <Post {post} />
    {/each}
{/if}
<dialog id="create-post">
    <button
        on:click={() => document.getElementById("create-post").close()}
        class="close">x</button
    >
    {#if error}
        <Alert>{error}</Alert>
    {/if}
    <h2>Create Post</h2>
    <form on:submit|preventDefault={create} autocomplete="off">
        <div style="display: flex; align-items: center;">
            <input
                type="text"
                name="title"
                placeholder="post title"
                style="width: 100%;"
            />
            <input
                type="text"
                name="content"
                placeholder="what's on your mind?"
                style="margin-left: 5px; width: 100%;"
            />
        </div>
        <select
            name="group"
            style="margin-top: 5px; margin-bottom: 5px; width: 100%;"
        >
            {#each groups as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
        <button
            type="submit"
            style="display: block; width: 100%;">Create</button
        >
    </form>
</dialog>
