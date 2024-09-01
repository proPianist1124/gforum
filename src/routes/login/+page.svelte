<script>
    import { PUBLIC_GITHUB_CLIENT_ID } from "$env/static/public";

    let redirect = "http://localhost:5173/api/github";
    let path = "/";
</script>

<a href="https://github.com/login/oauth/authorize?client_id={PUBLIC_GITHUB_CLIENT_ID}&redirect_uri={redirect}&scope=user:email" style="text-decoration: none;">
    <button style="display: block; margin: auto; margin-top: 100px; cursor: pointer;">Login with Github</button>
</a>