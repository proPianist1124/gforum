<script>
    import "$lib/app.css";
    import groups from "$lib/groups.json";

    export let data;
</script>

<div
    style="display: flex; align-items: center; justify-content: center; padding-left: 15px; padding-right: 15px;"
>
    <a href="/f">
        <h2>{data.forum.name}</h2>
    </a>
    <a href="/f/u/{data.user.login}" style="margin-left: auto;">
        <img
            src="https://github.com/{data.user.login}.png"
            width="35"
            height="35"
            alt="pfp"
        />
        <p style="font-weight: medium; font-size: 20px; margin-left: 5px;">
            {data.user.login}
        </p>
    </a>
</div>
<hr
    style="display: block; margin-bottom: 20px; margin-top: 10px; border: 0.5px solid #000;"
/>
<div class="layout">
    <div style="width: 100%; overflow: auto;">
        <slot />
    </div>
    <div class="groups">
        <div style="display: flex; align-items: center;">
            <b>Groups</b>
            <button
                on:click={() => alert("feature not yet available!")}
                style="margin-left: 5px;">Create Group</button
            >
        </div>
        <ul>
            {#each groups as group}
                <li>
                    <a href="/f/g/{group}" style="width: fit-content;"
                        >{group}</a
                    >
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
    }

    a:hover {
        text-decoration: underline;
    }

    div.layout {
        display: flex;
        max-width: 1200px;
        margin: auto;
        height: 80vh;
    }

    div.groups {
        margin-left: 20px;
        width: 430px;
        height: 100%;
    }

    @media (max-width: 800px) {
        div.layout {
            display: block;
        }

        div.groups {
            display: block;
            margin-top: 20px;
            background-color: #f5f5f5;
            border: 1px solid lightgray;
            padding: 15px;
            margin-left: 0px;
            width: auto;
            height: auto;
        }
    }
</style>
