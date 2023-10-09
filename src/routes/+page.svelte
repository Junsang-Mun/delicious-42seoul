<script>
	let userCount = 42;
	const clickLogin = () => {
		window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e7d3e69db5846309b09f9d93d4d787276306cb3f0f0e8bef5010f33155ac756b&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&response_type=code";
	}
</script>

<div class="c">
	<h1 class="title">Delicious 42</h1>
	<p>{userCount}명과 함께 맛집 찾는 중</p>
	<br>
	<btn class="btn primary" on:click={() => clickLogin()}>Login with 42</btn>
</div>