<script>
	import { onMount } from 'svelte';
	let userName, rLocation, rName, rData;

	async function addRecord() {
		fetch('/api/database', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'contributor': userName,
				'name': rName,
				'cluster': rLocation,
				'detail': rData,
			}),
		}).then((r) => {
			if (r.status !== 200) {
				console.error(`response status ${r.status}`);
				window.location.href = '/main';
			}
			return r.json();
		}).then((d) => {
			if (d.jokebear !== 'cute') {
				console.error(`critical error: jokebear isn't cute`);
				window.location.href = '/main';
			}
			else {
				window.location.href = '/main';
				alert('성공적으로 정보가 저장되었습니다.');
			}
		})
	}

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

{#if userName}
<div class="c">
	<h1 class="title">새로운 맛집 등록하기</h1>
	<div class="row">
		컨트리뷰터 이름
		<input class="card w-100" disabled bind:value={userName}>
	</div>
	<div class="row">
		클러스터 위치
		<select class="card w-100" bind:value={rLocation}>
			<option value="gaepo">개포</option>
			<option value="gaepo-takeout">개포(포장)</option>
			<option value="gaepo-deliver">개포(배달)</option>
			<option value="seocho">서초</option>
		</select>
	</div>
	<div class="row">
		식당 이름
		<input class="card w-100" bind:value={rName}>
	</div>
	<div class="row">
		한줄평
		<input class="card w-100" bind:value={rName}>
	</div>
	<div class="row">
		정보
		<textarea class="card w-100" placeholder="가격 정보, 위치 정보 등을 여기에 적어주세요." bind:value={rData}/>
		<hr>
	</div>
	<div class="row">
		<button class="btn primary" on:click={() => { addRecord() }}>기록하기</button>
		<button class="btn" on:click={() => { window.location.href = '/main' }}>도망가기</button>
	</div>
</div>
{:else}
<div class="c">
	<p>로딩 중...</p>
</div>
{/if}