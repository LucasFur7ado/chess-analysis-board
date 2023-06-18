import { Board } from '$lib/js/board'
import { writable } from 'svelte/store'

const newBoard = new Board(true)

export const board = writable(newBoard)
export const historyLocation = writable(0)
export const history = writable([JSON.parse(JSON.stringify(newBoard.board))])
