<script>
    import { PUBLIC_GITHUB_CLIENT_ID, PUBLIC_URL } from "$env/static/public";

    let path = "/";
</script>

<a href="https://github.com/login/oauth/authorize?client_id={PUBLIC_GITHUB_CLIENT_ID}&redirect_uri={PUBLIC_URL}&scope=user:email" style="text-decoration: none;">
    <button style="display: block; margin: auto; margin-top: 100px; margin-bottom: 20px; cursor: pointer;">Login with Github</button>
</a>
<a href=https://github.com/propianist1124/gforum target="_blank" style="display: block; text-align: center;">Check out the source code here and selfhosting guide!</a>