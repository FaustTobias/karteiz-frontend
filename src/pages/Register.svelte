<script lang="ts">
    import { slide } from "svelte/transition";
    import { getStore } from "svex";
    import { replace } from "svelte-spa-router";
    import { client } from "../util";
    import Button from "../components/Button.svelte";

    let name = "";
    let error = "";

    const isLoggedIn = getStore("user.isLoggedIn");
    $: if ($isLoggedIn) replace("/");

    const isWorking = getStore("client.isWorking");

    async function register() {
        try {
            error = "";
            const result = await client.call("user/register", {
                loginName: name,
            });

            if (result.errorCode !== 0) {
                error = result.errorMessage;
                return;
            }

            getStore("user.name").set(name);
        } catch (e) {
            error = e.message;
        }
    }
</script>

<div class="fixed top-0 right-0 bottom-0 left-0 flex flex-col">
    <div class="text-center text-5xl px-4 mt-12 font-semibold tracking-tight text-gray-700">Karteiz</div>
    <div class="text-center text-xl px-4 -mt-2 font-light tracking-wide text-gray-400">learn with ease</div>
    <div class="flex-1" />
    {#if error}
        <div transition:slide class="mx-4 px-4 py-2 bg-red-200 text-red-900 font-semibold border-2 border-red-300">
            {error}
        </div>
    {/if}
    <div class="mx-4 my-6 flex gap-4">
        <div class="flex-1 relative">
            <!-- svelte-ignore a11y-autofocus -->
            <input
                bind:value={name}
                type="text"
                autofocus
                placeholder="Name"
                class="absolute top-0 right-0 bottom-0 left-0 w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400"
            />
        </div>
        <Button text="Registrieren" disabled={$isWorking} on:click={register} />
    </div>
    <div class="text-center mb-6">Bereits registriert? <a href="#/login">Hier anmelden!</a></div>
</div>
