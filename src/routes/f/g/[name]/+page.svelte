<script>
    import groups from "$lib/groups.json";
    import Post from "$lib/ui/post.svelte";

    export let data;

    $: posts = data.posts.filter((p) => p.group == data.group);
</script>

<svelte:head>
    <title>/g/{data.group} - {data.forum.name}</title>
</svelte:head>

{#if !groups.includes(data.group)}
    <h2 style="color: red;">Group not found.</h2>
{:else}
    <h2>/g/{data.group}</h2>
    {#if posts.length === 0}
        <p style="color: red;">0 posts were made in this group</p>
    {:else}
        {#each posts as post}
            <Post {post} />
        {/each}
    {/if}
{/if}
