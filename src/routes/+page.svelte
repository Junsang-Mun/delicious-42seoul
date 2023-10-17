<script>
	import { onMount } from 'svelte';
	const rurl = import.meta.env.VITE_R_URL;
	const uid = import.meta.env.VITE_UID_42;
	let userCount = 42;
	const clickLogin = () => {
		window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${uid}&redirect_uri=${rurl}&response_type=code`;
	}

	onMount(() => {
		fetch('/api/usercount', {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.status === 200 || response.status === 201) {
				return response.json();
			}
			else {
				console.error(`response status ${response.status}`);
				window.location.href = '/404';
			}
		}).then((d) => {
			userCount = d.totalNumberOfUser;
		}).catch((error) => {
			console.error('Error:', error);
		});
	});
</script>

<div class="c">
	<h1 class="title">Delicious 42</h1>
	<p>{userCount}명과 함께 맛집 찾는 중</p>
	<br>
	<btn class="btn primary" on:click={() => clickLogin()}>Login with 42</btn>
</div>