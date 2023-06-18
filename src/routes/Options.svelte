<script>
    import OptionContainer from "$lib/components/OptionContainer.svelte"
    import ArrowRight from "$lib/assets/icons/ArrowRight.svelte"
    import ArrowLeft from "$lib/assets/icons/ArrowLeft.svelte"
    import { history, historyLocation } from "$lib/store"
    import Invert from "$lib/assets/icons/Invert.svelte"
    import Reset from "$lib/assets/icons/Reset.svelte"
    import { updateHistory } from "$lib/js/functions"

    let thereIsMoves
    $: (thereIsMoves = $history.length - 1 - $historyLocation)
</script>

<div class="optionsContainer">
    <div>
        <OptionContainer>
            <Reset />
        </OptionContainer>
        <OptionContainer>
            <Invert />
        </OptionContainer>
    </div>
    <div>
        {#if thereIsMoves}
            <OptionContainer>
                {thereIsMoves}
            </OptionContainer>
        {/if}
        <div on:click={(e) => updateHistory(e, 'left')} 
            on:keyup={null}>
            <OptionContainer 
                pointer={(($history.length - 1) && !$historyLocation)
                || ($historyLocation < $history.length - 1)}>
                <ArrowLeft />
            </OptionContainer>
        </div>
        <div on:click={(e) => updateHistory(e, 'right')} 
            on:keyup={null}>
            <OptionContainer 
                pointer={$historyLocation > 0}>
                <ArrowRight />
            </OptionContainer>
        </div>
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
