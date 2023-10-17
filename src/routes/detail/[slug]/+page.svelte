<script>
	import { onMount } from 'svelte';
	export let data;

	let rData;
	function whoAmI() {
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
		}).then(() => {
			console.log('logged in!')
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	onMount(() => {
		whoAmI();
		fetch('/api/detail', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'key': data.slug,
			})
		}).then((response) => {
			if (response.status === 200 || response.status === 201) {
				return response.json();
			}
			else {
				console.error(`response status ${response.status}`);
				window.location.href = '/404';
			}
		}).then((d) => {
			rData = d;
			console.log(rData.cluster);
		}).catch((error) => {
			console.error('Error:', error);
		});
	});
</script>


{#if rData !== undefined}
<div class="c">
	<!-- <h1>{rData}</h1> -->
	<h1>{rData.name}</h1>
	<hr>
	<p>{rData.summary}</p>
	<br>
	<div class="detail">
		<p>{rData.detail}</p>
	</div>
	<br>
	<br>
	<p>By. {rData.contributor}</p>
</div>
{:else}
<div class="c">
	<h1>로딩중...</h1>
</div>
{/if}

<style>
	.detail {
		white-space: pre-line;
		background-color: antiquewhite;
		border-color: slategray;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
		padding: 10px;
	}
</style>