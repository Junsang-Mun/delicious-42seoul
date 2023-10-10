<script>
	import { onMount } from 'svelte';
	import Card from './card.svelte';
	let userName;

	onMount(async() => {
		fetch('/api/whoami', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				access_token: localStorage.getItem('access_token'),
			})
		}).then((response) => {
			if (response.status !== 200) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('expires_in');
				localStorage.removeItem('set_time');
				window.location.href = '/';
			}
			return response.json();
		}).then((data) => {
			userName = data.login;
		}).catch((error) => {
			console.error('Error:', error);
		});
	});
</script>

<div class="c">
	<h1 class="title">Main Page</h1>
	<p>{userName}</p>
	<div>
		<Card title="title" description="halskdjflasdjflksadjflda" key="asdf"/>
		<Card title="title" description="halskdjflasdjflksadjflda" key="asdf"/>
	</div>
	<div>
		<Card title="title" description="halskdjflasdjflksadjflda" key="asdf"/>
		<Card title="title" description="halskdjflasdjflksadjflda" key="asdf"/>
	</div>
</div>