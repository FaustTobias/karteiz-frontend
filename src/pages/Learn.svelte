<script lang="ts">
    import { fly } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import Main from "../layouts/Main.svelte";
    import { getCategories, getCards } from "../util/client";

    export let params: Record<string, any>;

    $: category = $categories.items.filter((cat) => cat.id.toString() === params.id)[0];
    $: cards = category ? getCards(category.id) : null;
    $: shuffledCards = cards ? (shuffle($cards.items) as any[]) : null;
    $: currentCard = shuffledCards ? shuffledCards[currentCardIndex] : null;

    let currentCardIndex = 0;
    let currentCardFace = 0;
    let isSwitchingCards = false;

    const categories = getCategories();

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    async function nextCard() {
        if (!currentCard) {
            return;
        }

        if (currentCardIndex + 1 >= shuffledCards.length) {
            push("/");
            return;
        }

        isSwitchingCards = true;
        currentCardFace = 0;
        await new Promise((resolve) => setTimeout(resolve, 500));
        ++currentCardIndex;
        isSwitchingCards = false;
    }
</script>

<Main>
    {#if currentCard}
        <div class="text-2xl text-center mt-12 mb-4 px-4">({currentCardIndex + 1} / {shuffledCards.length})</div>
        <div class="text-lg text-center mb-12 px-4">
            Let's learn a little bit of <i>{category.name}</i>!
        </div>
        {#if !isSwitchingCards}
            <div class="cards w-72 h-40 self-center relative cursor-pointer" transition:fly|local>
                <div
                    class="card-front absolute top-0 right-0 bottom-0 left-0 bg-gray-100 overflow-y-scroll shadow-sm"
                    class:card-hidden={currentCardFace}
                    on:click={() => (currentCardFace = 1)}
                >
                    <div class="p-4">
                        {currentCard.question}
                    </div>
                </div>
                <div
                    class="card-back absolute top-0 right-0 bottom-0 left-0 bg-gray-200 overflow-y-scroll shadow-sm"
                    class:card-hidden={!currentCardFace}
                    on:click={nextCard}
                >
                    <div class="p-4">
                        {currentCard.answer}
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</Main>

<style lang="postcss">
    .cards {
        perspective: 500px;
    }

    .card-front {
        transition: transform 500ms, opacity 500ms;
        transform: rotateY(0deg);
    }

    .card-front.card-hidden {
        transform: rotateY(180deg);
        opacity: 0;
        pointer-events: none;
    }

    .card-back {
        transition: transform 500ms, opacity 500ms;
        transform: rotateY(0deg);
    }

    .card-back.card-hidden {
        transform: rotateY(-180deg);
        opacity: 0;
        pointer-events: none;
    }
</style>
