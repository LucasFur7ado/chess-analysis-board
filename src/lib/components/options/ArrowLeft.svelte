<script>
  import Option from "../Option.svelte"
  import { updateHistory } from "$lib/js/functions"
  import { historyLocation, history } from "$lib/store"
</script>

<div on:click={(e) => updateHistory(e, "left")} on:keyup={null}>
  <Option
    pointer={($history.length - 1 && !$historyLocation) ||
      $historyLocation < $history.length - 1}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrow-back-up"
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
      <path d="M9 14l-4 -4l4 -4" />
      <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
    </svg>
  </Option>
</div>
