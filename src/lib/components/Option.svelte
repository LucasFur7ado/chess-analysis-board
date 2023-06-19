<script>
    export let pointer = true 
</script>

<div class:pointer={pointer}>
    <slot />
</div>

<style>
    div {
        width: 50px;
        padding: 5px;
        height: 50px;
        display: flex;
        font-family: 'main';
        font-size: 20px;
        align-items: center;
        border-radius: 10px;
        justify-content: center;
        background-color: #1a1a1a;
    }

    .pointer {
        cursor: pointer;
        background-color: #1f1f1f;
    }
</style>