<script>
	export let title;
	export let description;
	export let key;
	export let detail;

	function showMeDetail() {
		alert(detail);
	}
</script>

<div class="card col">
	<h4>{title}</h4>
	<p>{description}</p>
	<button class="btn primary" on:click={() => {showMeDetail()}}>정보 보기</button>
	<button class="btn">길 안내</button>
	<p>{key}</p>
</div>

<style>
	.card {
		width: 100%;
	}
</style>