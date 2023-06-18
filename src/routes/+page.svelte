<script>
	import Board from './Board.svelte'
	import Header from './Header.svelte'
	import Options from './Options.svelte'
</script>

<section>
	<div>
		<Header />
		<Board />
		<Options/>
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
