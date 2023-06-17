import { Board } from '$lib/js/classes'
import { writable } from 'svelte/store'

export const board = writable(new Board(true))
