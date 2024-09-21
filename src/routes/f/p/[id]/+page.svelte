<script>
    import { v4 as uuid } from "uuid";
    import Alert from "$lib/ui/alert.svelte";

    export let data;

    let comments = data.post ? data.post.comments : [];
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

    async function deletePost() {
        if (!data.is_author) {
            alert("you are not the author of this post.");
        } else {
            alert("Deleting post...");
        }
    }
</script>

<svelte:head>
    <title
        >{data.post ? `"${data.post.title}"` : "Post Not Found"} - {data.forum
            .name}</title
    >
</svelte:head>

{#if error}
    <Alert>{error}</Alert>
{/if}
{#if data.post}
    <h1>{data.post.title}</h1>
    <p>{data.post.content}</p>
    <div style="display: flex; align-items: center;">
        <div
            style="display: flex; align-items: center; font-family: monospace;"
        >
            <a href="/f/u/{data.post.author}">/u/{data.post.author}</a>
            &nbsp;on {data.post.date.split(",")[0]}
        </div>
        <div
            style="display: flex; align-items: center; margin-top: 30px; margin-bottom: 30px; margin-left: auto; gap: 5px;"
        >
            <button on:click={() => vote("upvote")}>↑{data.post.upvotes}</button
            >
            <button on:click={() => vote("downvote")}
                >↓{data.post.downvotes}</button
            >
            {#if data.is_author}
                <button
                    on:click={() =>
                        document.getElementById("delete").showModal()}
                    class="danger"
                >
                    Delete
                </button>
            {:else}
                <button class="danger"> Report </button>
            {/if}
        </div>
    </div>
    <div style="padding: 10px; border: 1px solid #000; overflow: auto; height: 400px;">
        <h3>Comments ({comments.length})</h3>
        <button
            on:click={() => document.getElementById("add-comment").showModal()}
            >Add Comment</button
        >
        {#if comments.length === 0}
            <p style="font-style: italic;">0 comments available.</p>
        {:else}
            {#each comments as comment}
                <div
                    style="border: 1px solid #000; padding: 10px; width: fit-content; margin-top: 15px;"
                >
                    <p>{comment.body}</p>
                    <a
                        href="/f/u/{comment.author.login}"
                        style="display: block; width: fit-content;"
                        >/u/{comment.author.login}</a
                    >
                </div>
            {/each}
        {/if}
    </div>
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
{:else}
    <h1 style="color: red;">Post Not Found</h1>
{/if}
<dialog id="delete">
    <button
        on:click={() => document.getElementById("delete").close()}
        class="close">x</button
    >
    <h2>Are You SURE?</h2>
    <p>Deleting the post is irreversible.</p>
    <button class="danger" style="width: 100%;">Delete Permanently!</button>
</dialog>
