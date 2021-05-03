<script lang="ts">
    import Main from "../layouts/Main.svelte";
</script>

<Main>
    <div class="text-2xl text-center mt-12 mb-4 px-4">Settings</div>
    <div class="text-lg text-center mb-4 px-4">Here you can change some settings!</div>
    <div class="text-lg text-center mb-12 px-4">
        <a href="#/logout">Logout</a>
    </div>
</Main>

<style lang="postcss">
    a {
        @apply text-blue-500;
    }

    a:active {
        @apply text-blue-600;
    }
</style>
