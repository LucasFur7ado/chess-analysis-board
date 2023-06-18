<script>
	import Board from './Board.svelte'
	import Header from './Header.svelte'
</script>

<section>
	<div>
		<Header />
		<Board />
	</div>
</section>

<style>
	section {
		display: flex;
		min-height: 100vh;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
