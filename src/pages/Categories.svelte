<script lang="ts">
    import { push } from "svelte-spa-router";
    import { getStore } from "svex";
    import CategoryItem from "../components/CategoryItem.svelte";
    import Main from "../layouts/Main.svelte";
    import Button from "../components/Button.svelte";
    import { call, getCategories } from "../util/client";

    const userName = getStore("user.name");
    const categories = getCategories();

    async function remove(id) {
        try {
            await call("card/deleteCategory", { userName: $userName, categoryId: id });
            await $categories.refresh();
        } catch {
        } finally {
        }
    }
</script>

<Main>
    <div class="text-2xl text-center mt-12 mb-4 px-4">Kategorien</div>
    <div class="text-lg text-center mb-12 px-4">Hier kannst du Kategorien und ihre Karten bearbeiten!</div>
    <div class="mx-auto mb-4">
        <Button text="Kategorie anlegen" on:click={() => push("/categories/new")} />
    </div>
    {#if $categories.items.length > 0}
        <div class="flex flex-col m-4 gap-2 pb-4">
            {#each $categories.items as category, index (category.id)}
                <CategoryItem
                    {...category}
                    {index}
                    canDelete
                    on:delete={() => remove(category.id)}
                    on:click={() => push(`/categories/${category.id}`)}
                />
            {/each}
        </div>
    {/if}
</Main>
