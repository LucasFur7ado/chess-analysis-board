<script>
	import { board, history } from '$lib/store.js'
	import { returnSvg } from '$lib/services/returnSvg.js'

	let historyLocation = 0
	const updateHistory = (e) => {
		if (e.key == "ArrowLeft") {
			historyLocation += 1
			console.log("HISTORY => ", historyLocation)
		} else if (e.key == "ArrowRight") {
			historyLocation -= 1
			console.log("HISTORY => ", historyLocation)
		}
	};
</script>

<svelte:window on:keydown={updateHistory} />

<div id="board">
	{#each $history[historyLocation] as line, y}
		{#each line as piece, x}
			{#if piece == null}
				<!-- Empty square -->
				<div
					on:keyup={null}
					on:click={() => $board.pieceController(null, { x, y })}
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
					on:click={() => $board.pieceController(piece)}
					class={`${(y + x) % 2 == 0 ? 'white' : 'black'} 
                	${$board.activePiece?.id == piece?.id ? 'active' : ''} square`}>
					{@html returnSvg(piece.type, piece.white)}
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
		gap: 0px;
		display: grid;
		position: relative;
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
