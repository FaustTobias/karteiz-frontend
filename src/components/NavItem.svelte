<script lang="ts">
    import { push } from "svelte-spa-router";
    import active from "svelte-spa-router/active";

    export let route: string;
</script>

<button class="nav-item" use:active={route} on:click={() => push(route)}>
    <slot />
</button>

<style lang="postcss">
    .nav-item {
        @apply relative z-10 p-4 text-gray-300 focus:outline-none;
    }

    .nav-item:global(.active) {
        @apply text-black;
    }

    .nav-item::before {
        content: "";
        @apply absolute top-0 right-0 bottom-0 left-0 bg-yellow-400 bg-opacity-0 transform-gpu scale-50 rounded-full transition-all;
        z-index: -1;
    }

    .nav-item:global(.active)::before {
        @apply scale-100  bg-opacity-100;
    }
</style>
