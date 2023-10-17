<script>
	export let title;
	export let description;
	export let key;
	export let contributor;

	function showMeDetail() {
		window.location.href = `/detail/${key}`;
	}
</script>

<div class="card col">
	<h4>{title}</h4>
	<p>{description}</p>
	<button class="btn primary" on:click={() => {showMeDetail()}}>정보 보기</button>
	<button class="btn">길 안내</button>
	<p>{contributor}</p>
</div>

<style>
	.card {
		width: 100%;
	}
</style>