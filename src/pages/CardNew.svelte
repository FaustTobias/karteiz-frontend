<script lang="ts">
    import { getStore } from "svex";
    import { push } from "svelte-spa-router";
    import Main from "../layouts/Main.svelte";
    import Button from "../components/Button.svelte";
    import { call } from "../util/client";

    export let params: Record<string, any> = {};

    let question = "";
    let answer = "";

    const userName = getStore("user.name");
    const isWorking = getStore("client.isWorking");

    async function create() {
        try {
            await call("card/createCard", {
                userName: $userName,
                categoryId: Number.parseInt(params.id),
                cardQuestion: question,
                cardAnswer: answer,
            });

            push(`/categories/${params.id}`);
        } catch {}
    }
</script>

<Main>
    <form class="flex-1 overflow-auto flex flex-col" disabled={$isWorking} on:submit|preventDefault={create}>
        <div class="text-2xl text-center mt-12 mb-4 px-4">Add card</div>
        <div class="text-lg text-center mb-12 px-4">Create a new card!</div>
        <div class="flex flex-col gap-4">
            <div class="mx-4 flex flex-row gap-4 items-center">
                <div class="w-20">Question</div>
                <div class="relative flex-1 h-10">
                    <input
                        type="text"
                        class="absolute top-0 left-0 w-full h-full border-2 border-gray-300 focus:border-yellow-400 px-2 focus:outline-none"
                        bind:value={question}
                    />
                </div>
            </div>
            <div class="mx-4 flex flex-row gap-4 items-center">
                <div class="w-20">Answer</div>
                <div class="relative flex-1 h-10">
                    <input
                        type="text"
                        class="absolute top-0 left-0 w-full h-full border-2 border-gray-300 focus:border-yellow-400 px-2 focus:outline-none"
                        bind:value={answer}
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center mt-8">
            <Button text="Create card" disabled={$isWorking} />
        </div>
    </form>
</Main>
