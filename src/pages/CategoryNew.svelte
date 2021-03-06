<script lang="ts">
    import { getStore } from "svex";
    import { push } from "svelte-spa-router";
    import Main from "../layouts/Main.svelte";
    import colors from "tailwindcss/colors";
    import Button from "../components/Button.svelte";
    import { call } from "../util/client";

    const availableColors = [
        colors.white,
        colors.red["300"],
        colors.yellow["300"],
        colors.green["300"],
        colors.blue["300"],
        colors.indigo["300"],
        colors.purple["300"],
        colors.pink["300"],
    ];

    let name = "";
    let selectedColor = null;

    const userName = getStore("user.name");
    const isWorking = getStore("client.isWorking");

    async function create() {
        if (name.trim() === "") {
            return;
        }

        if (selectedColor === null) {
            return;
        }

        try {
            await call("card/createCategory", {
                userName: $userName,
                catName: name,
                color: selectedColor,
            });

            push("/categories");
        } catch {}
    }
</script>

<Main>
    <form class="flex-1 overflow-auto flex flex-col" disabled={$isWorking} on:submit|preventDefault={create}>
        <div class="text-2xl text-center mt-12 mb-4 px-4">Add category</div>
        <div class="text-lg text-center mb-12 px-4">Create a new category!</div>
        <div class="flex flex-col gap-4">
            <div class="mx-4 flex flex-row gap-4 items-center">
                <div class="w-20">Name</div>
                <div class="relative flex-1 h-10">
                    <input
                        type="text"
                        class="absolute top-0 left-0 w-full h-full border-2 border-gray-300 focus:border-yellow-400 px-2 focus:outline-none"
                        bind:value={name}
                    />
                </div>
            </div>
            <div class="mx-4 flex flex-row gap-4 items-center">
                <div class="w-20">Color</div>
                <div class="flex-1 overflow-x-scroll flex gap-2 p-2 border-2 border-gray-300">
                    {#each availableColors as color}
                        <button
                            class="color w-8 h-8 bg-red-500 flex-shrink-0 flex-grow-0 border-2 border-white focus:outline-none"
                            class:selected={selectedColor === color}
                            on:click={() => (selectedColor = color)}
                            style="background-color: {color}"
                        />
                    {/each}
                    <div class="w-1 flex-shrink-0 flex-grow-0" />
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center mt-8">
            <Button text="Create category" disabled={$isWorking} />
        </div>
    </form>
</Main>

<style lang="postcss">
    .color.selected {
        @apply ring-2 ring-yellow-400;
    }
</style>
