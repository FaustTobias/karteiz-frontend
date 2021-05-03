<script lang="ts">
    export let text = "Button";
    export let disabled = false;
</script>

<button
    class="bg-gray-200 py-2 px-4 rounded border-2 border-gray-300 focus:outline-none active:bg-yellow-400 active:border-yellow-300"
    class:disabled
    {disabled}
    on:click>{text}</button
>

<style lang="postcss">
    button:disabled {
        @apply text-gray-300 bg-gray-100 border-gray-100;
    }
</style>
