<script>
    import Post from "$lib/ui/post.svelte";

    export let data;

    const posts = data.u
        ? data.posts.filter((p) => p.author.login == data.u.login)
        : [];
</script>

<svelte:head>
    {#if data.u}
        <title>/u/{data.u.login} - {data.forum.name}</title>
    {/if}
</svelte:head>

{#if !data.u}
    <h2 style="color: red;">User not found.</h2>
{:else}
    <div style="display: flex; align-items: center;">
        <img
            src="https://github.com/{data.u.login}.png"
            width="35"
            height="35"
            alt={data.u.login}
        />
        <h2 style="font-weight: normal; margin-left: 5px;">{data.u.name && data.u.name != data.u.login ? `${data.u.name} (${data.u.login})` : data.u.login}</h2>
        <a href="https://github.com/{data.u.login}" target="_blank" style="margin-left: auto;">
            <button>github</button>
        </a>
    </div>
    <p>{data.u.bio ? data.u.bio : "No bio available"}</p>
    <h3 style="margin-top: 40px;">Recent Posts</h3>
    {#if posts.length === 0}
        <p style="color: red;">This user has made 0 posts.</p>
    {:else}
        {#each posts as post}
            <Post {post} />
        {/each}
    {/if}
{/if}
