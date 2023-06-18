import { Board } from '$lib/js/board'
import { writable } from 'svelte/store'

const newBoard = new Board(true)

export const board = writable(newBoard)
export const history = writable([newBoard.board])
