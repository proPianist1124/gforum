<script>
    import { v4 as uuid } from "uuid";
    import Post from "$lib/post.svelte";
    import groups from "$lib/groups.json";

    export let data;

    let posts = data.posts;

    async function create(e) {
        document.getElementById("create-post").close();

        const id = uuid();

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

        await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                title: e.target.title.value,
                content: e.target.content.value,
                group: e.target.group.value,
                date: new Date().toLocaleString().split(",")[0]
            }),
        });
    }
</script>

<svelte:head>
    <title>gForum</title>
</svelte:head>

<button
    on:click={() => document.getElementById("create-post").showModal()}
    style="cursor: pointer; margin-right: 5px;"
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
    <h2>Create Post</h2>
    <form on:submit|preventDefault={create} autocomplete="off">
        <input type="text" name="title" placeholder="post title" />
        <input type="text" name="content" placeholder="what's on your mind?" />
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
            style="display: block; width: 100%; cursor: pointer;">Create</button
        >
    </form>
</dialog>
