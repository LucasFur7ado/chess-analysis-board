<script>
	import { activePiece } from '$lib/store.js'
	import { returnSvg } from '$lib/services/returnSvg.js'
	import { Board } from '$lib/js/classes'

	const board = new Board(true)
</script>

<div id="board">
	{#each board.board as line, i1}
		{#each line as square, i2}
			{#if square == null}
				<div
					on:keyup={null}
					on:click={() => board.pieceClick(null)}
					class={(i1 + i2) % 2 == 0 ? 'white' : 'black'} />
			{:else}
				<div
					on:keyup={null}
					on:click={() => board.pieceClick(square)}
					class={`${(i1 + i2) % 2 == 0 ? 'white' : 'black'} 
                ${$activePiece?.id == square?.id ? 'active' : ''} square`}>
					{@html returnSvg(square.type, square.white)}
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.active {
		background: #2f2f2f !important;
	}

	.black {
		border: 1px solid var(--black-square-border);
		border-radius: 5px;
	}
	.white {
		background-color: var(--white-square);
		border-radius: 5px;
	}

	.square {
		cursor: pointer;
	}

	#board {
		gap: 2px;
		display: grid;
		grid-template-columns: repeat(8, 50px);
		grid-template-rows: repeat(8, 50px);
	}

	#board > div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 500px) {
		#board {
			gap: 0px;
            grid-template-columns: repeat(8, 34px);
		    grid-template-rows: repeat(8, 34px);
		}
	}
</style>
