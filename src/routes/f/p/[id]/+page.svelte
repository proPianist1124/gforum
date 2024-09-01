<script>
    import { v4 as uuid } from "uuid";

    export let data;

    let comments = data.post.comments;
    let voted = data.post.voted;

    async function vote(type) {
        if (voted.includes(data.user.user_id)) {
            alert("You have already voted on this post.");
        } else {
            type == "upvote" ? data.post.upvotes++ : data.post.downvotes++;

            voted = [...voted, data.user.user_id]; // add user to voted list realtime

            const res = await fetch(`/api/vote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: data.post.id,
                    type,
                }),
            });
        }
    }

    async function comment(e) {
        document.getElementById("add-comment").close();

        const comment_id = uuid();

        comments = [
            {
                id: comment_id,
                body: e.target.comment.value,
                author: data.user,
            },
            ...comments,
        ];
        comments = comments;

        await fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.post.id,
                comment_id,
                body: e.target.comment.value,
            }),
        });

        e.target.comment.value = "";
    }
</script>

<svelte:head>
    <title>{data.post.title} - gForum</title>
</svelte:head>

<h1>{data.post.title}</h1>
<p>{data.post.content}</p>
<a href="/f/u/{data.post.author}" style="display: block; font-family: monospace; margin-top: 20px; margin-bottom: 30px;">/u/{data.post.author}</a>
<div style="display: flex; align-items: center;">
    <button on:click={() => vote("upvote")}>↑{data.post.upvotes}</button>
    <button on:click={() => vote("downvote")} style="margin-left: 5px;"
        >↓{data.post.downvotes}</button
    >
</div>
<h3>Comments</h3>
<button on:click={() => document.getElementById("add-comment").showModal()}
    >Add Comment</button
>
{#if comments.length === 0}
    <p style="color: red;">0 comments available.</p>
{:else}
    {#each comments as comment}
        <div
            style="border: 1px solid #000; padding: 10px; width: fit-content; margin-top: 15px;"
        >
            <p>{comment.body}</p>
            <a
                href="/f/u/{comment.author.name}"
                style="display: block;">/u/{comment.author.name}</a
            >
        </div>
    {/each}
{/if}
<dialog id="add-comment" style="width: 300px;">
    <button
        on:click={() => document.getElementById("add-comment").close()}
        class="close">x</button
    >
    <h2>Add Comment</h2>
    <form
        on:submit|preventDefault={comment}
        autocomplete="off"
        style="display: flex; align-items: center;"
    >
        <input
            type="text"
            name="comment"
            placeholder="your comment..."
            style="width: 100%; margin-right: 5px;"
        />
        <button type="submit">Comment</button>
    </form>
</dialog>

<style>
    button {
        cursor: pointer;
    }
</style>
