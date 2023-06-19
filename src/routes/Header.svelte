<script>
    import Menu from "$lib/components/Menu.svelte"
</script>

<header>
	<div>
		<h1>Chess analysis board</h1>
		<a href="https://lucasfurtado.es" target="_blank">
			by lucasfurtado.es
		</a>
	</div>
	<Menu />
</header>

<style>
	header>div>a {
		color: #777;
		font-size: 18px;
		font-weight: 100;
		font-family: 'main';
		text-decoration: none;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
