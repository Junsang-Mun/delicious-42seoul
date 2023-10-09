<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	const code = $page.url.searchParams.get('code');

	onMount(async () => {
		if (code === undefined) {
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
			response.json();
		}).then((data) => {
			console.log(data);
		});
	});
</script>

<div class="c">
	<p>42 API 응답을 처리하고 있습니다. 잠시만 기다려 주세요...</p>
</div>
