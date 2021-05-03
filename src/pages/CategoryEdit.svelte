<script lang="ts">
    import { onMount } from "svelte";
    import { getStore } from "svex";
    import { client } from "../util";
    import Main from "../layouts/Main.svelte";

    export let params: Record<string, any> = {};

    const userName = getStore("user.name");

    let category = null;

    onMount(async () => {
        const result = await client.call("card/getCategories", {
            userName: $userName,
        });

        category = result.categories
            .map((category) => ({ id: category.catId, name: category.catName, color: category.color }))
            .filter((category) => category.id == params.id)[0];
    });
</script>

<Main>
    {#if category}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Kategorie bearbeiten</div>
        <div class="text-lg text-center mb-12 px-4 flex flex-row gap-4 items-center justify-center">
            <div class="w-4 h-8" style="background-color: {category.color}" />
            <div>{category.name}</div>
        </div>
        <div class="flex-1" />
    {/if}
</Main>
