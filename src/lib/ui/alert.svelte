<script>
    let visible = true;
</script>

{#if visible}
    <div
        style="border: 1px solid red; padding: 10px; color: red; font-weight: 550; font-size: 18px; width: fit-content; display: flex; align-items: center;"
    >
        <button on:click={() => visible = false} style="margin-right: 5px;">x</button>
        <slot />
    </div>
{/if}
