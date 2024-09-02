<script>
    export let post;
</script>

<div class="post">
    <a
        href="/f/p/{post.id}"
        style="text-decoration: none; color: currentColor;"
    >
        <p style="font-size: 15px;">{post.date}</p>
        <p
            style="font-weight: medium; font-size: 20px; font-weight: 550;"
        >
            {post.title}
        </p>
        <p>{post.content.split(" ").slice(0, 20).join(" ")}...</p>
        <div
            style="display: flex; align-items: center; font-family: monospace;"
        >
            <div style="display: flex; align-items: center;">
                <p>/u/{post.author.login}</p>
                <div class="badge">{post.group}</div>
            </div>
            <div
                style="display: block; margin-left: auto; font-family: 'Times New Roman';"
            >
                <span style="margin-right: 10px;">{post.comments.length} comment{post.comments.length === 1 ? "" : "s"}</span>
                ↑{post.upvotes} ↓{post.downvotes}
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
        font-family: times;
    }
</style>
