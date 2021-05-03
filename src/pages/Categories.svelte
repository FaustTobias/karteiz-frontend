<script lang="ts">
    import { push } from "svelte-spa-router";
    import colors from "tailwindcss/colors";
    import { onMount } from "svelte";
    import { getStore } from "svex";
    import CategoryItem from "../components/CategoryItem.svelte";
    import Main from "../layouts/Main.svelte";
    import Button from "../components/Button.svelte";
    import { client } from "../util";

    const userName = getStore("user.name");

    let categories = [];

    async function refresh() {
        try {
            const result = await client.call("card/getCategories", { userName: $userName });

            if (result.errorCode !== 0) {
                throw new Error("Internal error!");
            }
            categories = result.categories.map((category) => ({
                id: category.catId,
                name: category.catName,
                color: category.color,
            }));
        } catch {
        } finally {
        }
    }

    async function remove(id) {
        try {
            await client.call("card/deleteCategory", { userName: $userName, categoryId: id });
            await refresh();
        } catch {
        } finally {
        }
    }

    onMount(async () => {
        await refresh();
    });
</script>

<Main>
    <div class="text-2xl text-center mt-12 mb-4 px-4">Kategorien</div>
    <div class="text-lg text-center mb-12 px-4">Hier kannst du Kategorien und ihre Karten bearbeiten!</div>
    <div class="mx-auto mb-4">
        <Button text="Kategorie anlegen" on:click={() => push("/categories/new")} />
    </div>
    {#if categories.length > 0}
    <div class="flex flex-col m-4 gap-2 pb-4">
        {#each categories as category, index (category.id)}
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
