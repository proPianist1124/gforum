<script>
    import { v4 as uuid } from "uuid";
    import Alert from "$lib/ui/alert.svelte";

    export let data;

    let comments = data.post.comments;
    let voted = data.post.voted;
    let error = "";

    async function vote(type) {
        error = "";

        const res = await fetch(`/api/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.post.id,
                type,
            }),
        }).then((res) => res.json());

        if (res.success) {
            type == "upvote" ? data.post.upvotes++ : data.post.downvotes++;

            voted = [...voted, data.user.user_id]; // add user to voted list realtime
        } else {
            error = res.error;
        }
    }

    async function comment(e) {
        error = "";

        const comment_id = uuid();

        const res = await fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.post.id,
                comment_id,
                body: e.target.comment.value,
            }),
        }).then((res) => res.json());

        if (res.success) {
            comments = [
                {
                    id: comment_id,
                    body: e.target.comment.value,
                    author: data.user,
                },
                ...comments,
            ];
            e.target.comment.value = "";
        } else {
            error = res.error;
        }
        document.getElementById("add-comment").close();
    }
</script>

<svelte:head>
    <title>{data.post.title} - gForum</title>
</svelte:head>

{#if error}
    <Alert>{error}</Alert>
{/if}
<h1>{data.post.title}</h1>
<p>{data.post.content}</p>
<div
    style="display: flex; align-items: center; margin-top: 20px; margin-bottom: 30px; font-family: monospace;"
>
    <a href="/f/u/{data.post.author}">/u/{data.post.author}</a>
    &nbsp;on {data.post.date.split(",")[0]}
</div>
<div style="display: flex; align-items: center;">
    <button on:click={() => vote("upvote")}>↑{data.post.upvotes}</button>
    <button on:click={() => vote("downvote")} style="margin-left: 5px;"
        >↓{data.post.downvotes}</button
    >
</div>
<h3>Comments ({comments.length})</h3>
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
            <a href="/f/u/{comment.author.login}" style="display: block;"
                >/u/{comment.author.login}</a
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
