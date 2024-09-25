<script>
    import User from "$lib/ui/user.svelte";

    export let data;
</script>

<svelte:head>
    <title>Modview - gForum</title>
</svelte:head>

{#if !data.admin}
    <h1>Not authorized.</h1>
    <p>
        Please <a href="/login">login</a> to gain access.
    </p>
{:else}
    {#each data.users as user}
        <User {user}>{user.credentials.login}</User>
    {/each}
{/if}
