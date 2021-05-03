<script lang="ts">
    import CategoryItem from "../components/CategoryItem.svelte";
    import Main from "../layouts/Main.svelte";
    import { getStore } from "svex";
    import { push } from "svelte-spa-router";
    import { getCategories } from "../util/client";

    const userName = getStore("user.name");
    const categories = getCategories();
</script>

<Main>
    {#if $categories.items.length === 0}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Hello, {$userName}!</div>
        <div class="text-lg text-center mb-4 px-4">To get started you have to create a category.</div>
        <div class="text-lg text-center mb-12 px-4">
            <a href="#/categories/new">Click here to create one!</a>
        </div>
    {:else}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Hello, {$userName}!</div>
        <div class="text-lg text-center mb-12 px-4">Tap on a category to start learning!</div>
        <div class="flex flex-col m-4 gap-2 pb-4">
            {#each $categories.items as category, index (category.id)}
                <CategoryItem {...category} {index} on:click={() => push(`/learn/${category.id}`)} />
            {/each}
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
