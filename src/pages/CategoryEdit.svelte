<script lang="ts">
    import { getCategories, getCards, call } from "../util/client";
    import Main from "../layouts/Main.svelte";
    import Button from "../components/Button.svelte";
    import { getStore } from "svex";
    import { push } from "svelte-spa-router";

    export let params: Record<string, any> = {};

    const userName = getStore("user.name");
    const categories = getCategories();
    const isWorking = getStore("client.isWorking");

    $: category = $categories.items.filter((item) => item.id.toString() === params.id)[0];
    $: cards = category ? getCards(category.id) : null;

    function addCard() {
        push(`/categories/${params.id}/new`);
    }

    async function removeCard(cardId) {
        try {
            await call("card/deleteCard", {
                userName: $userName,
                cardId,
            });
            await $cards.refresh();
        } catch {}
    }
</script>

<Main>
    {#if category}
        <div class="text-2xl text-center mt-12 mb-4 px-4">Kategorie bearbeiten</div>
        <div class="text-lg text-center mb-12 px-4 flex flex-row gap-4 items-center justify-center">
            <div class="w-4 h-8" style="background-color: {category.color}" />
            <div>{category.name}</div>
        </div>
        <div class="flex-1 flex flex-col gap-4 p-4">
            {#each $cards.items as card (card.id)}
                <div class="flex flex-row gap-4 bg-gray-100 border-2 border-gray-200">
                    <div class="flex flex-col gap-4 flex-1 p-4">
                        <div class="flex flex-row gap-4 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <div>{card.question}</div>
                        </div>
                        <div class="flex flex-row gap-4 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                            <div>{card.answer}</div>
                        </div>
                    </div>
                    <button
                        class="bg-gray-300 p-2 flex justify-center items-center focus:outline-none active:bg-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={$isWorking}
                        on:click={() => removeCard(card.id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            {/each}
        </div>
        <div class="text-center p-4">
            <Button text="Karte hinzufügen" on:click={addCard} />
        </div>
    {/if}
</Main>
