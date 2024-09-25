<script>
    export let user;

    let open = false;

    const NA = `<p style="color: red; font-weight: bold;">N/A</p>`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => (open = !open)} class="user-block">
    <slot />
    {#if open}
        <a href="https://github.com/{user.credentials.login}" target="_blank">
            <button>Github</button>
        </a>
        <table>
            <tr>
                <th>Display Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Id</th>
            </tr>
            <tr>
                <td
                    >{@html user.credentials.name
                        ? user.credentials.name
                        : NA}</td
                >
                <td
                    >{@html user.credentials.email
                        ? user.credentials.email
                        : NA}</td
                >
                <td>{@html user.credentials.bio ? user.credentials.bio : NA}</td
                >
                <td>{user.id}</td>
            </tr>
        </table>
    {/if}
</div>

<style>
    table {
        display: block;
        margin-top: 10px;
        border-collapse: collapse;
    }

    table th,
    td {
        border: 1px solid #2e2d2d;
        padding: 10px;
    }

    div.user-block {
        background-color: #f5f5f5;
        display: block;
        margin-bottom: 20px;
        overflow: auto;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        padding: 20px;
        cursor: pointer;
    }

    div.user-block:hover {
        background-color: #d4d2d2;
    }
</style>
