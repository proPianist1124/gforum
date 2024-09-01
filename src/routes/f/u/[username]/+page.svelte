<script>
    import Post from "$lib/post.svelte";

    export let data;

    const posts = data.u
        ? data.posts.filter((p) => p.author.name == data.u.name)
        : [];
</script>

<svelte:head>
    {#if data.u}
        <title>/u/{data.u.name} - gForum</title>
    {/if}
</svelte:head>

{#if !data.u}
    <h2 style="color: red;">User not found.</h2>
{:else}
    <div style="display: flex; align-items: center;">
        <img
            src="https://github.com/{data.u.name}.png"
            width="35"
            height="35"
            alt={data.u.name}
        />
        <h2 style="font-weight: normal; margin-left: 5px;">{data.user.name}</h2>
    </div>
    <p>{data.u.bio}</p>
    <h3 style="margin-top: 40px;">Recent Posts</h3>
    {#if posts.length === 0}
        <p style="color: red;">This user has made 0 posts.</p>
    {:else}
        {#each posts as post}
            <Post {post} />
        {/each}
    {/if}
{/if}
