<script>
    import { navigating } from "$app/stores";

    export let data;
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <meta name="title" content={data.forum.name} />
    <meta name="description" content={data.forum.description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://gforum-nu.vercel.app" />
    <meta property="og:title" content={data.forum.name} />
    <meta property="og:description" content={data.forum.description} />
    <meta
        property="og:image"
        content="https://gforum-nu.vercel.app/favicon.ico"
    />

    <!-- Twitter -->
    <meta
        property="twitter:card"
        content="https://gforum-nu.vercel.app/favicon.ico"
    />
    <meta property="twitter:url" content="https://gforum-nu.vercel.app" />
    <meta property="twitter:title" content={data.forum.description} />
    <meta property="twitter:description" content={data.forum.description} />
    <meta
        property="twitter:image"
        content="https://gforum-nu.vercel.app/favicon.ico"
    />
</svelte:head>
{#if $navigating}
    Loading...
{:else}
    <slot />
{/if}
