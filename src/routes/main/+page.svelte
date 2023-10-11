<script>
	import { onMount } from 'svelte';
	import Card from './card.svelte';
	let userName;
	let rLocation;
	let rData;

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
		fetch('/api/lookup', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'cluster': rLocation,
			})
		}).then((response) => {
			if (response.status === 200 || response.status === 201) {
				return response.json();
			}
			else {
				console.error(`response status ${response.status}`);
				console.warn(response);
				window.location.href = '/404';
			}
		}).then((data) => {
			rData = data;
			console.log(rData);
		}).catch((error) => {
			console.error('Error:', error);
		});
	});
</script>

{#if userName}
<div class="c">
	<h1 class="title">맛있는 42서울</h1>
	<div class="row">
		클러스터 위치
		<select class="card w-100" bind:value={rLocation}>
			<option value="gaepo">개포</option>
			<option value="gaepo-takeout">개포(포장)</option>
			<option value="gaepo-deliver">개포(배달)</option>
			<option value="seocho">서초</option>
		</select>
	</div>
	<div>
		<Card title="광수육회" description="맛있는육회" key="asdf"/>
		<Card title="수황태콩나물국밥" description="맛잇는국밥" key="asdf"/>
	</div>
	<div>
		<Card title="우리생고기" description="생고기맛잇어" key="asdf"/>
		<Card title="장독묵은지" description="묵은지맛잇어" key="asdf"/>
	</div>
	<button class="btn primary floating" on:click={() => { window.location.href = '/new' }}>+</button>
</div>
{:else}
<div class="c">
	<p>로딩 중...</p>
</div>
{/if}

<style>
	.floating {
		width: 3em;
		height: 3em;
		border-radius: 1.5em;
		font-size: 2rem;
		line-height: 0;
		position: fixed;
		bottom: 2em;
		right: 2em
	}
</style>