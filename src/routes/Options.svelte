<script>
    import ArrowRight from "$lib/components/options/ArrowRight.svelte"
    import ArrowLeft from "$lib/components/options/ArrowLeft.svelte"
    import Invert from "$lib/components/options/Invert.svelte"
    import Reset from "$lib/components/options/Reset.svelte"
    import { history, historyLocation } from "$lib/store"
    import Option from "$lib/components/Option.svelte"

    let thereIsMoves
    $: (thereIsMoves = $history.length - 1 - $historyLocation)
</script>

<div class="optionsContainer">
    <div>
        <Reset />
        <Invert />
    </div>
    <div>
        {#if thereIsMoves}
            <Option pointer={false}>
                {thereIsMoves}
            </Option>
        {/if}
        <ArrowLeft />
        <ArrowRight />
    </div>
</div>

<style>
    .optionsContainer {
        display: flex;
        align-items: center;
        padding: 20px 0;
        justify-content: space-between;
    }

    .optionsContainer > div {
        display: flex;
        gap: 3px;
    }
</style>
