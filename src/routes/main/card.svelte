<script>
	export let title;
	export let description;
	export let key;
</script>

<div class="card col">
	<img src="https://picsum.photos/400/300/?random" class="w-100">
	<h4>{title}</h4>
	<p>{description}</p>
	<button class="btn primary">정보 보기</button>
	<button class="btn">길 안내</button>
	<p>{key}</p>
</div>