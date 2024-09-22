<script>
    export let post;
</script>

<div class="post">
    <a
        href="/f/p/{post.id}"
        style="text-decoration: none; color: currentColor;"
    >
        <p style="font-size: 15px;">{post.date.split(",")[0]}</p>
        <p
            style="font-weight: medium; font-size: 20px; font-weight: 550;"
        >
            {post.title}
        </p>
        <p>{post.content.split(" ").length >= 10 ? `${post.content.split(" ").slice(0, 10).join(" ")}...` : post.content}</p>
        <div
            style="display: flex; align-items: center;"
        >
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <p style="font-family: monospace;">/u/{post.author.login}</p>
                <div class="badge">{post.group}</div>
            </div>
            <div
                style="display: block; margin-left: auto; font-family: 'Verdana';"
            >
                <span style="margin-right: 10px;">{post.comments} comment{post.comments === 1 ? "" : "s"}</span>
                <span style="color: green;">↑{post.upvotes}</span> <span style="color: #ff0000">↓{post.downvotes}</span>
            </div>
        </div>
    </a>
</div>

<style>
    div.post {
        border: 1px solid #000;
        width: 100%;
        box-sizing: border-box;
        height: fit-content;
        display: block;
        cursor: pointer;
        padding: 10px;
        margin-top: 10px;
    }

    div.post:hover {
        border-color: #acacac;
        color: #acacac;
    }

    div.post:hover div.badge {
        color: #acacac;
        border-color: #acacac;
    }

    div.badge {
        border: 1px solid #000;
        padding: 3px;
        width: fit-content;
        margin-left: 7px;
        font-family: 'Verdana';
        font-size: 13px;
    }
</style>
