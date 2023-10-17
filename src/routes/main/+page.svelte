<script>
	import { onMount } from 'svelte';
	import Card from './card.svelte';
	let userName;
	let rLocation;
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
		}).then((data) => {
			userName = data.login;
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	function lookUp() {
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
				window.location.href = '/';
			}
		}).then((data) => {
			rData = data;
			console.log(rData);
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	function onLocationChange(event) {
		rLocation = event.target.value;
		lookUp();
	}

	onMount(async() => {
		whoAmI();
		lookUp();
	});
</script>

{#if userName}
<div class="c">
	<h1 class="title">맛있는 42서울</h1>
	<div class="row">
		클러스터 위치
		<select class="card w-90" bind:value={rLocation} on:change={onLocationChange}>
			<option value="gaepo">개포</option>
			<option value="gaepo-deliver">개포(배달)</option>
			<option value="seocho">서초</option>
		</select>
	</div>
	{#each rData.items as d}
		{#if d.cluster == rLocation}
		<div class="row">
			<Card title={d.name} description={d.summary} key={d.key} contributor={d.contributor}/>
		</div>
		{/if}
	{/each}
	<button class="btn primary floating" on:click={() => { window.location.href = '/new' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg></button>
</div>
{:else}
<div class="c">
	<p>로딩 중...</p>
</div>
{/if}

<style>
	.floating {
		width: 7em;
		height: 7em;
		border-radius: 7em;
		line-height: 0;
		position: fixed;
		bottom: 2em;
		right: 2em
	}
	svg {
		top: 50%;
	}
</style>