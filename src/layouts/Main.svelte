<script lang="ts">
    import { onMount } from "svelte";
    import { getStore } from "svex";

    const bottomNavigationCount = getStore("ui.bottomNavigationCount");

    onMount(() => {
        bottomNavigationCount.update((val) => val + 1);

        return async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            bottomNavigationCount.update((val) => val - 1);
        };
    });
</script>

<div class="fixed top-0 right-0 bottom-0 left-0 flex flex-col overflow-auto">
    <div class="flex-1 overflow-auto flex flex-col">
        <slot />
    </div>
    <div class="h-16" />
</div>
