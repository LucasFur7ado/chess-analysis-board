import { Board } from '$lib/js/board'
import { writable } from 'svelte/store'

export const board = writable(new Board(true))
