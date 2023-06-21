<script>
	import { keyboardEventController, historyToBoard } from '$lib/js/functions'
	import { board, history, historyLocation } from '$lib/store.js'
	import { returnSvg } from '$lib/services/returnSvg.js'
</script>

<svelte:window on:keydown={keyboardEventController} />

<div id="board">
	{#each (!$historyLocation ? $board.board : $history[$historyLocation]) as line, y}
		{#each line as piece, x}
			{#if piece == null}
				<!-- Empty square -->
				<div
					on:keyup={null}
					on:click={() => !$historyLocation ? $board.pieceController(null, { x, y }) : null}
					class={(y + x) % 2 == 0 ? 'white' : 'black'}>
					{#if ($board.possibleMoves !== null 
					&& $board.possibleMoves.find(m => (m.y == y && m.x == x)))}
						{@html returnSvg('dot', (y + x) % 2 == 0)}
					{/if}	
				</div>
			{:else}
				<!-- Piece -->
				<div
					on:keyup={null}
					on:click={() => {
						if($historyLocation) {
							historyToBoard($history[$historyLocation])
							return null
						} else {
							$board.pieceController(piece)
						}
					}}
					class={`${(y + x) % 2 == 0 ? 'white' : 'black'} 
                	${$board.activePiece?.id == piece?.id ? 'active' : ''} square`}>
					{@html returnSvg(piece.type, piece.white)}
					{#if ($board.possibleMoves !== null 
						&& $board.possibleMoves.find(m => (m.y == y && m.x == x)))}
						{@html returnSvg('circle', (y + x) % 2 == 0)}
					{/if}	
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.active {
		background: #2f2f2f !important;
	}

	.white, .black {
		border-radius: 5px;
		position: relative;
	}

	.black {
		border: 1px solid var(--black-square-border);
	}
	.white {
		background-color: var(--white-square);
	}

	.square {
		cursor: pointer;
	}

	#board {
		gap: 0px;
		display: grid;
		position: relative;
		grid-template-columns: repeat(8, 55px);
		grid-template-rows: repeat(8, 55px);
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
