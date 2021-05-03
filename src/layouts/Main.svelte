<script lang="ts">
    import { onMount, tick } from "svelte";
    import { getStore } from "svex";

    const bottomNavigationCount = getStore("ui.bottomNavigationCount");

    onMount(async () => {
        await tick();
        $bottomNavigationCount++;

        return () => {
            $bottomNavigationCount--;
        };
    });
</script>

<div class="fixed top-0 right-0 bottom-0 left-0 flex flex-col overflow-auto">
    <div class="flex-1 overflow-auto flex flex-col">
        <slot />
    </div>
    <div class="h-16" />
</div>
