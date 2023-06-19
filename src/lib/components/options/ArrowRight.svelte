<script>
    import Option from "../Option.svelte"
    import { historyLocation } from "$lib/store"
    import { updateHistoryLocation } from "$lib/js/functions"
</script>

<div on:click={(e) => updateHistoryLocation("right")} on:keyup={null}>
    <Option pointer={$historyLocation > 0}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-forward-up"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#777"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 14l4 -4l-4 -4" />
            <path d="M19 10h-11a4 4 0 1 0 0 8h1" />
        </svg>
    </Option>
</div>
