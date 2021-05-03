<script lang="ts">
    import CategoryItem from "../components/CategoryItem.svelte";
    import Main from "../layouts/Main.svelte";
    import { getStore } from "svex";

    let categories = [];

    const name = getStore("user.name");
</script>

<Main>
    {#if categories.length === 0}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Einstellungen</div>
        <div class="text-lg text-center mb-4 px-4">Hier kannst du Einstellungen vornehmen</div>
        <div class="text-lg text-center mb-12 px-4">
            <a href="#/logout">Abmelden</a>
        </div>
    {:else}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Hello, Tobias!</div>
        <div class="text-lg text-center mb-12 px-4">Drücke auf eine Kategorie um mit dem Lernen zu starten!</div>
        <div class="flex flex-col m-4 gap-2">
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
        </div>
    {/if}
</Main>

<style lang="postcss">
    a {
        @apply text-blue-500;
    }

    a:active {
        @apply text-blue-600;
    }
</style>
