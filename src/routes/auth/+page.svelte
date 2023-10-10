<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	const code = $page.url.searchParams.get('code');

	onMount(async () => {
		if (code === undefined || code === '' || code === null) {
			alert('No valid code value, returning to main page');
			window.location.href = '/';
		}
		fetch('/api/auth', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: code
			})
		}).then((response) => {
			if (response.status !== 200) {
				alert('42 API와 통신 중 에러 발생. 끔찍하군요!');
				window.location.href = '/';
			}
			return response.json();
		}).then((data) => {
			localStorage.setItem('access_token', data.access_token);
			localStorage.setItem('expires_in', data.expires_in);
			localStorage.setItem('set_time', new Date().getTime() / 1000);
			window.location.href = '/main'
		}).catch((error) => {
			console.error('Error:', error);
		});
	});
</script>

<div class="c">
	<p>42 API 응답을 처리하고 있습니다. 잠시만 기다려 주세요...</p>
</div>
